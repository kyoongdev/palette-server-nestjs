-- DropForeignKey
ALTER TABLE `MusicianService` DROP FOREIGN KEY `MusicianService_musicianId_fkey`;

-- AddForeignKey
ALTER TABLE `MusicianService` ADD CONSTRAINT `MusicianService_musicianId_fkey` FOREIGN KEY (`musicianId`) REFERENCES `Musician`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
