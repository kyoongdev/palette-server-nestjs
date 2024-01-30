-- DropForeignKey
ALTER TABLE `ArtistLicenseProvidedFile` DROP FOREIGN KEY `ArtistLicenseProvidedFile_artistLicenseId_fkey`;

-- AddForeignKey
ALTER TABLE `ArtistLicenseProvidedFile` ADD CONSTRAINT `ArtistLicenseProvidedFile_artistLicenseId_fkey` FOREIGN KEY (`artistLicenseId`) REFERENCES `ArtistLicense`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
