import { Prisma } from '@prisma/client';

import {
  albumArtContactInclude,
  albumArtInclude,
  albumArtLicenseInclude,
  albumArtListInclude,
  albumArtSaleTypeInclude,
} from '@/utils/constants/include/album-art';

import { FindSQLCommonMusician } from './musician.interface';

export interface FindSQLAlbumArt extends FindSQLCommonMusician {
  id: string;
  name: string;
  thumbnailUrl: string;
  saleTypeNames: string;
  cost: number;
  score: number | null;
  createdAt: Date;
  serviceId: string;
  isPending: boolean;
  isAuthorized: boolean;
  isSaleStopped: boolean;
}

export type FindAlbumArtList = Prisma.AlbumArtGetPayload<{ include: typeof albumArtListInclude }>;
export type FindAlbumArt = Prisma.AlbumArtGetPayload<{ include: typeof albumArtInclude }>;
export type FindAlbumArtLicense = Prisma.AlbumArtLicenseGetPayload<{ include: typeof albumArtLicenseInclude }>;
export type FindAlbumArtSaleType = Prisma.AlbumArtSaleTypeBridgeGetPayload<{ include: typeof albumArtSaleTypeInclude }>;
export type FindAlbumArtContact = Prisma.AlbumArtContactGetPayload<{ include: typeof albumArtContactInclude }>;
