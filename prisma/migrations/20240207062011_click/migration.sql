-- CreateTable
CREATE TABLE `MuscianServiceClicked` (
    `userId` VARCHAR(191) NOT NULL,
    `musicianServiceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `musicianServiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MuscianServiceClicked` ADD CONSTRAINT `MuscianServiceClicked_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MuscianServiceClicked` ADD CONSTRAINT `MuscianServiceClicked_musicianServiceId_fkey` FOREIGN KEY (`musicianServiceId`) REFERENCES `MusicianService`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
