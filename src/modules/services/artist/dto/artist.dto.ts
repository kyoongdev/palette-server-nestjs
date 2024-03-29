import { FindArtist } from '@/interface/artist.interface';
import { SERVICE_STATUS, ServiceStatus } from '@/interface/service.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { DateDTO, DateDTOProps } from '@/utils';
import { getServiceStatus } from '@/utils/service';
import { Property } from '@/utils/swagger';

import { ArtistContactDTO, ArtistContactDTOProps } from './artist-contact.dto';
import { ArtistImageDTO, ArtistImageDTOProps } from './artist-image.dto';
import { ArtistLicenseDTO, ArtistLicenseDTOProps } from './artist-license.dto';
import { ArtistSaleTypeDTO, ArtistSaleTypeDTOProps } from './artist-sale-type.dto';

export interface ArtistDTOProps extends DateDTOProps {
  id: string;
  name: string;
  description: string;
  updateDescription: string;
  status: ServiceStatus;
  serviceId: string;
  images: ArtistImageDTOProps[];
  saleTypes: ArtistSaleTypeDTOProps[];
  licenses: ArtistLicenseDTOProps[];
  contacts: ArtistContactDTOProps[];
  musician: CommonMusicianDTOProps;
}

export class ArtistDTO extends DateDTO {
  @Property({ apiProperty: { description: '아티스트 아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '아티스트 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '아티스트 설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '아티스트 업데이트 설명', type: 'string' } })
  updateDescription: string;

  @Property({ apiProperty: { description: '상태', type: 'string', enum: Object.values(SERVICE_STATUS) } })
  status: ServiceStatus;

  @Property({ apiProperty: { description: '서비스 id', type: 'string' } })
  serviceId: string;

  @Property({ apiProperty: { description: '아티스트 이미지', type: ArtistImageDTO, isArray: true } })
  images: ArtistImageDTO[];

  @Property({ apiProperty: { description: '아티스트 판매 타입', type: ArtistSaleTypeDTO, isArray: true } })
  saleTypes: ArtistSaleTypeDTO[];

  @Property({ apiProperty: { description: '아티스트 라이센스', type: ArtistLicenseDTO, isArray: true } })
  licenses: ArtistLicenseDTO[];

  @Property({ apiProperty: { description: '아티스트 연락 수단', type: ArtistContactDTO, isArray: true } })
  contacts: ArtistContactDTO[];

  @Property({ apiProperty: { description: '아티스트 음악가', type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  constructor(props: ArtistDTOProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.updateDescription = props.updateDescription;
    this.status = props.status;
    this.serviceId = props.serviceId;
    this.images = props.images.map((image) => new ArtistImageDTO(image));
    this.saleTypes = props.saleTypes.map((saleType) => new ArtistSaleTypeDTO(saleType));
    this.licenses = props.licenses.map((license) => new ArtistLicenseDTO(license));
    this.contacts = props.contacts.map((contact) => new ArtistContactDTO(contact));
    this.musician = new CommonMusicianDTO(props.musician);
  }

  static fromArtist(data: FindArtist): ArtistDTO {
    return new ArtistDTO({
      id: data.id,
      name: data.name,
      description: data.description,
      updateDescription: data.updateDescription,
      status: getServiceStatus(data),
      images: data.images,
      saleTypes: data.saleTypes.map(ArtistSaleTypeDTO.fromFindArtistSaleType),
      licenses: data.licenses.map(ArtistLicenseDTO.fromFindArtistLicense),
      contacts: data.contacts.map(ArtistContactDTO.fromFindArtistContact),
      musician: data.musicianService.musician,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      serviceId: data.musicianServiceId,
    });
  }
}
