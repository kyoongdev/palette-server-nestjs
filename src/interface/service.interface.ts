import { Prisma } from '@prisma/client';

import { CreateAlbumArtDTO, UpdateAlbumArtDTO } from '@/modules/services/album-art/dto';
import { CreateArtistDTO, UpdateArtistDTO } from '@/modules/services/artist/dto';
import { CreateMixMasteringDTO, UpdateMixMasteringDTO } from '@/modules/services/mix-mastering/dto';
import { CreateMrBeatDTO, UpdateMrBeatDTO } from '@/modules/services/mr-beat/dto';
import { CreateRecordingDTO, UpdateRecordingDTO } from '@/modules/services/recording/dto';
import { adminServiceInclude } from '@/utils/constants/include/service';

export const SERVICE_TYPE = {
  ARTIST: 'ARTIST',
  MR_BEAT: 'MR_BEAT',
  RECORDING: 'RECORDING',
  MIX_MASTERING: 'MIX_MASTERING',
  ALBUM_ART: 'ALBUM_ART',
};

export type ServiceType = keyof typeof SERVICE_TYPE;

export type AdminFindServiceList = Prisma.MusicianServiceGetPayload<{ include: typeof adminServiceInclude }>;

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
