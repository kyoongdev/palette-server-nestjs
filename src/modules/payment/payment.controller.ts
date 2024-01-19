import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BankCodeDTO } from '@/modules/payment/dto';
import { BANK_CODE } from '@/utils/constants';
import { ResponseApi } from '@/utils/swagger';

import { PaymentService } from './payment.service';

@ApiTags('결제')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/bank-code')
  @ApiOperation({
    summary: '은행 코드 조회하기 API',
    description: '은행 코드 조회하기',
  })
  @ResponseApi({
    type: BankCodeDTO,
    isArray: true,
  })
  async getBankCode() {
    return Object.entries(BANK_CODE).map(([key, value]) => {
      return new BankCodeDTO({
        code: key,
        name: value,
      });
    });
  }
}
