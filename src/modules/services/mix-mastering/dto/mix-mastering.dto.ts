import { FindMixMastering } from '@/interface/mix-mastering';
import { SERVICE_STATUS, ServiceStatus } from '@/interface/service.interface';
import { ImageDTO, ImageDTOProps, MusicDTO, MusicDTOProps } from '@/modules/file/dto';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { DateDTO, DateDTOProps } from '@/utils';
import { getServiceStatus } from '@/utils/service';
import { Property } from '@/utils/swagger';

import { MixMasteringContactDTO, MixMasteringContactDTOProps } from './mix-mastering-contact.dto';
import { MixMasteringLicenseDTO, MixMasteringLicenseDTOProps } from './mix-mastering-license.dto';

export interface MixMasteringDTOProps extends DateDTOProps {
  id: string;
  name: string;
  description: string;
  updateDescription: string;
  status: ServiceStatus;
  thumbnail: ImageDTOProps;
  beforeMusic: MusicDTOProps;
  afterMusic: MusicDTOProps;
  genreName: string;
  serviceId: string;
  licenses: MixMasteringLicenseDTOProps[];
  contacts: MixMasteringContactDTOProps[];
  musician: CommonMusicianDTOProps;
}

export class MixMasteringDTO extends DateDTO {
  @Property({ apiProperty: { description: '아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '업데이트 설명', type: 'string' } })
  updateDescription: string;

  @Property({ apiProperty: { description: '썸네일', type: ImageDTO } })
  thumbnail: ImageDTO;

  @Property({ apiProperty: { description: '작업전 음악', type: MusicDTO } })
  beforeMusic: MusicDTO;

  @Property({ apiProperty: { description: '작업후 음악', type: MusicDTO } })
  afterMusic: MusicDTO;

  @Property({ apiProperty: { description: '장르 이름', type: 'string' } })
  genreName: string;

  @Property({ apiProperty: { description: '서비스 id', type: 'string' } })
  serviceId: string;

  @Property({ apiProperty: { description: '라이센스', type: MixMasteringLicenseDTO, isArray: true } })
  licenses: MixMasteringLicenseDTO[];

  @Property({ apiProperty: { description: '연락처', type: MixMasteringContactDTO, isArray: true } })
  contacts: MixMasteringContactDTO[];

  @Property({ apiProperty: { description: '뮤지션', type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  @Property({ apiProperty: { description: '상태', type: 'string', enum: Object.values(SERVICE_STATUS) } })
  status: ServiceStatus;

  constructor(props: MixMasteringDTOProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.updateDescription = props.updateDescription;
    this.status = props.status;
    this.thumbnail = new ImageDTO(props.thumbnail);
    this.beforeMusic = new MusicDTO(props.beforeMusic);
    this.afterMusic = new MusicDTO(props.afterMusic);
    this.genreName = props.genreName;
    this.serviceId = props.serviceId;
    this.licenses = props.licenses.map((license) => new MixMasteringLicenseDTO(license));
    this.contacts = props.contacts.map((contact) => new MixMasteringContactDTO(contact));
    this.musician = new CommonMusicianDTO(props.musician);
  }

  static fromFindMixMastering(data: FindMixMastering) {
    return new MixMasteringDTO({
      id: data.id,
      name: data.name,
      description: data.description,
      updateDescription: data.updateDescription,
      status: getServiceStatus(data),
      thumbnail: data.thumbnail,
      beforeMusic: data.musics.find((music) => music.isBefore).music,
      afterMusic: data.musics.find((music) => music.isAfter).music,
      genreName: data.genres.at(-1).genre.name,
      licenses: data.licenses.map((license) => MixMasteringLicenseDTO.fromFindMixMasteringLicense(license)),
      contacts: data.contacts.map((contact) => MixMasteringContactDTO.fromFindMixMasteringContact(contact)),
      musician: data.musicianService.musician,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      serviceId: data.musicianServiceId,
    });
  }
}
