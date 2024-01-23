import { ConfigService } from '@nestjs/config';

import { Property } from '@/utils/swagger';

export interface MusicDTOProps {
  id: string;
  originalName: string;
  extension: string;
  url: string;
  duration: number;
}

export class MusicDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  originalName: string;

  @Property({ apiProperty: { type: 'string' } })
  extension: string;

  @Property({ apiProperty: { type: 'number' } })
  duration: number;

  @Property({ apiProperty: { type: 'string' } })
  url: string;

  constructor(props: MusicDTOProps) {
    this.id = props.id;
    this.url = props.url;
  }

  static parseS3MusicKey(url: string) {
    const configService = new ConfigService();
    const key = url.split(`${configService.get('AWS_CLOUD_FRONT_URL')}`).at(-1);

    return `${configService.get('NODE_ENV') === 'prod' ? 'prod' : 'dev'}${key}`;
  }

  static parseS3MusicURL(key: string) {
    const configService = new ConfigService();
    const file = key.split('/').at(-1);

    return `${configService.get('AWS_CLOUD_FRONT_URL')}/${file}`;
  }
}
