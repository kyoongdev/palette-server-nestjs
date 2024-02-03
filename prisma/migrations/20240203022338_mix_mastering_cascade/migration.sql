-- DropForeignKey
ALTER TABLE `MixMasteringContact` DROP FOREIGN KEY `MixMasteringContact_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `MixMasteringContact` DROP FOREIGN KEY `MixMasteringContact_mixMasteringId_fkey`;

-- DropForeignKey
ALTER TABLE `MixMasteringLicense` DROP FOREIGN KEY `MixMasteringLicense_licenseId_fkey`;

-- DropForeignKey
ALTER TABLE `MixMasteringLicense` DROP FOREIGN KEY `MixMasteringLicense_mixMasteringId_fkey`;

-- DropForeignKey
ALTER TABLE `MixMasteringMusic` DROP FOREIGN KEY `MixMasteringMusic_mixMasteringId_fkey`;

-- DropForeignKey
ALTER TABLE `MixMasteringMusic` DROP FOREIGN KEY `MixMasteringMusic_musicId_fkey`;

-- AddForeignKey
ALTER TABLE `MixMasteringLicense` ADD CONSTRAINT `MixMasteringLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringLicense` ADD CONSTRAINT `MixMasteringLicense_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringContact` ADD CONSTRAINT `MixMasteringContact_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringContact` ADD CONSTRAINT `MixMasteringContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringMusic` ADD CONSTRAINT `MixMasteringMusic_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringMusic` ADD CONSTRAINT `MixMasteringMusic_musicId_fkey` FOREIGN KEY (`musicId`) REFERENCES `Music`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
