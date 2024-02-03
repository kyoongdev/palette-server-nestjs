import { ImageDTO, ImageDTOProps } from '@/modules/file/dto';
import { Property } from '@/utils/swagger';

export interface AlbumArtImageDTOProps {
  imageId: string;
  isThumbnail: boolean;
  image: ImageDTOProps;
}

export class AlbumArtImageDTO {
  @Property({ apiProperty: { description: '이미지 아이디', type: 'string' } })
  imageId: string;

  @Property({ apiProperty: { description: '썸네일 여부', type: 'boolean' } })
  isThumbnail: boolean;

  @Property({ apiProperty: { description: '이미지', type: ImageDTO } })
  image: ImageDTO;

  constructor(props: AlbumArtImageDTOProps) {
    this.imageId = props.imageId;
    this.isThumbnail = props.isThumbnail;
    this.image = new ImageDTO(props.image);
  }
}
