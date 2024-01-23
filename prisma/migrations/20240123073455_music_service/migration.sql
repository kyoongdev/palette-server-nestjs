/*
  Warnings:

  - You are about to drop the column `albumArtId` on the `MusicianService` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `MusicianService` table. All the data in the column will be lost.
  - You are about to drop the column `mixMasteringId` on the `MusicianService` table. All the data in the column will be lost.
  - You are about to drop the column `mrBeatId` on the `MusicianService` table. All the data in the column will be lost.
  - You are about to drop the column `recordingId` on the `MusicianService` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[musicianServiceId]` on the table `AlbumArt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[musicianServiceId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[musicianServiceId]` on the table `MixMastering` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[musicianServiceId]` on the table `MrBeat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[musicianServiceId]` on the table `Recording` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `musicianServiceId` to the `AlbumArt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicianServiceId` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicianServiceId` to the `MixMastering` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicianServiceId` to the `MrBeat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicianServiceId` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MusicianService` DROP FOREIGN KEY `MusicianService_albumArtId_fkey`;

-- DropForeignKey
ALTER TABLE `MusicianService` DROP FOREIGN KEY `MusicianService_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `MusicianService` DROP FOREIGN KEY `MusicianService_mixMasteringId_fkey`;

-- DropForeignKey
ALTER TABLE `MusicianService` DROP FOREIGN KEY `MusicianService_mrBeatId_fkey`;

-- DropForeignKey
ALTER TABLE `MusicianService` DROP FOREIGN KEY `MusicianService_recordingId_fkey`;

-- AlterTable
ALTER TABLE `AlbumArt` ADD COLUMN `musicianServiceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Artist` ADD COLUMN `musicianServiceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MixMastering` ADD COLUMN `musicianServiceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MrBeat` ADD COLUMN `musicianServiceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MusicianService` DROP COLUMN `albumArtId`,
    DROP COLUMN `artistId`,
    DROP COLUMN `mixMasteringId`,
    DROP COLUMN `mrBeatId`,
    DROP COLUMN `recordingId`;

-- AlterTable
ALTER TABLE `Recording` ADD COLUMN `musicianServiceId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AlbumArt_musicianServiceId_key` ON `AlbumArt`(`musicianServiceId`);

-- CreateIndex
CREATE UNIQUE INDEX `Artist_musicianServiceId_key` ON `Artist`(`musicianServiceId`);

-- CreateIndex
CREATE UNIQUE INDEX `MixMastering_musicianServiceId_key` ON `MixMastering`(`musicianServiceId`);

-- CreateIndex
CREATE UNIQUE INDEX `MrBeat_musicianServiceId_key` ON `MrBeat`(`musicianServiceId`);

-- CreateIndex
CREATE UNIQUE INDEX `Recording_musicianServiceId_key` ON `Recording`(`musicianServiceId`);

-- AddForeignKey
ALTER TABLE `MrBeat` ADD CONSTRAINT `MrBeat_musicianServiceId_fkey` FOREIGN KEY (`musicianServiceId`) REFERENCES `MusicianService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_musicianServiceId_fkey` FOREIGN KEY (`musicianServiceId`) REFERENCES `MusicianService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recording` ADD CONSTRAINT `Recording_musicianServiceId_fkey` FOREIGN KEY (`musicianServiceId`) REFERENCES `MusicianService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMastering` ADD CONSTRAINT `MixMastering_musicianServiceId_fkey` FOREIGN KEY (`musicianServiceId`) REFERENCES `MusicianService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArt` ADD CONSTRAINT `AlbumArt_musicianServiceId_fkey` FOREIGN KEY (`musicianServiceId`) REFERENCES `MusicianService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
