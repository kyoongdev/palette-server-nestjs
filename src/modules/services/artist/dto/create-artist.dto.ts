import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

import { CreateArtistContactDTO, type CreateArtistContactDTOProps } from './create-artist-contact.dto';
import { CreateArtistImageDTO, type CreateArtistImageDTOProps } from './create-artist-image.dto';
import { CreateArtistLicenseDTO, type CreateArtistLicenseDTOProps } from './create-artist-license.dto';

export interface CreateArtistDTOProps {
  name: string;
  description: string;
  updateDescription: string;
  images: CreateArtistImageDTOProps[];
  saleTypeIds: string[];
  licenses: CreateArtistLicenseDTOProps[];
  contacts: CreateArtistContactDTOProps[];
}

export class CreateArtistDTO {
  @Property({ apiProperty: { description: '아티스트 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '아티스트 설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '아티스트 업데이트 설명', type: 'string' } })
  updateDescription: string;

  @Property({ apiProperty: { description: '아티스트 이미지', type: CreateArtistImageDTO, isArray: true } })
  images: CreateArtistImageDTO[];

  @Property({ apiProperty: { description: '아티스트 판매 타입', type: 'string', isArray: true } })
  saleTypeIds: string[];

  @Property({ apiProperty: { description: '아티스트 라이센스', type: CreateArtistLicenseDTO, isArray: true } })
  licenses: CreateArtistLicenseDTO[];

  @Property({ apiProperty: { description: '아티스트 연락 수단', type: CreateArtistContactDTO, isArray: true } })
  contacts: CreateArtistContactDTO[];

  constructor(props?: CreateArtistDTOProps) {
    if (props) {
      this.name = props.name;
      this.description = props.description;
      this.updateDescription = props.updateDescription;
      this.images = props.images.map((image) => new CreateArtistImageDTO(image));
      this.saleTypeIds = props.saleTypeIds;
      this.licenses = props.licenses.map((license) => new CreateArtistLicenseDTO(license));
      this.contacts = props.contacts.map((contact) => new CreateArtistContactDTO(contact));
    }
  }

  public toCreateArgs(musicianId: string): Prisma.ArtistCreateArgs['data'] {
    return {
      name: this.name,
      description: this.description,
      updateDescription: this.updateDescription,
      musicianService: {
        create: {
          musician: {
            connect: {
              id: musicianId,
            },
          },
        },
      },
      images: {
        create: this.images.map((image) => ({
          image: {
            connect: {
              id: image.imageId,
            },
          },
          isThumbnail: image.isThumbnail,
        })),
      },
      contacts: {
        create: this.contacts.map((contact) => ({
          contact: {
            connect: {
              id: contact.contactId,
            },
          },
          method: contact.method,
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
      isAuthorized: false,
      isPending: true,
      saleTypes: {
        create: this.saleTypeIds.map((saleTypeId) => ({
          saleType: {
            connect: {
              id: saleTypeId,
            },
          },
        })),
      },
    };
  }
}
