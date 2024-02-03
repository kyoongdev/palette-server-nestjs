import { Property } from '@/utils/swagger';

export interface CreateAlbumArtImageDTOProps {
  imageId: string;
  isThumbnail: boolean;
}

export class CreateAlbumArtImageDTO {
  @Property({ apiProperty: { description: '이미지 아이디', type: 'string' } })
  imageId: string;

  @Property({ apiProperty: { description: '썸네일 여부', type: 'boolean' } })
  isThumbnail: boolean;

  constructor(props?: CreateAlbumArtImageDTOProps) {
    if (props) {
      this.imageId = props.imageId;
      this.isThumbnail = props.isThumbnail;
    }
  }
}
