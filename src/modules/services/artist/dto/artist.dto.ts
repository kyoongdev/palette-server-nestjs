import { FindArtist } from '@/interface/artist.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { DateDTOProps } from '@/utils';
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
  isPending: boolean;
  isAuthorized: boolean;
  images: ArtistImageDTOProps[];
  saleTypes: ArtistSaleTypeDTOProps[];
  licenses: ArtistLicenseDTOProps[];
  contacts: ArtistContactDTOProps[];
  musician: CommonMusicianDTOProps;
}

export class ArtistDTO {
  @Property({ apiProperty: { description: '아티스트 아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '아티스트 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '아티스트 설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '아티스트 업데이트 설명', type: 'string' } })
  updateDescription: string;

  @Property({ apiProperty: { description: '아티스트 승인 여부', type: 'boolean' } })
  isAuthorized: boolean;

  @Property({ apiProperty: { description: '아티스트 대기 여부', type: 'boolean' } })
  isPending: boolean;

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
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.updateDescription = props.updateDescription;
    this.isAuthorized = props.isAuthorized;
    this.isPending = props.isPending;
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
      isAuthorized: data.isAuthorized,
      isPending: data.isPending,
      images: data.images,
      saleTypes: data.saleTypes.map(ArtistSaleTypeDTO.fromFindArtistSaleType),
      licenses: data.licenses.map(ArtistLicenseDTO.fromFindArtistLicense),
      contacts: data.contacts.map(ArtistContactDTO.fromFindArtistContact),
      musician: data.musicianService.musician,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    });
  }
}
