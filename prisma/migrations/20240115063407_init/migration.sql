-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `nickname` VARCHAR(255) NULL,
    `profileImage` VARCHAR(255) NULL,
    `phoneNumber` CHAR(11) NULL,
    `isAlarmAccepted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSocial` (
    `id` VARCHAR(191) NOT NULL,
    `socialType` TINYINT NOT NULL,
    `socialId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSocial_socialId_key`(`socialId`),
    UNIQUE INDEX `UserSocial_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Musician` (
    `id` VARCHAR(191) NOT NULL,
    `stageName` VARCHAR(200) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `groupType` TINYINT NOT NULL,
    `introduction` MEDIUMTEXT NULL,
    `isPending` BOOLEAN NOT NULL DEFAULT true,
    `isAuthorized` BOOLEAN NOT NULL DEFAULT false,
    `bankCode` VARCHAR(10) NOT NULL,
    `bankAccount` VARCHAR(30) NOT NULL,
    `bankAccountOwnerName` VARCHAR(20) NOT NULL,
    `evidenceFileUrl` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Musician_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicianService` (
    `id` VARCHAR(191) NOT NULL,
    `musicianId` VARCHAR(191) NOT NULL,
    `mrBeatId` VARCHAR(191) NULL,
    `mixMasteringId` VARCHAR(191) NULL,
    `recordingId` VARCHAR(191) NULL,
    `artistId` VARCHAR(191) NULL,
    `albumArtId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicianPosition` (
    `positionId` VARCHAR(191) NOT NULL,
    `musicianId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`positionId`, `musicianId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicianSns` (
    `snsId` VARCHAR(191) NOT NULL,
    `musicianId` VARCHAR(191) NOT NULL,
    `link` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`snsId`, `musicianId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sns` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MrBeat` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `groupType` TINYINT NOT NULL,
    `thumbmailId` VARCHAR(191) NOT NULL,
    `musicId` VARCHAR(191) NOT NULL,
    `genreId` VARCHAR(191) NOT NULL,
    `moodId` VARCHAR(191) NOT NULL,
    `isPending` BOOLEAN NOT NULL DEFAULT true,
    `isAuthorized` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `MrBeat_genreId_key`(`genreId`),
    UNIQUE INDEX `MrBeat_moodId_key`(`moodId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MrBeatContact` (
    `mrBeatId` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mrBeatId`, `contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MrBeatLicense` (
    `id` VARCHAR(191) NOT NULL,
    `usePeriod` VARCHAR(191) NULL,
    `cost` SMALLINT NOT NULL,
    `isNewSongWithVoiceAllowed` BOOLEAN NOT NULL,
    `isProfitActivityAllowed` BOOLEAN NOT NULL,
    `isPerformanceActivityAllowed` BOOLEAN NOT NULL,
    `isBackgrounMusicAllowed` BOOLEAN NOT NULL,
    `isMVProduceAllowed` BOOLEAN NOT NULL,
    `isShareAllowed` BOOLEAN NOT NULL,
    `isArrangeAllowed` BOOLEAN NOT NULL,
    `licenseId` VARCHAR(191) NOT NULL,
    `mrBeatId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MrBeatLicense_licenseId_mrBeatId_key`(`licenseId`, `mrBeatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MrBeatLicenseProvidedFile` (
    `id` VARCHAR(191) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,
    `mrBeatLicenseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `updateDescription` MEDIUMTEXT NOT NULL,
    `isPending` BOOLEAN NOT NULL DEFAULT true,
    `isAuthorized` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistLicense` (
    `id` VARCHAR(191) NOT NULL,
    `cost` SMALLINT NOT NULL,
    `updateCount` TINYINT NOT NULL,
    `workPeriod` SMALLINT NOT NULL,
    `draftCount` SMALLINT NOT NULL,
    `isCopyRightTransferAllowed` BOOLEAN NOT NULL,
    `isCommercialUseAllowed` BOOLEAN NOT NULL,
    `isOriginFileProvided` BOOLEAN NOT NULL,
    `isApplicationAvailable` BOOLEAN NOT NULL,
    `licenseId` VARCHAR(191) NOT NULL,
    `artistId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ArtistLicense_licenseId_artistId_key`(`licenseId`, `artistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistLicenseProvidedFile` (
    `id` VARCHAR(191) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,
    `artistLicenseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistContact` (
    `artistId` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`artistId`, `contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistSaleTypeBridge` (
    `artistId` VARCHAR(191) NOT NULL,
    `saleTypeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`artistId`, `saleTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistSaleType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistImage` (
    `isThumbnail` BOOLEAN NOT NULL,
    `artistId` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`artistId`, `imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recording` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `studioName` VARCHAR(20) NOT NULL,
    `isEngineerSupported` BOOLEAN NOT NULL,
    `reservationLink` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `isPending` BOOLEAN NOT NULL DEFAULT true,
    `isAuthorized` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `recordingRegionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecordingLicense` (
    `id` VARCHAR(191) NOT NULL,
    `useTime` TINYINT NOT NULL,
    `cost` SMALLINT NOT NULL,
    `recordingId` VARCHAR(191) NOT NULL,
    `licenseId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RecordingLicense_recordingId_licenseId_key`(`recordingId`, `licenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecordingRegion` (
    `id` VARCHAR(191) NOT NULL,
    `regionLargeGroupId` VARCHAR(191) NOT NULL,
    `regionSmallGroupId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecordingImage` (
    `imageId` VARCHAR(191) NOT NULL,
    `recordingId` VARCHAR(191) NOT NULL,
    `isThumbnail` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`imageId`, `recordingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegionLargeGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegionSmallGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `largeGroupId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MixMastering` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `updateDescription` MEDIUMTEXT NOT NULL,
    `isPending` BOOLEAN NOT NULL DEFAULT true,
    `isAuthorized` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `thumbnailId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MixMasteringLicense` (
    `id` VARCHAR(191) NOT NULL,
    `cost` SMALLINT NOT NULL,
    `updateCount` TINYINT NOT NULL,
    `workPeriod` SMALLINT NOT NULL,
    `draftCount` SMALLINT NOT NULL,
    `isCopyRightTransferAllowed` BOOLEAN NOT NULL,
    `isCommercialUseAllowed` BOOLEAN NOT NULL,
    `isOriginFileProvided` BOOLEAN NOT NULL,
    `isApplicationAvailable` BOOLEAN NOT NULL,
    `licenseId` VARCHAR(191) NOT NULL,
    `mixMasteringId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MixMasteringLicense_mixMasteringId_licenseId_key`(`mixMasteringId`, `licenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MixMasteringContact` (
    `mixMasteringId` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mixMasteringId`, `contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MixMasteringGenre` (
    `mixMasteringId` VARCHAR(191) NOT NULL,
    `genreId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mixMasteringId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MixMasteringMusic` (
    `mixMasteringId` VARCHAR(191) NOT NULL,
    `musicId` VARCHAR(191) NOT NULL,
    `isBefore` BOOLEAN NOT NULL,
    `isAfter` BOOLEAN NOT NULL,

    PRIMARY KEY (`mixMasteringId`, `musicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumArt` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `updateDescription` MEDIUMTEXT NOT NULL,
    `isPending` BOOLEAN NOT NULL DEFAULT true,
    `isAuthorized` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumArtLicense` (
    `id` VARCHAR(191) NOT NULL,
    `cost` SMALLINT NOT NULL,
    `updateCount` TINYINT NOT NULL,
    `workPeriod` SMALLINT NOT NULL,
    `draftCount` SMALLINT NOT NULL,
    `isCopyRightTransferAllowed` BOOLEAN NOT NULL,
    `isCommercialUseAllowed` BOOLEAN NOT NULL,
    `isOriginFileProvided` BOOLEAN NOT NULL,
    `isApplicationAvailable` BOOLEAN NOT NULL,
    `licenseId` VARCHAR(191) NOT NULL,
    `albumArtId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AlbumArtLicense_albumArtId_licenseId_key`(`albumArtId`, `licenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumArtContact` (
    `albumArtId` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`albumArtId`, `contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumArtImage` (
    `albumArtId` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,
    `isThumbnail` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`albumArtId`, `imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumArtSaleTypeBridge` (
    `albumArtId` VARCHAR(191) NOT NULL,
    `saleTypeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`albumArtId`, `saleTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumArtSaleType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(255) NOT NULL,
    `extension` VARCHAR(20) NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `id` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(255) NOT NULL,
    `extension` VARCHAR(20) NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mood` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `License` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSocial` ADD CONSTRAINT `UserSocial_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Musician` ADD CONSTRAINT `Musician_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianService` ADD CONSTRAINT `MusicianService_musicianId_fkey` FOREIGN KEY (`musicianId`) REFERENCES `Musician`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianService` ADD CONSTRAINT `MusicianService_mrBeatId_fkey` FOREIGN KEY (`mrBeatId`) REFERENCES `MrBeat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianService` ADD CONSTRAINT `MusicianService_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianService` ADD CONSTRAINT `MusicianService_recordingId_fkey` FOREIGN KEY (`recordingId`) REFERENCES `Recording`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianService` ADD CONSTRAINT `MusicianService_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianService` ADD CONSTRAINT `MusicianService_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianPosition` ADD CONSTRAINT `MusicianPosition_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianPosition` ADD CONSTRAINT `MusicianPosition_musicianId_fkey` FOREIGN KEY (`musicianId`) REFERENCES `Musician`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianSns` ADD CONSTRAINT `MusicianSns_snsId_fkey` FOREIGN KEY (`snsId`) REFERENCES `Sns`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianSns` ADD CONSTRAINT `MusicianSns_musicianId_fkey` FOREIGN KEY (`musicianId`) REFERENCES `Musician`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeat` ADD CONSTRAINT `MrBeat_thumbmailId_fkey` FOREIGN KEY (`thumbmailId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeat` ADD CONSTRAINT `MrBeat_musicId_fkey` FOREIGN KEY (`musicId`) REFERENCES `File`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeat` ADD CONSTRAINT `MrBeat_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeat` ADD CONSTRAINT `MrBeat_moodId_fkey` FOREIGN KEY (`moodId`) REFERENCES `Mood`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatContact` ADD CONSTRAINT `MrBeatContact_mrBeatId_fkey` FOREIGN KEY (`mrBeatId`) REFERENCES `MrBeat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatContact` ADD CONSTRAINT `MrBeatContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatLicense` ADD CONSTRAINT `MrBeatLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatLicense` ADD CONSTRAINT `MrBeatLicense_mrBeatId_fkey` FOREIGN KEY (`mrBeatId`) REFERENCES `MrBeat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MrBeatLicenseProvidedFile` ADD CONSTRAINT `MrBeatLicenseProvidedFile_mrBeatLicenseId_fkey` FOREIGN KEY (`mrBeatLicenseId`) REFERENCES `MrBeatLicense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistLicense` ADD CONSTRAINT `ArtistLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistLicense` ADD CONSTRAINT `ArtistLicense_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistLicenseProvidedFile` ADD CONSTRAINT `ArtistLicenseProvidedFile_artistLicenseId_fkey` FOREIGN KEY (`artistLicenseId`) REFERENCES `ArtistLicense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistContact` ADD CONSTRAINT `ArtistContact_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistContact` ADD CONSTRAINT `ArtistContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistSaleTypeBridge` ADD CONSTRAINT `ArtistSaleTypeBridge_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistSaleTypeBridge` ADD CONSTRAINT `ArtistSaleTypeBridge_saleTypeId_fkey` FOREIGN KEY (`saleTypeId`) REFERENCES `ArtistSaleType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistImage` ADD CONSTRAINT `ArtistImage_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistImage` ADD CONSTRAINT `ArtistImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recording` ADD CONSTRAINT `Recording_recordingRegionId_fkey` FOREIGN KEY (`recordingRegionId`) REFERENCES `RecordingRegion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingLicense` ADD CONSTRAINT `RecordingLicense_recordingId_fkey` FOREIGN KEY (`recordingId`) REFERENCES `Recording`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingLicense` ADD CONSTRAINT `RecordingLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingRegion` ADD CONSTRAINT `RecordingRegion_regionLargeGroupId_fkey` FOREIGN KEY (`regionLargeGroupId`) REFERENCES `RegionLargeGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingRegion` ADD CONSTRAINT `RecordingRegion_regionSmallGroupId_fkey` FOREIGN KEY (`regionSmallGroupId`) REFERENCES `RegionSmallGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingImage` ADD CONSTRAINT `RecordingImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingImage` ADD CONSTRAINT `RecordingImage_recordingId_fkey` FOREIGN KEY (`recordingId`) REFERENCES `Recording`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegionSmallGroup` ADD CONSTRAINT `RegionSmallGroup_largeGroupId_fkey` FOREIGN KEY (`largeGroupId`) REFERENCES `RegionLargeGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMastering` ADD CONSTRAINT `MixMastering_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringLicense` ADD CONSTRAINT `MixMasteringLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringLicense` ADD CONSTRAINT `MixMasteringLicense_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringContact` ADD CONSTRAINT `MixMasteringContact_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringContact` ADD CONSTRAINT `MixMasteringContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringGenre` ADD CONSTRAINT `MixMasteringGenre_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringGenre` ADD CONSTRAINT `MixMasteringGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringMusic` ADD CONSTRAINT `MixMasteringMusic_mixMasteringId_fkey` FOREIGN KEY (`mixMasteringId`) REFERENCES `MixMastering`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MixMasteringMusic` ADD CONSTRAINT `MixMasteringMusic_musicId_fkey` FOREIGN KEY (`musicId`) REFERENCES `File`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtLicense` ADD CONSTRAINT `AlbumArtLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtLicense` ADD CONSTRAINT `AlbumArtLicense_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtContact` ADD CONSTRAINT `AlbumArtContact_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtContact` ADD CONSTRAINT `AlbumArtContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtImage` ADD CONSTRAINT `AlbumArtImage_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtImage` ADD CONSTRAINT `AlbumArtImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtSaleTypeBridge` ADD CONSTRAINT `AlbumArtSaleTypeBridge_albumArtId_fkey` FOREIGN KEY (`albumArtId`) REFERENCES `AlbumArt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumArtSaleTypeBridge` ADD CONSTRAINT `AlbumArtSaleTypeBridge_saleTypeId_fkey` FOREIGN KEY (`saleTypeId`) REFERENCES `AlbumArtSaleType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
