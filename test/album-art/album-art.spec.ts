import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';
import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MusicianRepository } from '@/modules/musician/musician.repository';
import { MusicianService } from '@/modules/musician/musician.service';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';
import { AlbumArtRepository } from '@/modules/services/album-art/album-art.repository';
import { AlbumArtService } from '@/modules/services/album-art/album-art.service';
import { CreateAlbumArtDTO } from '@/modules/services/album-art/dto';
import { ALBUM_ART_ERROR_CODE } from '@/modules/services/album-art/exception/error-code';
import { VALIDATE_SERVICE_ERROR_CODE } from '@/modules/services/validation/exception/error-code';
import { ValidateServiceModule } from '@/modules/services/validation/validate-service.module';
import { AOPModule } from '@/utils/aop/aop.module';
import { PRISMA_CLS_KEY, TransactionDecorator } from '@/utils/aop/transaction/transaction';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ClsModule, ClsService } from 'nestjs-cls';

describe('Album Art Test', () => {
  let musicianService: MusicianService;
  let albumArtService: AlbumArtService;
  let cls: ClsService;
  let prisma: PrismaService;
  let fileRepository: FileRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        PrismaDatabase,
        MusicianService,
        AlbumArtService,
        FileRepository,
        TransactionDecorator,
        LicenseRepository,
        ContactRepository,
        SaleTypeRepository,
        MusicianRepository,
        AlbumArtRepository,
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        AOPModule,
        ClsModule.forRoot({
          global: true,
        }),
        ValidateServiceModule,
      ],
    }).compile();

    albumArtService = module.get<AlbumArtService>(AlbumArtService);
    musicianService = module.get<MusicianService>(MusicianService);
    prisma = module.get(PrismaService);
    cls = module.get(ClsService);
    fileRepository = module.get(FileRepository);
  });

  describe('Album Art Service', () => {
    it('Create Album Art', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);

        const user = await prisma.user.findFirst({
          where: {
            email: '9898junjun@naver.com',
          },
          include: {
            musician: true,
          },
        });
        const images = [
          await prisma.image.create({
            data: {
              extension: 'jpg',
              originalName: 'asdf',
              url: 'asdf',
            },
          }),
          await prisma.image.create({
            data: {
              extension: 'jpg',
              originalName: 'asdf',
              url: 'asdf',
            },
          }),
        ];
        const licenses = await prisma.license.findMany({});
        const contacts = await prisma.contact.findMany({});
        const saleType = await prisma.albumArtSaleType.findFirst({});

        const createAlbumArtDTO = new CreateAlbumArtDTO({
          name: 'asdf',
          description: 'asdf',
          updateDescription: 'asdf',
          saleTypeId: saleType.id,
          licenses: licenses.map((license, index) => ({
            cost: 1000 * (index + 1),
            draftCount: 1,
            isApplicationAvailable: true,
            isCommercialUseAllowed: true,
            isCopyRightTransferAllowed: true,
            isOriginFileProvided: true,
            licenseId: license.id,
            updateCount: 1,
            workPeriod: 2,
          })),
          contacts: contacts.map((contact) => ({
            contactId: contact.id,
            method: 'test',
          })),
          images: [
            {
              imageId: images[0].id,
              isThumbnail: true,
            },
            {
              imageId: images[1].id,
              isThumbnail: false,
            },
          ],
        });

        const albumArtId = await albumArtService.createAlbumArt(user.musician.id, createAlbumArtDTO);

        expect(albumArtId).toBeDefined();

        const albumArt = await albumArtService.findAlbumArt(albumArtId);

        expect(albumArt).toBeDefined();
        expect(albumArt.isAuthorized).toBe(false);
        expect(albumArt.isPending).toBe(true);
        expect(albumArt.images.length).toBe(2);
      });
    });
    it('Create Album Art Thumbnail Error', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);

        const user = await prisma.user.findFirst({
          where: {
            email: '9898junjun@naver.com',
          },
          include: {
            musician: true,
          },
        });
        const images = [
          await prisma.image.create({
            data: {
              extension: 'jpg',
              originalName: 'asdf',
              url: 'asdf',
            },
          }),
          await prisma.image.create({
            data: {
              extension: 'jpg',
              originalName: 'asdf',
              url: 'asdf',
            },
          }),
        ];
        const licenses = await prisma.license.findMany({});
        const contacts = await prisma.contact.findMany({});
        const saleType = await prisma.albumArtSaleType.findFirst({});

        const createAlbumArtDTO = new CreateAlbumArtDTO({
          name: 'asdf',
          description: 'asdf',
          updateDescription: 'asdf',
          saleTypeId: saleType.id,
          licenses: licenses.map((license, index) => ({
            cost: 1000 * (index + 1),
            draftCount: 1,
            isApplicationAvailable: true,
            isCommercialUseAllowed: true,
            isCopyRightTransferAllowed: true,
            isOriginFileProvided: true,
            licenseId: license.id,
            updateCount: 1,
            workPeriod: 2,
          })),
          contacts: contacts.map((contact) => ({
            contactId: contact.id,
            method: 'test',
          })),
          images: [
            {
              imageId: images[0].id,
              isThumbnail: true,
            },
            {
              imageId: images[1].id,
              isThumbnail: true,
            },
          ],
        });

        expect(async () => await albumArtService.createAlbumArt(user.musician.id, createAlbumArtDTO)).rejects.toThrow(
          new CustomException(VALIDATE_SERVICE_ERROR_CODE.ONLY_ONE_THUMBNAIL)
        );
      });
    });
    it('Delete Album Art', async () => {
      await cls.run(async () => {
        cls.set(PRISMA_CLS_KEY, prisma);

        const albumArt = await prisma.albumArt.findFirst({
          include: {
            musicianService: {
              include: {
                musician: true,
              },
            },
          },
        });

        await albumArtService.deleteAlbumArt(albumArt.id, albumArt.musicianService.musicianId);

        expect(async () => await albumArtService.findAlbumArt(albumArt.id)).rejects.toThrow(
          new CustomException(ALBUM_ART_ERROR_CODE.ALBUM_ART_NOT_FOUND)
        );
      });
    });
  });
});
