-- AlterTable
ALTER TABLE `AlbumArt` ADD COLUMN `isSaleStopped` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Artist` ADD COLUMN `isSaleStopped` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `MixMastering` ADD COLUMN `isSaleStopped` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `MrBeat` ADD COLUMN `isSaleStopped` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Recording` ADD COLUMN `isSaleStopped` BOOLEAN NOT NULL DEFAULT false;
