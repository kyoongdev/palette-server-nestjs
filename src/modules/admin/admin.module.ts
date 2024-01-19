import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminAuthModule } from './auth/auth.module';
import { AdminMusicianModule } from './musician/musician.module';

export const AdminModules = [AdminAuthModule, AdminMusicianModule];

@Module({
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
  imports: AdminModules,
})
export class AdminModule {}
