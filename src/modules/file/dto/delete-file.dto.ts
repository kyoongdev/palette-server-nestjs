import { Property } from '@/utils/swagger';

export class DeleteFileDTO {
  @Property({ apiProperty: { type: 'string' } })
  url: string;
}
