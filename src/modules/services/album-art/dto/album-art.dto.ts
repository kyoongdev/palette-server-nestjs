import { FindAlbumArt } from '@/interface/album-art.interface';
import { SERVICE_STATUS, ServiceStatus } from '@/interface/service.interface';
import { DateDTO, DateDTOProps } from '@/utils';
import { getServiceStatus } from '@/utils/service';
import { Property } from '@/utils/swagger';

import { AlbumArtContactDTO, AlbumArtContactDTOProps } from './album-art-contact.dto';
import { AlbumArtImageDTO, AlbumArtImageDTOProps } from './album-art-image.dto';
import { AlbumArtLicenseDTO, AlbumArtLicenseDTOProps } from './album-art-license.dto';
import { AlbumArtSaleTypeDTO, AlbumArtSaleTypeDTOProps } from './album-art-sale-type.dto';

export interface AlbumArtDTOProps extends DateDTOProps {
  id: string;
  name: string;
  description: string;
  updateDescription: string;
  status: ServiceStatus;
  serviceId: string;
  images: AlbumArtImageDTOProps[];
  saleType: AlbumArtSaleTypeDTOProps;
  contacts: AlbumArtContactDTOProps[];
  licenses: AlbumArtLicenseDTOProps[];
}

export class AlbumArtDTO extends DateDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '작품 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '작품 설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '수정 설명', type: 'string' } })
  updateDescription: string;

  @Property({ apiProperty: { description: '상태', type: 'string', enum: Object.values(SERVICE_STATUS) } })
  status: ServiceStatus;

  @Property({ apiProperty: { description: '서비스 id', type: 'string' } })
  serviceId: string;

  @Property({ apiProperty: { description: '이미지', type: AlbumArtImageDTO, isArray: true } })
  images: AlbumArtImageDTO[];

  @Property({ apiProperty: { description: '판매 타입', type: AlbumArtSaleTypeDTO } })
  saleType: AlbumArtSaleTypeDTO;

  @Property({ apiProperty: { description: '연락처', type: AlbumArtContactDTO, isArray: true } })
  contacts: AlbumArtContactDTO[];

  @Property({ apiProperty: { description: '라이센스', type: AlbumArtLicenseDTO, isArray: true } })
  licenses: AlbumArtLicenseDTO[];

  constructor(props: AlbumArtDTOProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.updateDescription = props.updateDescription;
    this.status = props.status;
    this.serviceId = props.serviceId;
    this.images = props.images.map((image) => new AlbumArtImageDTO(image));
    this.saleType = new AlbumArtSaleTypeDTO(props.saleType);
    this.contacts = props.contacts.map((contact) => new AlbumArtContactDTO(contact));
    this.licenses = props.licenses.map((license) => new AlbumArtLicenseDTO(license));
  }

  static fromFindAlbumArt(data: FindAlbumArt): AlbumArtDTO {
    return new AlbumArtDTO({
      id: data.id,
      name: data.name,
      description: data.description,
      updateDescription: data.updateDescription,
      status: getServiceStatus(data),
      images: data.images.map((image) => ({
        image: image.image,
        imageId: image.imageId,
        isThumbnail: image.isThumbnail,
      })),
      saleType: {
        name: data.saleTypes.at(-1).saleType.name,
        saleTypeId: data.saleTypes.at(-1).saleType.id,
      },
      contacts: data.contacts.map((contact) => AlbumArtContactDTO.fromFindAlbumArtContact(contact)),
      licenses: data.licenses.map((license) => AlbumArtLicenseDTO.fromFindAlbumArtLicense(license)),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      serviceId: data.musicianServiceId,
    });
  }
}
