import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

import { CreateRecordingImageDTO } from './create-recording-image.dto';
import { CreateRecordingLicenseDTO } from './create-recording-license.dto';
import { CreateRecordingRegionDTO } from './create-recording-region.dto';
import { CreateRecordingDTOProps } from './create-recording.dto';

export interface UpdateRecordingDTOProps extends Partial<CreateRecordingDTOProps> {}

export class UpdateRecordingDTO {
  @Property({ apiProperty: { description: '레코딩 이름', type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { description: '스튜디오 이름', type: 'string', nullable: true } })
  studioName?: string;

  @Property({ apiProperty: { description: '엔지니어 지원 여부', type: 'boolean', nullable: true } })
  isEngineerSupported?: boolean;

  @Property({ apiProperty: { description: '예약 링크', type: 'string', nullable: true } })
  reservationLink?: string;

  @Property({ apiProperty: { description: '레코딩 설명', type: 'string', nullable: true } })
  description?: string;

  @Property({ apiProperty: { description: '이미지', type: CreateRecordingImageDTO, isArray: true, nullable: true } })
  images?: CreateRecordingImageDTO[];

  @Property({ apiProperty: { description: '지역', type: CreateRecordingRegionDTO, nullable: true } })
  region?: CreateRecordingRegionDTO;

  @Property({
    apiProperty: { description: '라이센스', type: CreateRecordingLicenseDTO, isArray: true, nullable: true },
  })
  licenses?: CreateRecordingLicenseDTO[];

  constructor(props?: UpdateRecordingDTOProps) {
    if (props) {
      this.name = props.name;
      this.studioName = props.studioName;
      this.isEngineerSupported = props.isEngineerSupported;
      this.reservationLink = props.reservationLink;
      this.description = props.description;
      this.images = props.images?.map((image) => new CreateRecordingImageDTO(image));
      this.region = new CreateRecordingRegionDTO(props.region);
      this.licenses = props.licenses?.map((license) => new CreateRecordingLicenseDTO(license));
    }
  }

  public toUpdateArgs(): Prisma.RecordingUpdateArgs['data'] {
    return {
      name: this.name,
      studioName: this.studioName,
      isEngineerSupported: this.isEngineerSupported,
      reservationLink: this.reservationLink,
      description: this.description,
      images: this.images && {
        deleteMany: {},
        create: this.images.map((image) => ({
          image: {
            connect: { id: image.imageId },
          },
          isThumbnail: image.isThumbnail,
        })),
      },
      recordingRegion: this.region && {
        update: {
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
      licenses: this.licenses && {
        deleteMany: {},
        create: this.licenses.map(({ licenseId, ...rest }) => ({
          ...rest,
          license: {
            connect: {
              id: licenseId,
            },
          },
        })),
      },
    };
  }
}
