import { Module } from '@nestjs/common';

import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';

import { AdminSaleTypeController } from './sale-type.controller';
import { AdminSaleTypeService } from './sale-type.service';

@Module({
  providers: [SaleTypeRepository, AdminSaleTypeService],
  controllers: [AdminSaleTypeController],
})
export class AdminSaleTypeModule {}
