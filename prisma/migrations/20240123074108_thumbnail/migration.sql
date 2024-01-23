/*
  Warnings:

  - You are about to drop the column `thumbmailId` on the `MrBeat` table. All the data in the column will be lost.
  - Added the required column `thumbnailId` to the `MrBeat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MrBeat` DROP FOREIGN KEY `MrBeat_thumbmailId_fkey`;

-- AlterTable
ALTER TABLE `MrBeat` DROP COLUMN `thumbmailId`,
    ADD COLUMN `thumbnailId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `MrBeat` ADD CONSTRAINT `MrBeat_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
