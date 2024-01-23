/*
  Warnings:

  - You are about to drop the column `genreId` on the `MrBeat` table. All the data in the column will be lost.
  - You are about to drop the column `moodId` on the `MrBeat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `MrBeat` DROP FOREIGN KEY `MrBeat_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `MrBeat` DROP FOREIGN KEY `MrBeat_moodId_fkey`;

-- AlterTable
ALTER TABLE `MrBeat` DROP COLUMN `genreId`,
    DROP COLUMN `moodId`;

-- CreateTable
CREATE TABLE `MrBeatGenre` (
    `mrBeatId` VARCHAR(191) NOT NULL,
    `genreId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mrBeatId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MrBeatMood` (
    `mrBeatId` VARCHAR(191) NOT NULL,
    `moodId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mrBeatId`, `moodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MrBeatGenre` ADD CONSTRAINT `MrBeatGenre_mrBeatId_fkey` FOREIGN KEY (`mrBeatId`) REFERENCES `MrBeat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatGenre` ADD CONSTRAINT `MrBeatGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatMood` ADD CONSTRAINT `MrBeatMood_mrBeatId_fkey` FOREIGN KEY (`mrBeatId`) REFERENCES `MrBeat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatMood` ADD CONSTRAINT `MrBeatMood_moodId_fkey` FOREIGN KEY (`moodId`) REFERENCES `Mood`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
