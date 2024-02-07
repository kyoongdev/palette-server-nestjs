import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminAnnouncementModule } from './announcement/announcement.module';
import { AdminAuthModule } from './auth/auth.module';
import { AdminInquiryModule } from './inquiry/inquiry.module';
import { AdminMusicianModule } from './musician/musician.module';
import { AdminServiceModule } from './service/service.module';
import { AdminUserModule } from './user/user.module';

export const AdminModules = [
  AdminAuthModule,
  AdminMusicianModule,
  AdminServiceModule,
  AdminUserModule,
  AdminAnnouncementModule,
  AdminInquiryModule,
];

@Module({
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
  imports: AdminModules,
})
export class AdminModule {}
