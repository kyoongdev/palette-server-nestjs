-- DropForeignKey
ALTER TABLE `ArtistContact` DROP FOREIGN KEY `ArtistContact_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `ArtistContact` DROP FOREIGN KEY `ArtistContact_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `ArtistImage` DROP FOREIGN KEY `ArtistImage_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `ArtistImage` DROP FOREIGN KEY `ArtistImage_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `ArtistLicense` DROP FOREIGN KEY `ArtistLicense_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `ArtistLicense` DROP FOREIGN KEY `ArtistLicense_licenseId_fkey`;

-- DropForeignKey
ALTER TABLE `ArtistSaleTypeBridge` DROP FOREIGN KEY `ArtistSaleTypeBridge_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `ArtistSaleTypeBridge` DROP FOREIGN KEY `ArtistSaleTypeBridge_saleTypeId_fkey`;

-- AddForeignKey
ALTER TABLE `ArtistLicense` ADD CONSTRAINT `ArtistLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistLicense` ADD CONSTRAINT `ArtistLicense_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistContact` ADD CONSTRAINT `ArtistContact_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistContact` ADD CONSTRAINT `ArtistContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistSaleTypeBridge` ADD CONSTRAINT `ArtistSaleTypeBridge_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistSaleTypeBridge` ADD CONSTRAINT `ArtistSaleTypeBridge_saleTypeId_fkey` FOREIGN KEY (`saleTypeId`) REFERENCES `ArtistSaleType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistImage` ADD CONSTRAINT `ArtistImage_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistImage` ADD CONSTRAINT `ArtistImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
