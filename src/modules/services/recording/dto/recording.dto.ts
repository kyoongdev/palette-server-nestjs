import { FindRecording, FindRecordingList } from '@/interface/recording.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { DateDTO, DateDTOProps } from '@/utils';
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
  isPending: boolean;
  isAuthorized: boolean;
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

  @Property({ apiProperty: { description: '승인 대기 여부', type: 'boolean' } })
  isPending: boolean;

  @Property({ apiProperty: { description: '승인 여부', type: 'boolean' } })
  isAuthorized: boolean;

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
    this.isPending = props.isPending;
    this.isAuthorized = props.isAuthorized;
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
      isPending: data.isPending,
      isAuthorized: data.isAuthorized,
      images: data.images.map((image) => new RecordingImageDTO(image)),
      region: RecordingRegionDTO.fromFindRecordingRegion(data.recordingRegion),
      licenses: data.recordingLicense.map((license) => RecordingLicenseDTO.fromFindRecordingLicense(license)),
      musician: data.musicianService.musician,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    });
  }
}
