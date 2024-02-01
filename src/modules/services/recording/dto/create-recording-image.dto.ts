import { Property } from '@/utils/swagger';

export interface CreateRecordingImageDTOProps {
  isThumbnail: boolean;
  imageId: string;
}

export class CreateRecordingImageDTO {
  @Property({ apiProperty: { description: '썸네일 여부', type: 'boolean' } })
  isThumbnail: boolean;

  @Property({ apiProperty: { description: '이미지 아이디', type: 'string' } })
  imageId: string;

  constructor(props?: CreateRecordingImageDTOProps) {
    if (props) {
      this.isThumbnail = props.isThumbnail;
      this.imageId = props.imageId;
    }
  }
}
