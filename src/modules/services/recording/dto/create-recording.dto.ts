import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

import { CreateRecordingImageDTO, CreateRecordingImageDTOProps } from './create-recording-image.dto';
import { CreateRecordingLicenseDTO, CreateRecordingLicenseDTOProps } from './create-recording-license.dto';
import { CreateRecordingRegionDTO, CreateRecordingRegionDTOProps } from './create-recording-region.dto';

export interface CreateRecordingDTOProps {
  name: string;
  studioName: string;
  isEngineerSupported: boolean;
  reservationLink: string;
  description: string;
  images: CreateRecordingImageDTOProps[];
  region: CreateRecordingRegionDTOProps;
  licenses: CreateRecordingLicenseDTOProps[];
}

export class CreateRecordingDTO {
  @Property({ apiProperty: { description: '레코딩 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '스튜디오 이름', type: 'string' } })
  studioName: string;

  @Property({ apiProperty: { description: '엔지니어 지원 여부', type: 'boolean' } })
  isEngineerSupported: boolean;

  @Property({ apiProperty: { description: '예약 링크', type: 'string' } })
  reservationLink: string;

  @Property({ apiProperty: { description: '레코딩 설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '이미지', type: CreateRecordingImageDTO, isArray: true } })
  images: CreateRecordingImageDTO[];

  @Property({ apiProperty: { description: '지역', type: CreateRecordingRegionDTO } })
  region: CreateRecordingRegionDTO;

  @Property({ apiProperty: { description: '라이센스', type: CreateRecordingLicenseDTO, isArray: true } })
  licenses: CreateRecordingLicenseDTO[];

  constructor(props?: CreateRecordingDTOProps) {
    if (props) {
      this.name = props.name;
      this.studioName = props.studioName;
      this.isEngineerSupported = props.isEngineerSupported;
      this.reservationLink = props.reservationLink;
      this.description = props.description;
      this.images = props.images.map((image) => new CreateRecordingImageDTO(image));
      this.region = new CreateRecordingRegionDTO(props.region);
      this.licenses = props.licenses.map((license) => new CreateRecordingLicenseDTO(license));
    }
  }

  public toCreateArgs(musicianId: string): Prisma.RecordingCreateArgs['data'] {
    return {
      name: this.name,
      studioName: this.studioName,
      isEngineerSupported: this.isEngineerSupported,
      reservationLink: this.reservationLink,
      description: this.description,
      images: {
        create: this.images.map((image) => ({
          image: {
            connect: { id: image.imageId },
          },
          isThumbnail: image.isThumbnail,
        })),
      },
      recordingRegion: {
        create: {
          regionLargeGroup: {
            connect: {
              id: this.region.regionLargeGroupId,
            },
          },
          ...(this.region.regionSmallGroupId && {
            regionSmallGroup: {
              connect: {
                id: this.region.regionSmallGroupId,
              },
            },
          }),
        },
      },
      licenses: {
        create: this.licenses.map(({ licenseId, ...rest }) => ({
          ...rest,
          license: {
            connect: {
              id: licenseId,
            },
          },
        })),
      },
      musicianService: {
        create: {
          musician: {
            connect: {
              id: musicianId,
            },
          },
        },
      },
    };
  }
}
