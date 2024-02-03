-- DropForeignKey
ALTER TABLE `MixMasteringGenre` DROP FOREIGN KEY `MixMasteringGenre_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `MixMasteringGenre` DROP FOREIGN KEY `MixMasteringGenre_mixMasteringId_fkey`;

-- AddForeignKey
ALTER TABLE `MixMasteringGenre` ADD CONSTRAINT `MixMasteringGenre_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringGenre` ADD CONSTRAINT `MixMasteringGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
