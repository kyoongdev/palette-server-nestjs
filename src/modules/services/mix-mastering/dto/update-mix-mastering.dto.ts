import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

import { CreateMixMasteringContactDTO, CreateMixMasteringContactDTOProps } from './create-mix-mastering-contact.dto';
import { CreateMixMasteringLicenseDTO, CreateMixMasteringLicenseDTOProps } from './create-mix-mastering-license.dto';
import { CreateMixMasteringMusicDTO, CreateMixMasteringMusicDTOProps } from './create-mix-mastering-music.dto';

export interface UpdateMixMasteringDTOProps {
  name?: string;
  description?: string;
  updateDescription?: string;
  thumbnailId?: string;
  musics?: CreateMixMasteringMusicDTOProps[];
  genreId?: string;
  contacts?: CreateMixMasteringContactDTOProps[];
  licenses?: CreateMixMasteringLicenseDTOProps[];
}

export class UpdateMixMasteringDTO {
  @Property({ apiProperty: { description: '이름', nullable: true, type: 'string' } })
  name?: string;

  @Property({ apiProperty: { description: '설명', nullable: true, type: 'string' } })
  description?: string;

  @Property({ apiProperty: { description: '업데이트 설명', nullable: true, type: 'string' } })
  updateDescription?: string;

  @Property({ apiProperty: { description: '썸네일 아이디', nullable: true, type: 'string' } })
  thumbnailId?: string;

  @Property({ apiProperty: { description: '음악', nullable: true, type: CreateMixMasteringMusicDTO, isArray: true } })
  musics?: CreateMixMasteringMusicDTO[];

  @Property({ apiProperty: { description: '장르 아이디', nullable: true, type: 'string' } })
  genreId?: string;

  @Property({
    apiProperty: { description: '연락처', nullable: true, type: CreateMixMasteringContactDTO, isArray: true },
  })
  contacts?: CreateMixMasteringContactDTO[];

  @Property({
    apiProperty: { description: '라이센스', nullable: true, type: CreateMixMasteringLicenseDTO, isArray: true },
  })
  licenses?: CreateMixMasteringLicenseDTO[];

  constructor(props?: UpdateMixMasteringDTOProps) {
    if (props) {
      this.name = props.name;
      this.description = props.description;
      this.updateDescription = props.updateDescription;
      this.thumbnailId = props.thumbnailId;
      this.musics = props.musics?.map((music) => new CreateMixMasteringMusicDTO(music));
      this.genreId = props.genreId;
      this.contacts = props.contacts?.map((contact) => new CreateMixMasteringContactDTO(contact));
      this.licenses = props.licenses?.map((license) => new CreateMixMasteringLicenseDTO(license));
    }
  }

  public toUpdateArgs(): Prisma.MixMasteringUpdateInput {
    return {
      name: this.name,
      description: this.description,
      updateDescription: this.updateDescription,
      thumbnail: this.thumbnailId && {
        connect: {
          id: this.thumbnailId,
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
      musics: this.musics && {
        deleteMany: {},
        create: this.musics.map(({ musicId, ...rest }) => ({
          ...rest,
          music: {
            connect: {
              id: musicId,
            },
          },
        })),
      },
      contacts: this.contacts && {
        deleteMany: {},
        create: this.contacts.map(({ contactId, method }) => ({
          method,
          contact: {
            connect: {
              id: contactId,
            },
          },
        })),
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
      isPending: true,
      isAuthorized: false,
    };
  }
}
