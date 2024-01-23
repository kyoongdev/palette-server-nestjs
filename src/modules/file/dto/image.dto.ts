import { ConfigService } from '@nestjs/config';

import { Property } from '@/utils/swagger';

export interface ImageDTOProps {
  id: string;
  originalName: string;
  extension: string;
  url: string;
}

export class ImageDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  originalName: string;

  @Property({ apiProperty: { type: 'string' } })
  extension: string;

  @Property({ apiProperty: { type: 'string' } })
  url: string;

  constructor(props: ImageDTOProps) {
    this.id = props.id;
    this.url = props.url;
  }

  static parseS3ImageKey(url: string) {
    const configService = new ConfigService();
    const key = url.split(`${configService.get('AWS_CLOUD_FRONT_URL')}`).at(-1);

    return `${configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}${key}`;
  }

  static parseS3ImageURL(key: string) {
    const configService = new ConfigService();
    const file = key.split('/').at(-1);

    return `${configService.get('AWS_CLOUD_FRONT_URL')}/${file}`;
  }
}
