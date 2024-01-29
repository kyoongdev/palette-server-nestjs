import { Injectable } from '@nestjs/common';

import { LicenseDTO } from './dto';
import { LicenseRepository } from './license.repository';

@Injectable()
export class LicenseService {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async findLicenses() {
    const licenses = await this.licenseRepository.findLicenses();
    return licenses.map((license) => new LicenseDTO(license));
  }
}
