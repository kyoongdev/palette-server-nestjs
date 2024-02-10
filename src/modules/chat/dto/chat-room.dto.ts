import { CommonUserDTOProps } from '@/modules/user/dto';

export interface ChatRoomDTOProps {
  id: string;
  opponent: CommonUserDTOProps;

  createdAt: Date;
}
