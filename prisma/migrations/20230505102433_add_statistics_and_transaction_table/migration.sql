/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Animal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Animal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `Animal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `AnimalPhoto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `AnimalPhoto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `AnimalPhoto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `AnimalType` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `AnimalType` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `AnimalType` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `revokedAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Animal` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `AnimalPhoto` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `AnimalType` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `RefreshToken` MODIFY `revokedAt` DATETIME NULL,
    MODIFY `expiredAt` DATETIME NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- CreateTable
CREATE TABLE `AdoptionTransaction` (
    `id` CHAR(40) NOT NULL,
    `userId` CHAR(40) NOT NULL,
    `animalId` CHAR(40) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `AdoptionTransaction_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApplicationStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userStatisticsId` INTEGER NOT NULL,
    `animalStatisticsId` INTEGER NOT NULL,
    `adoptionStatisticsId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `ApplicationStatistics_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalUser` INTEGER NOT NULL,
    `totalAdmin` INTEGER NOT NULL,
    `totalAdopter` INTEGER NOT NULL,
    `totalShelter` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `UserStatistics_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimalStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalAnimal` INTEGER NOT NULL,
    `totalCat` INTEGER NOT NULL,
    `totalDog` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `AnimalStatistics_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdoptionStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalAdoption` INTEGER NOT NULL,
    `totalCatAdoption` INTEGER NOT NULL,
    `totalDogAdoption` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `AdoptionStatistics_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdoptionTransaction` ADD CONSTRAINT `AdoptionTransaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdoptionTransaction` ADD CONSTRAINT `AdoptionTransaction_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationStatistics` ADD CONSTRAINT `ApplicationStatistics_userStatisticsId_fkey` FOREIGN KEY (`userStatisticsId`) REFERENCES `UserStatistics`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationStatistics` ADD CONSTRAINT `ApplicationStatistics_animalStatisticsId_fkey` FOREIGN KEY (`animalStatisticsId`) REFERENCES `AnimalStatistics`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplicationStatistics` ADD CONSTRAINT `ApplicationStatistics_adoptionStatisticsId_fkey` FOREIGN KEY (`adoptionStatisticsId`) REFERENCES `AdoptionStatistics`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
