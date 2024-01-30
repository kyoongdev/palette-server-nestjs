import { Prisma } from '@prisma/client';

import { GroupTypeReqDecorator } from '@/modules/musician/validators';
import { Property } from '@/utils/swagger';

import { CreateMrBeatContactDTO, CreateMrBeatContactDTOProps } from './create-mr-beat-contact.dto';
import { CreateMrBeatLicenseDTO, CreateMrBeatLicenseDTOProps } from './create-mr-beat-license.dto';

export interface UpdateMrBeatDTOProps {
  name?: string;
  groupType?: number;
  thumbnailId?: string;
  musicId?: string;
  genreId?: string;
  moodId?: string;
  contacts?: CreateMrBeatContactDTOProps[];
  licenses?: CreateMrBeatLicenseDTOProps[];
}
export class UpdateMrBeatDTO {
  @Property({ apiProperty: { description: '뮤지션 이름', type: 'string', nullable: true } })
  name?: string;

  @GroupTypeReqDecorator(true)
  groupType?: number;

  @Property({
    apiProperty: { description: '썸네일 아이디', type: 'string', example: 'image 업로드 후의 id', nullable: true },
  })
  thumbnailId?: string;

  @Property({
    apiProperty: { description: '음원 아이디', type: 'string', example: 'music 업로드 후의 id', nullable: true },
  })
  musicId?: string;

  @Property({ apiProperty: { description: '장르 아이디', type: 'string', nullable: true } })
  genreId?: string;

  @Property({ apiProperty: { description: '분위기 아이디', type: 'string', nullable: true } })
  moodId?: string;

  @Property({
    apiProperty: {
      type: CreateMrBeatContactDTO,
      isArray: true,
      nullable: true,
      description: '바뀐 값 + 바뀌지 않은 값 모두 필요',
    },
  })
  contacts?: CreateMrBeatContactDTO[];

  @Property({
    apiProperty: {
      type: CreateMrBeatLicenseDTO,
      isArray: true,
      nullable: true,
      description: '바뀐 값 + 바뀌지 않은 값 모두 필요',
    },
  })
  licenses?: CreateMrBeatLicenseDTO[];

  constructor(props: UpdateMrBeatDTOProps) {
    if (props) {
      this.name = props.name;
      this.groupType = props.groupType;
      this.thumbnailId = props.thumbnailId;
      this.musicId = props.musicId;
      this.genreId = props.genreId;
      this.moodId = props.moodId;
      this.contacts = props.contacts?.map((contact) => new CreateMrBeatContactDTO(contact));
      this.licenses = props.licenses?.map((license) => new CreateMrBeatLicenseDTO(license));
    }
  }

  public toUpdateArgs(): Prisma.MrBeatUpdateArgs['data'] {
    return {
      name: this.name,
      groupType: this.groupType,
      thumbnail: this.thumbnailId && {
        connect: {
          id: this.thumbnailId,
        },
      },
      music: this.musicId && {
        connect: {
          id: this.musicId,
        },
      },
      genres: this.genreId && {
        deleteMany: {},
        create: {
          genre: {
            connect: {
              id: this.genreId,
            },
          },
        },
      },
      moods: this.moodId && {
        deleteMany: {},
        create: {
          mood: {
            connect: {
              id: this.moodId,
            },
          },
        },
      },
      ...(this.contacts && {
        contacts: {
          deleteMany: {},
          create: this.contacts.map((contact) => ({
            method: contact.method,
            contact: {
              connect: {
                id: contact.contactId,
              },
            },
          })),
        },
      }),
      ...(this.licenses && {
        licenses: {
          deleteMany: {},
          create: this.licenses.map((license) => ({
            usePeriod: license.usePeriod,
            cost: license.cost,
            isNewSongWithVoiceAllowed: license.isNewSongWithVoiceAllowed,
            isProfitActivityAllowed: license.isProfitActivityAllowed,
            isPerformanceActivityAllowed: license.isPerformanceActivityAllowed,
            isBackgroundMusicAllowed: license.isBackgroundMusicAllowed,
            isMVProduceAllowed: license.isMVProduceAllowed,
            isShareAllowed: license.isShareAllowed,
            isArrangeAllowed: license.isArrangeAllowed,
            license: {
              connect: {
                id: license.licenseId,
              },
            },
          })),
        },
      }),
    };
  }
}
