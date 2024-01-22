/*
  Warnings:

  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `profileImage`,
    ADD COLUMN `profileImageId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileImageId_fkey` FOREIGN KEY (`profileImageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
