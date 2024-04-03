/*
  Warnings:

  - You are about to drop the `_albumtophoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_albumtophoto` DROP FOREIGN KEY `_AlbumToPhoto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_albumtophoto` DROP FOREIGN KEY `_AlbumToPhoto_B_fkey`;

-- DropForeignKey
ALTER TABLE `album` DROP FOREIGN KEY `Album_userId_fkey`;

-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `Photo_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `height` DOUBLE NULL,
    ADD COLUMN `weight` DOUBLE NULL;

-- DropTable
DROP TABLE `_albumtophoto`;

-- DropTable
DROP TABLE `album`;

-- DropTable
DROP TABLE `photo`;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `trainer` VARCHAR(191) NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Progress` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `weight` DOUBLE NOT NULL,
    `exercise` VARCHAR(191) NOT NULL,
    `reps` INTEGER NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
