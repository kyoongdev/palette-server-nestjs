import { Injectable } from '@nestjs/common';

import { CreateLicenseDTO } from '@/modules/license/dto/create-license.dto';
import { UpdateLicenseDTO } from '@/modules/license/dto/update-license.dto';
import { LicenseRepository } from '@/modules/license/license.repository';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminLicenseDTO } from './dto';

@Injectable()
export class AdminLicenseService {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async findLicense(id: string) {
    const license = await this.licenseRepository.findLicense(id);
    return new AdminLicenseDTO(license);
  }

  async findLicenses(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.licenseRepository.countLicense();
    const licenses = await this.licenseRepository.findLicenses({
      orderBy: {
        order: 'asc',
      },
      skip,
      take,
    });

    return new PaginationDTO(
      licenses.map((license) => new AdminLicenseDTO(license)),
      { paging, count }
    );
  }

  @Transactional()
  async createLicense(data: CreateLicenseDTO) {
    const license = await this.licenseRepository.createLicense(data);
    return license.id;
  }

  @Transactional()
  async updateLicense(id: string, data: UpdateLicenseDTO) {
    await this.licenseRepository.findLicense(id);
    await this.licenseRepository.updateLicense(id, data);
  }

  @Transactional()
  async deleteLicense(id: string) {
    await this.licenseRepository.findLicense(id);
    await this.licenseRepository.deleteLicense(id);
  }
}
