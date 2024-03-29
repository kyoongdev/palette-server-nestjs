import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminAnnouncementModule } from './announcement/announcement.module';
import { AdminAuthModule } from './auth/auth.module';
import { AdminContactModule } from './contact/contact.module';
import { AdminGenreModule } from './genre/genre.module';
import { AdminInquiryModule } from './inquiry/inquiry.module';
import { AdminLicenseModule } from './license/license.module';
import { AdminMoodModule } from './mood/mood.module';
import { AdminMusicianModule } from './musician/musician.module';
import { AdminRegionModule } from './region/region.module';
import { AdminSaleTypeModule } from './sale-type/sale-type.module';
import { AdminServiceModule } from './service/service.module';
import { AdminUserModule } from './user/user.module';

export const AdminModules = [
  AdminAuthModule,
  AdminMusicianModule,
  AdminServiceModule,
  AdminUserModule,
  AdminAnnouncementModule,
  AdminInquiryModule,
  AdminGenreModule,
  AdminContactModule,
  AdminLicenseModule,
  AdminMoodModule,
  AdminRegionModule,
  AdminSaleTypeModule,
];

@Module({
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
  imports: AdminModules,
})
export class AdminModule {}
