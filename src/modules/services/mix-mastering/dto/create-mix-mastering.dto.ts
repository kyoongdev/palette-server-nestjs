import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

import { CreateMixMasteringContactDTO, CreateMixMasteringContactDTOProps } from './create-mix-mastering-contact.dto';
import { CreateMixMasteringLicenseDTO, CreateMixMasteringLicenseDTOProps } from './create-mix-mastering-license.dto';
import { CreateMixMasteringMusicDTO, CreateMixMasteringMusicDTOProps } from './create-mix-mastering-music.dto';

export interface CreateMixMasteringDTOProps {
  name: string;
  description: string;
  updateDescription: string;
  thumbnailId: string;
  musics: CreateMixMasteringMusicDTOProps[];
  genreId: string;
  contacts: CreateMixMasteringContactDTOProps[];
  licenses: CreateMixMasteringLicenseDTOProps[];
}

export class CreateMixMasteringDTO {
  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '업데이트 설명', type: 'string' } })
  updateDescription: string;

  @Property({ apiProperty: { description: '썸네일 아이디', type: 'string' } })
  thumbnailId: string;

  @Property({ apiProperty: { description: '음악', type: CreateMixMasteringMusicDTO, isArray: true } })
  musics: CreateMixMasteringMusicDTO[];

  @Property({ apiProperty: { description: '장르 아이디', type: 'string' } })
  genreId: string;

  @Property({ apiProperty: { description: '연락처', type: CreateMixMasteringContactDTO, isArray: true } })
  contacts: CreateMixMasteringContactDTO[];

  @Property({ apiProperty: { description: '라이센스', type: CreateMixMasteringLicenseDTO, isArray: true } })
  licenses: CreateMixMasteringLicenseDTO[];

  constructor(props?: CreateMixMasteringDTOProps) {
    if (props) {
      this.name = props.name;
      this.description = props.description;
      this.updateDescription = props.updateDescription;
      this.thumbnailId = props.thumbnailId;
      this.musics = props.musics.map((music) => new CreateMixMasteringMusicDTO(music));
      this.genreId = props.genreId;
      this.contacts = props.contacts.map((contact) => new CreateMixMasteringContactDTO(contact));
      this.licenses = props.licenses.map((license) => new CreateMixMasteringLicenseDTO(license));
    }
  }

  public toCreateArgs(musicianId: string): Prisma.MixMasteringCreateInput {
    return {
      name: this.name,
      description: this.description,
      updateDescription: this.updateDescription,
      thumbnail: {
        connect: {
          id: this.thumbnailId,
        },
      },
      genres: {
        create: {
          genre: {
            connect: {
              id: this.genreId,
            },
          },
        },
      },
      musics: {
        create: this.musics.map(({ musicId, ...rest }) => ({
          ...rest,
          music: {
            connect: {
              id: musicId,
            },
          },
        })),
      },
      contacts: {
        create: this.contacts.map(({ contactId, method }) => ({
          method,
          contact: {
            connect: {
              id: contactId,
            },
          },
        })),
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
      isPending: true,
      isAuthorized: false,
    };
  }
}
