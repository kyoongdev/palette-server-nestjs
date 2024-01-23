import { BadRequestException, Body, Controller, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseApi } from '@/utils/swagger';

import { ImageDTO, ResizeFileDTO, UploadMusicDTO } from './dto';
import { MusicDTO } from './dto/music.dto';
import { FileService } from './file.service';

@ApiTags('파일')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/music')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('music', {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(mp3)$/)) {
          return callback(new Error('Only music files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 10 },
    })
  )
  @ApiOperation({
    description: '음악 업로드',
    summary: '음악 업로드',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        music: {
          type: 'string',
          format: 'binary',
        },
        duration: {
          type: 'number',
        },
      },
    },
  })
  @ResponseApi(
    {
      type: MusicDTO,
    },
    201
  )
  async uploadMusic(
    @UploadedFile()
    file: Express.Multer.File,

    @Body() body: UploadMusicDTO
  ) {
    return this.fileService.uploadMusic(file, body.duration);
  }

  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|heic|HEIC)$/)) {
          callback(new BadRequestException('Only image files are allowed!'), true);
        } else callback(null, true);
      },

      limits: { fileSize: 1024 * 1024 * 10 },
    })
  )
  @ApiOperation({
    description: '이미지 업로드',
    summary: '이미지 업로드',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ResponseApi(
    {
      type: ImageDTO,
    },
    201
  )
  async uploadImage(
    @UploadedFile()
    file: Express.Multer.File,
    @Request() req: any
  ) {
    console.log(req.fileValidationError);
    return this.fileService.uploadImage(file);
  }

  @Post('/image/resize')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|heic|HEIC)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 10 },
    })
  )
  @ApiOperation({
    description: '이미지 업로드',
    summary: '이미지 업로드',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        width: {
          type: 'number',
          nullable: true,
        },
        height: {
          type: 'number',
          nullable: true,
        },
      },
    },
  })
  @ResponseApi(
    {
      type: ImageDTO,
    },
    201
  )
  async uploadResizedImage(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: ResizeFileDTO
  ) {
    return this.fileService.uploadResizedImage(file, undefined, body.width, body.height);
  }
}
