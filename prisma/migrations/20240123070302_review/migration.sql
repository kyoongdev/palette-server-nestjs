/*
  Warnings:

  - Added the required column `serviceId` to the `ServiceReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ServiceReview` ADD COLUMN `serviceId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ServiceReview` ADD CONSTRAINT `ServiceReview_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `MusicianService`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
