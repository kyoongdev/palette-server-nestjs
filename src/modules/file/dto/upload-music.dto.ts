import { Property } from '@/utils/swagger';

export class UploadMusicDTO {
  @Property({ apiProperty: { type: 'number' } })
  duration: number;
}
