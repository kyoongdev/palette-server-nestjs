/*
  Warnings:

  - You are about to alter the column `cost` on the `AlbumArtLicense` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `UnsignedMediumInt`.
  - You are about to alter the column `cost` on the `ArtistLicense` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `UnsignedMediumInt`.
  - You are about to alter the column `cost` on the `MixMasteringLicense` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `UnsignedMediumInt`.
  - You are about to alter the column `cost` on the `MrBeatLicense` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `UnsignedMediumInt`.
  - You are about to alter the column `cost` on the `RecordingLicense` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `UnsignedMediumInt`.

*/
-- AlterTable
ALTER TABLE `AlbumArtLicense` MODIFY `cost` MEDIUMINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `ArtistLicense` MODIFY `cost` MEDIUMINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `MixMasteringLicense` MODIFY `cost` MEDIUMINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `MrBeatLicense` MODIFY `cost` MEDIUMINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `RecordingLicense` MODIFY `cost` MEDIUMINT UNSIGNED NOT NULL;
