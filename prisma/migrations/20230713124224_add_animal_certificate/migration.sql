/*
  Warnings:

  - You are about to alter the column `createdAt` on the `AdoptionStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `AdoptionStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `AdoptionStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `AdoptionTransaction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `AdoptionTransaction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `AdoptionTransaction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `Animal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Animal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `Animal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `AnimalPhoto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `AnimalPhoto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `AnimalPhoto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `AnimalStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `AnimalStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `AnimalStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `AnimalType` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `AnimalType` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `AnimalType` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `ApplicationStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `ApplicationStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `ApplicationStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `Chat` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Chat` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `Chat` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `ChatRoom` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `ChatRoom` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `ChatRoom` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `revokedAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `revokedAt` on the `ResetPasswordToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `ResetPasswordToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `ResetPasswordToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `ResetPasswordToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `ResetPasswordToken` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `ShelterAdoptionStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `ShelterAdoptionStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `ShelterAdoptionStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `ShelterAnimalStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `ShelterAnimalStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `ShelterAnimalStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `ShelterStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `ShelterStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `ShelterStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `UserStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `UserStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `UserStatistics` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `AdoptionStatistics` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `AdoptionTransaction` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `Animal` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `AnimalPhoto` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `AnimalStatistics` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `AnimalType` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `ApplicationStatistics` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `Chat` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `ChatRoom` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `RefreshToken` MODIFY `revokedAt` DATETIME NULL,
    MODIFY `expiredAt` DATETIME NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `ResetPasswordToken` MODIFY `revokedAt` DATETIME NULL,
    MODIFY `expiredAt` DATETIME NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `ShelterAdoptionStatistics` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `ShelterAnimalStatistics` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `ShelterStatistics` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `UserStatistics` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `deletedAt` DATETIME NULL;

-- CreateTable
CREATE TABLE `AnimalCertificate` (
    `id` CHAR(40) NOT NULL,
    `animalId` CHAR(40) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `path` TEXT NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `AnimalCertificate_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnimalCertificate` ADD CONSTRAINT `AnimalCertificate_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
