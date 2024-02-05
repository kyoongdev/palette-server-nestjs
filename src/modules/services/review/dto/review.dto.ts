import { CommonUserDTOProps } from '@/modules/user/dto';

export interface ReviewDTOProps {
  id: string;
  content: string;
  score: number;
  user: CommonUserDTOProps;
}
