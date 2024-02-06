import type { Prisma } from '@prisma/client';

import {
  artistContactInclude,
  artistDetailInclude,
  artistLicenseInclude,
  artistListInclude,
  artistSaleTypeInclude,
} from '@/utils/constants/include/artist';

import type { FindSQLCommonMusician } from './musician.interface';

export interface FindSQLArtistList extends FindSQLCommonMusician {
  id: string;
  name: string;
  thumbnailUrl: string;
  createdAt: Date;
  score: number;
  cost: number;
  saleTypes: string;
  isPending: boolean;
  isAuthorized: boolean;
  isSaleStopped: boolean;
}

export type FindArtist = Prisma.ArtistGetPayload<{ include: typeof artistDetailInclude }>;
export type FindArtistList = Prisma.ArtistGetPayload<{ include: typeof artistListInclude }>;
export type FindArtistLicense = Prisma.ArtistLicenseGetPayload<{ include: typeof artistLicenseInclude }>;
export type FindArtistContact = Prisma.ArtistContactGetPayload<{ include: typeof artistContactInclude }>;
export type FindArtistSaleTypeBridge = Prisma.ArtistSaleTypeBridgeGetPayload<{ include: typeof artistSaleTypeInclude }>;
