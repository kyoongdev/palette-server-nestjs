-- DropForeignKey
ALTER TABLE `AlbumArtContact` DROP FOREIGN KEY `AlbumArtContact_albumArtId_fkey`;

-- DropForeignKey
ALTER TABLE `AlbumArtContact` DROP FOREIGN KEY `AlbumArtContact_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `AlbumArtImage` DROP FOREIGN KEY `AlbumArtImage_albumArtId_fkey`;

-- DropForeignKey
ALTER TABLE `AlbumArtImage` DROP FOREIGN KEY `AlbumArtImage_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `AlbumArtLicense` DROP FOREIGN KEY `AlbumArtLicense_albumArtId_fkey`;

-- DropForeignKey
ALTER TABLE `AlbumArtLicense` DROP FOREIGN KEY `AlbumArtLicense_licenseId_fkey`;

-- DropForeignKey
ALTER TABLE `AlbumArtSaleTypeBridge` DROP FOREIGN KEY `AlbumArtSaleTypeBridge_albumArtId_fkey`;

-- DropForeignKey
ALTER TABLE `AlbumArtSaleTypeBridge` DROP FOREIGN KEY `AlbumArtSaleTypeBridge_saleTypeId_fkey`;

-- AddForeignKey
ALTER TABLE `AlbumArtLicense` ADD CONSTRAINT `AlbumArtLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtLicense` ADD CONSTRAINT `AlbumArtLicense_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtContact` ADD CONSTRAINT `AlbumArtContact_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtContact` ADD CONSTRAINT `AlbumArtContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtImage` ADD CONSTRAINT `AlbumArtImage_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtImage` ADD CONSTRAINT `AlbumArtImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtSaleTypeBridge` ADD CONSTRAINT `AlbumArtSaleTypeBridge_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtSaleTypeBridge` ADD CONSTRAINT `AlbumArtSaleTypeBridge_saleTypeId_fkey` FOREIGN KEY (`saleTypeId`) REFERENCES `AlbumArtSaleType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
