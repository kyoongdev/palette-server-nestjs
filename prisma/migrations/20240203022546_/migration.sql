-- DropForeignKey
ALTER TABLE `RecordingRegion` DROP FOREIGN KEY `RecordingRegion_regionLargeGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `RecordingRegion` DROP FOREIGN KEY `RecordingRegion_regionSmallGroupId_fkey`;

-- AddForeignKey
ALTER TABLE `RecordingRegion` ADD CONSTRAINT `RecordingRegion_regionLargeGroupId_fkey` FOREIGN KEY (`regionLargeGroupId`) REFERENCES `RegionLargeGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingRegion` ADD CONSTRAINT `RecordingRegion_regionSmallGroupId_fkey` FOREIGN KEY (`regionSmallGroupId`) REFERENCES `RegionSmallGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
