import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

import { CreateAlbumArtContactDTO, CreateAlbumArtContactDTOProps } from './create-album-art-contact.dto';
import { CreateAlbumArtImageDTO, CreateAlbumArtImageDTOProps } from './create-album-art-image.dto';
import { CreateAlbumArtLicenseDTO, CreateAlbumArtLicenseDTOProps } from './create-album-art-license.dto';

export interface CreateAlbumArtDTOProps {
  name: string;
  description: string;
  updateDescription: string;
  images: CreateAlbumArtImageDTOProps[];
  saleTypeIds: string[];
  contacts: CreateAlbumArtContactDTOProps[];
  licenses: CreateAlbumArtLicenseDTOProps[];
}

export class CreateAlbumArtDTO {
  @Property({ apiProperty: { description: '작품 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '작품 설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '수정 설명', type: 'string' } })
  updateDescription: string;

  @Property({ apiProperty: { description: '이미지', type: CreateAlbumArtImageDTO, isArray: true } })
  images: CreateAlbumArtImageDTO[];

  @Property({ apiProperty: { description: '판매 타입', type: 'string', isArray: true } })
  saleTypeIds: string[];

  @Property({ apiProperty: { description: '연락처', type: CreateAlbumArtContactDTO, isArray: true } })
  contacts: CreateAlbumArtContactDTO[];

  @Property({ apiProperty: { description: '라이센스', type: CreateAlbumArtLicenseDTO, isArray: true } })
  licenses: CreateAlbumArtLicenseDTO[];

  constructor(props?: CreateAlbumArtDTOProps) {
    if (props) {
      this.name = props.name;
      this.description = props.description;
      this.updateDescription = props.updateDescription;
      this.images = props.images.map((image) => new CreateAlbumArtImageDTO(image));
      this.saleTypeIds = props.saleTypeIds;
      this.contacts = props.contacts.map((contact) => new CreateAlbumArtContactDTO(contact));
      this.licenses = props.licenses.map((license) => new CreateAlbumArtLicenseDTO(license));
    }
  }

  public toCreateArgs(musicianId: string): Prisma.AlbumArtCreateInput {
    return {
      name: this.name,
      description: this.description,
      updateDescription: this.updateDescription,
      isAuthorized: false,
      isPending: true,
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
            connect: { id: image.imageId },
          },
          isThumbnail: image.isThumbnail,
        })),
      },
      saleTypes: {
        create: this.saleTypeIds.map((id) => ({
          saleType: {
            connect: {
              id,
            },
          },
        })),
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
