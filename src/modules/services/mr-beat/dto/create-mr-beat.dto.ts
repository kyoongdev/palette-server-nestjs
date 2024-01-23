import { Prisma } from '@prisma/client';

import { GroupTypeReqDecorator } from '@/modules/musician/validators';
import { Property } from '@/utils/swagger';

import { CreateMrBeatContactDTO, CreateMrBeatContactDTOProps } from './create-mr-beat-contact.dto';
import { CreateMrBeatLicenseDTO, CreateMrBeatLicenseDTOProps } from './create-mr-beat-license.dto';

export interface CreateMrBeatDTOProps {
  name: string;
  groupType: number;
  thumbnailId: string;
  musicId: string;
  genreId: string;
  moodId: string;
  contacts: CreateMrBeatContactDTOProps[];
  licenses: CreateMrBeatLicenseDTOProps[];
}
export class CreateMrBeatDTO {
  @Property({ apiProperty: { description: '뮤지션 이름', type: 'string' } })
  name: string;

  @GroupTypeReqDecorator()
  groupType: number;

  @Property({ apiProperty: { description: '썸네일 아이디', type: 'string', example: 'image 업로드 후의 id' } })
  thumbnailId: string;

  @Property({ apiProperty: { description: '음원 아이디', type: 'string', example: 'music 업로드 후의 id' } })
  musicId: string;

  @Property({ apiProperty: { description: '장르 아이디', type: 'string' } })
  genreId: string;

  @Property({ apiProperty: { description: '분위기 아이디', type: 'string' } })
  moodId: string;

  @Property({ apiProperty: { type: CreateMrBeatContactDTO, isArray: true } })
  contacts: CreateMrBeatContactDTO[];

  @Property({ apiProperty: { type: CreateMrBeatLicenseDTO, isArray: true } })
  licenses: CreateMrBeatLicenseDTO[];

  constructor(props: CreateMrBeatDTOProps) {
    if (props) {
      this.name = props.name;
      this.groupType = props.groupType;
      this.thumbnailId = props.thumbnailId;
      this.musicId = props.musicId;
      this.genreId = props.genreId;
      this.moodId = props.moodId;
      this.contacts = props.contacts.map((contact) => new CreateMrBeatContactDTO(contact));
      this.licenses = props.licenses.map((license) => new CreateMrBeatLicenseDTO(license));
    }
  }

  public toCreateArgs(musicianId: string): Prisma.MrBeatCreateArgs['data'] {
    return {
      name: this.name,
      groupType: this.groupType,
      thumbnail: {
        connect: {
          id: this.thumbnailId,
        },
      },
      music: {
        connect: {
          id: this.musicId,
        },
      },
      genre: {
        connect: {
          id: this.genreId,
        },
      },
      mood: {
        connect: {
          id: this.moodId,
        },
      },
      contacts: {
        create: this.contacts.map((contact) => ({
          method: contact.method,
          contact: {
            connect: {
              id: contact.contactId,
            },
          },
        })),
      },
      licenses: {
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
      musicianService: {
        create: {
          musician: {
            connect: { id: musicianId },
          },
        },
      },
    };
  }
}
