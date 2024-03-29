import { AlbumArt, Artist, MixMastering, MrBeat, Prisma, Recording } from '@prisma/client';

import { CreateAlbumArtDTO, UpdateAlbumArtDTO } from '@/modules/services/album-art/dto';
import { CreateArtistDTO, UpdateArtistDTO } from '@/modules/services/artist/dto';
import { CreateMixMasteringDTO, UpdateMixMasteringDTO } from '@/modules/services/mix-mastering/dto';
import { CreateMrBeatDTO, UpdateMrBeatDTO } from '@/modules/services/mr-beat/dto';
import { CreateRecordingDTO, UpdateRecordingDTO } from '@/modules/services/recording/dto';
import { serviceInclude, serviceWithDetailInclude } from '@/utils/constants/include/service';

export const SERVICE_TYPE = {
  ARTIST: 'ARTIST',
  MR_BEAT: 'MR_BEAT',
  RECORDING: 'RECORDING',
  MIX_MASTERING: 'MIX_MASTERING',
  ALBUM_ART: 'ALBUM_ART',
};

export const SERVICE_STATUS = {
  PENDING: 'PENDING',
  STOPPED: 'STOPPED',
  REJECTED: 'REJECTED',
  ON_SALE: 'ON_SALE',
};

export type ServiceStatus = keyof typeof SERVICE_STATUS;
export type ServiceType = keyof typeof SERVICE_TYPE;

export type FindServiceList = Prisma.MusicianServiceGetPayload<{ include: typeof serviceInclude }>;
export type FindServiceWithDetailList = Prisma.MusicianServiceGetPayload<{ include: typeof serviceWithDetailInclude }>;

export type AllService = Artist | MrBeat | Recording | MixMastering | AlbumArt;

export type ValidateArtist = UpdateArtistDTO | CreateArtistDTO;
export type ValidateMrBeat = UpdateMrBeatDTO | CreateMrBeatDTO;
export type ValidateRecording = UpdateRecordingDTO | CreateRecordingDTO;
export type ValidateMixMastering = UpdateMixMasteringDTO | CreateMixMasteringDTO;
export type ValidateAlbumArt = UpdateAlbumArtDTO | CreateAlbumArtDTO;
export type ValidateLicenses = Array<{ licenseId: string }>;
export type ValidateImageWithThumbnail = Array<{ imageId: string; isThumbnail: boolean }>;
export type ValidateRegion = { regionLargeGroupId: string; regionSmallGroupId?: string };
export type ValidateContact = Array<{ contactId: string }>;
export type ValidateMusic = Array<{ musicId: string }>;
