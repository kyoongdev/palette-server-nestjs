import { Module } from '@nestjs/common';

import { AOPModule } from '@/utils/aop/aop.module';
import { CompodocModule } from '@/utils/compodoc/compodoc.module';

import { AnnouncementModule } from './announcement/announcement.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ContactModule } from './contact/contact.module';
import { FileModule } from './file/file.module';
import { GenreModule } from './genre/genre.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { LicenseModule } from './license/license.module';
import { MoodModule } from './mood/mood.module';
import { PaymentModule } from './payment/payment.module';
import { RegionModule } from './region/region.module';
import { SaleTypeModule } from './sale-type/sale-type.module';
import { UserModule } from './user/user.module';

export const Modules = [
  FileModule,
  PaymentModule,
  MoodModule,
  GenreModule,
  RegionModule,
  AuthModule,
  UserModule,
  LicenseModule,
  ContactModule,
  SaleTypeModule,
  AnnouncementModule,
  InquiryModule,
  ChatModule,
  AOPModule,
  CompodocModule,
];

@Module({
  imports: Modules,
})
export class V2Module {}
