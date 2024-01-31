import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from '@aws-sdk/client-s3';
import convert from 'heic-convert';
import mime from 'mime-types';
import sharp from 'sharp';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { Transactional } from '@/utils/aop/transaction/transaction';

import { ImageDTO, MusicDTO } from './dto';
import { FileDTO } from './dto/file.dto';
import { IMAGE_ERROR_CODE } from './exception/error-code';

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    private readonly database: PrismaDatabase
  ) {}

  toBuffer(arrayBuffer: ArrayBuffer) {
    const buffer = Buffer.alloc(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    return buffer;
  }

  async getFile(key: string) {
    try {
      const file = await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).getObject({
        Bucket: `${this.configService.get('AWS_S3_BUCKET_NAME')}`,
        Key: `${this.configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}/${key}`,
      });

      return file.Body ? file.Body : null;
    } catch (err) {
      return null;
    }
  }

  async findImage(id: string) {
    const image = await this.database.getRepository().image.findUnique({
      where: {
        id,
      },
    });

    if (!image) throw new CustomException(IMAGE_ERROR_CODE.IMAGE_NOT_FOUND);

    return new ImageDTO(image);
  }

  @Transactional()
  async uploadResizedImage(
    file: Express.Multer.File,
    originKey?: string,
    width?: number,
    height?: number,
    contentType = 'image/jpeg'
  ) {
    try {
      const { key, fileBuffer, ext } = await this.getFileSpec(file);

      const resizedFile = await this.imageResize(fileBuffer, width, height);

      const url = await this.uploadS3(resizedFile, key, contentType);

      const image = await this.database.getRepository().image.create({
        data: {
          url,
          originalName: file.originalname,
          extension: ext,
        },
      });

      return new ImageDTO(image);
    } catch (error) {
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  @Transactional()
  async uploadMusic(file: Express.Multer.File, duration: number) {
    try {
      const { key, fileBuffer, ext } = await this.getFileSpec(file);

      const url = await this.uploadS3(fileBuffer, key, file.mimetype);

      const music = await this.database.getRepository().music.create({
        data: {
          url,
          originalName: file.originalname,
          extension: ext,
          duration,
        },
      });

      return new MusicDTO(music);
    } catch (error) {
      throw new InternalServerErrorException('음악 저장 중 오류가 발생했습니다.');
    }
  }

  @Transactional()
  async uploadImage(file: Express.Multer.File) {
    try {
      const { key, fileBuffer, ext } = await this.getFileSpec(file);

      const url = await this.uploadS3(fileBuffer, key, file.mimetype);

      const image = await this.database.getRepository().image.create({
        data: {
          url,
          originalName: file.mimetype,
          extension: ext,
        },
      });

      return new ImageDTO(image);
    } catch (error) {
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  @Transactional()
  async uploadFile(file: Express.Multer.File, originKey: string, contentType = 'image/jpeg') {
    try {
      const { key, fileBuffer, ext } = await this.getFileSpec(file, originKey);
      const url = await this.uploadS3(fileBuffer, key, contentType);

      const uploadedFile = await this.database.getRepository().file.create({
        data: {
          url,
          originalName: originKey,
          extension: ext,
        },
      });

      return new FileDTO(uploadedFile);
    } catch (error) {
      throw new InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
    }
  }

  async uploadS3(fileBuffer: Buffer, key: string, contentType: string) {
    await new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
      },
    }).putObject({
      Key: `${this.configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}/${key}`,
      Body: fileBuffer,
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      ContentType: contentType,
    });

    return `${this.configService.get('AWS_S3_BUCKET_URL')}/${key}`;
  }

  async deleteFile(url: string) {
    try {
      const result = await new AWS.S3({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
          secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
        },
      }).deleteObject({
        Key: ImageDTO.parseS3ImageKey(url),
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      });
    } catch (err) {
      throw new InternalServerErrorException('이미지 삭제 중 오류가 발생했습니다.');
    }
  }

  private async getFileSpec(file: Express.Multer.File, originKey?: string) {
    const originalname = file.originalname.split('.').shift();
    const isHeic = file.originalname.includes('.heic');
    const ext = mime.extension(file.mimetype);

    if (!ext) {
      throw new BadRequestException('파일 형식이 올바르지 않습니다.');
    }

    const key = `${Date.now() + `${originKey ?? originalname}.${isHeic ? 'heic' : ext}`}`;

    const fileBuffer = file.originalname.includes('heic') ? await this.heicConvert(file) : file.buffer;

    return { key, fileBuffer, ext: ext.includes('heic') ? 'jpeg' : ext };
  }

  private async imageResize(file: Buffer, width?: number, height?: number) {
    const transformer = await sharp(file)
      .resize({ width: width ?? 780, height: height ?? 564, fit: sharp.fit.cover })
      .jpeg({ mozjpeg: true })
      .toBuffer();
    return transformer;
  }

  private async heicConvert(file: Express.Multer.File) {
    const transformer = await convert({
      buffer: file.buffer,
      format: 'JPEG',
      quality: 1,
    });
    return this.toBuffer(transformer);
  }
}
