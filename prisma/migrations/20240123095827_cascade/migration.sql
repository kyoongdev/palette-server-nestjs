-- DropForeignKey
ALTER TABLE `MrBeatContact` DROP FOREIGN KEY `MrBeatContact_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `MrBeatContact` DROP FOREIGN KEY `MrBeatContact_mrBeatId_fkey`;

-- DropForeignKey
ALTER TABLE `MrBeatLicense` DROP FOREIGN KEY `MrBeatLicense_licenseId_fkey`;

-- DropForeignKey
ALTER TABLE `MrBeatLicense` DROP FOREIGN KEY `MrBeatLicense_mrBeatId_fkey`;

-- AddForeignKey
ALTER TABLE `MrBeatContact` ADD CONSTRAINT `MrBeatContact_mrBeatId_fkey` FOREIGN KEY (`mrBeatId`) REFERENCES `MrBeat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatContact` ADD CONSTRAINT `MrBeatContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatLicense` ADD CONSTRAINT `MrBeatLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatLicense` ADD CONSTRAINT `MrBeatLicense_mrBeatId_fkey` FOREIGN KEY (`mrBeatId`) REFERENCES `MrBeat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
