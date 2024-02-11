import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { RequestUser } from '@/interface/token.interface';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { ChatService } from './chat.service';
import { ChatMessageDTO, ChatRoomDTO } from './dto';

@ApiTags('채팅 (소켓X)')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms')
  @ApiQuery({
    type: PagingDTO,
  })
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @ApiOperation({ summary: '나의 채팅방 목록 조회 API', description: '나의 채팅방 목록을 조회합니다.' })
  @ResponseApi({
    type: ChatRoomDTO,
    isPaging: true,
  })
  async findChatRooms(@ReqUser() user: RequestUser, @Paging() paging: PagingDTO) {
    return await this.chatService.findChatRooms(user.id, paging);
  }

  @Get('rooms/:roomId/messages')
  @ApiQuery({
    type: PagingDTO,
  })
  @Auth([JwtAuthGuard, RoleGuard('USER')])
  @ApiOperation({ summary: '나의 채팅방 채팅 목록 조회 API', description: '나의 채팅방 채팅 목록을 조회합니다.' })
  @ResponseApi({
    type: ChatMessageDTO,
    isPaging: true,
  })
  async findChatRoomMessages(@ReqUser() user: RequestUser, @Param('roomId') roomId, @Paging() paging: PagingDTO) {
    return await this.chatService.findChatMessages(roomId, user.id, paging);
  }
}
