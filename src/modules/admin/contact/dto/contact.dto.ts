import { ContactDTO, ContactDTOProps } from '@/modules/contact/dto';
import { Property } from '@/utils/swagger';

export interface AdminContactDTOProps extends ContactDTOProps {
  order: number;
}

export class AdminContactDTO extends ContactDTO {
  @Property({ apiProperty: { type: 'number', description: '연락처 순서' } })
  order: number;

  constructor(props: AdminContactDTOProps) {
    super(props);
    this.order = props.order;
  }
}
