import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';

export const AdminModules = [];

@Module({
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
  imports: AdminModules,
})
export class AdminModule {}
