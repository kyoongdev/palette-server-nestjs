import { Property } from '../swagger';

export class ResponseWithIdDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  constructor(id?: string) {
    this.id = id;
  }
}
