-- DropForeignKey
ALTER TABLE `RecordingImage` DROP FOREIGN KEY `RecordingImage_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `RecordingImage` DROP FOREIGN KEY `RecordingImage_recordingId_fkey`;

-- DropForeignKey
ALTER TABLE `RecordingLicense` DROP FOREIGN KEY `RecordingLicense_licenseId_fkey`;

-- DropForeignKey
ALTER TABLE `RecordingLicense` DROP FOREIGN KEY `RecordingLicense_recordingId_fkey`;

-- AddForeignKey
ALTER TABLE `RecordingLicense` ADD CONSTRAINT `RecordingLicense_recordingId_fkey` FOREIGN KEY (`recordingId`) REFERENCES `Recording`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingLicense` ADD CONSTRAINT `RecordingLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingImage` ADD CONSTRAINT `RecordingImage_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecordingImage` ADD CONSTRAINT `RecordingImage_recordingId_fkey` FOREIGN KEY (`recordingId`) REFERENCES `Recording`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
