import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { ARTIST_ERROR_CODE } from './dto/error-code';

@Injectable()
export class ArtistRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findArtist(id: string) {
    const artist = await this.database.getRepository().artist.findUnique({
      where: {
        id,
      },
      include: {
        contacts: {
          include: {
            contact: true,
          },
        },
        licenses: {
          include: {
            license: true,
          },
        },
        images: {
          include: {
            image: true,
          },
        },
        musicianService: {
          include: {
            musician: {
              include: {
                evidenceFile: true,
                user: {
                  include: {
                    profileImage: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!artist) {
      throw new CustomException(ARTIST_ERROR_CODE.ARTIST_NOT_FOUND);
    }

    return artist;
  }
}
