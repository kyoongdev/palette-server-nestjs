/*
  Warnings:

  - You are about to drop the column `isBackgrounMusicAllowed` on the `MrBeatLicense` table. All the data in the column will be lost.
  - Added the required column `isBackgroundMusicAllowed` to the `MrBeatLicense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MrBeatLicense` DROP COLUMN `isBackgrounMusicAllowed`,
    ADD COLUMN `isBackgroundMusicAllowed` BOOLEAN NOT NULL;
