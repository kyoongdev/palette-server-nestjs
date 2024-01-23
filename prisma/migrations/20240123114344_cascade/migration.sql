-- DropForeignKey
ALTER TABLE `MrBeatLicenseProvidedFile` DROP FOREIGN KEY `MrBeatLicenseProvidedFile_mrBeatLicenseId_fkey`;

-- AddForeignKey
ALTER TABLE `MrBeatLicenseProvidedFile` ADD CONSTRAINT `MrBeatLicenseProvidedFile_mrBeatLicenseId_fkey` FOREIGN KEY (`mrBeatLicenseId`) REFERENCES `MrBeatLicense`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
