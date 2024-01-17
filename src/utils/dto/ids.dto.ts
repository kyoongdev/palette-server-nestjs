import { Property } from '../swagger';

export interface IdsDTOProps {
  ids: string;
}

export class IdsDTO {
  @Property({ apiProperty: { type: 'string', description: '아이디들', example: '1,2,3' } })
  ids: string;

  constructor(props?: IdsDTOProps) {
    if (props) {
      this.ids = props.ids;
    }
  }
}
