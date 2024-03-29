import { FindRecording } from '@/interface/recording.interface';
import { SERVICE_STATUS, ServiceStatus } from '@/interface/service.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { DateDTO, DateDTOProps } from '@/utils';
import { getServiceStatus } from '@/utils/service';
import { Property } from '@/utils/swagger';

import { RecordingImageDTO, RecordingImageDTOProps } from './recording-image.dto';
import { RecordingLicenseDTO, RecordingLicenseDTOProps } from './recording-license.dto';
import { RecordingRegionDTO, RecordingRegionDTOProps } from './recording-region.dto';

export interface RecordingDTOProps extends DateDTOProps {
  id: string;
  name: string;
  studioName: string;
  isEngineerSupported: boolean;
  reservationLink: string;
  description: string;
  status: ServiceStatus;
  serviceId: string;
  images: RecordingImageDTOProps[];
  region: RecordingRegionDTOProps;
  licenses: RecordingLicenseDTOProps[];
  musician: CommonMusicianDTOProps;
}

export class RecordingDTO extends DateDTO {
  @Property({ apiProperty: { description: '레코딩 id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '레코딩 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '스튜디오 이름', type: 'string' } })
  studioName: string;

  @Property({ apiProperty: { description: '엔지니어 지원 여부', type: 'boolean' } })
  isEngineerSupported: boolean;

  @Property({ apiProperty: { description: '예약 링크', type: 'string' } })
  reservationLink: string;

  @Property({ apiProperty: { description: '레코딩 설명', type: 'string' } })
  description: string;

  @Property({ apiProperty: { description: '상태', type: 'string', enum: Object.values(SERVICE_STATUS) } })
  status: ServiceStatus;

  @Property({ apiProperty: { description: '서비스 id', type: 'string' } })
  serviceId: string;

  @Property({ apiProperty: { description: '이미지', type: RecordingImageDTO, isArray: true } })
  images: RecordingImageDTO[];

  @Property({ apiProperty: { description: '지역', type: RecordingRegionDTO } })
  region: RecordingRegionDTO;

  @Property({ apiProperty: { description: '라이센스', type: RecordingLicenseDTO, isArray: true } })
  licenses: RecordingLicenseDTO[];

  @Property({ apiProperty: { description: '뮤지션', type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  constructor(props: RecordingDTOProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.studioName = props.studioName;
    this.isEngineerSupported = props.isEngineerSupported;
    this.reservationLink = props.reservationLink;
    this.description = props.description;
    this.status = props.status;
    this.serviceId = props.serviceId;
    this.images = props.images.map((image) => new RecordingImageDTO(image));
    this.region = new RecordingRegionDTO(props.region);
    this.licenses = props.licenses.map((license) => new RecordingLicenseDTO(license));
    this.musician = new CommonMusicianDTO(props.musician);
  }

  static fromFindRecording(data: FindRecording) {
    return new RecordingDTO({
      id: data.id,
      name: data.name,
      studioName: data.studioName,
      isEngineerSupported: data.isEngineerSupported,
      reservationLink: data.reservationLink,
      description: data.description,
      status: getServiceStatus(data),
      images: data.images.map((image) => new RecordingImageDTO(image)),
      region: RecordingRegionDTO.fromFindRecordingRegion(data.recordingRegion),
      licenses: data.licenses.map((license) => RecordingLicenseDTO.fromFindRecordingLicense(license)),
      musician: data.musicianService.musician,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      serviceId: data.musicianServiceId,
    });
  }
}
