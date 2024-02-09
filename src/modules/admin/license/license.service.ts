import { Injectable } from '@nestjs/common';

import { LicenseRepository } from '@/modules/license/license.repository';

@Injectable()
export class AdminLicenseService {
  constructor(private readonly licenseRepository: LicenseRepository) {}
}
