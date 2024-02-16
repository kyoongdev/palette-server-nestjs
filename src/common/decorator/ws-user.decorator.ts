import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ReqUserType } from '@/interface/token.interface';

export const WsReqUser = createParamDecorator(
  async <T extends ReqUserType>(data: any, ctx: ExecutionContext): Promise<T> => {
    const request = await ctx.switchToWs().getClient();

    return request.user as T;
  }
);
