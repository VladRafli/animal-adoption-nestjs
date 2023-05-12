-- CreateTable
CREATE TABLE `User` (
    `id` CHAR(40) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profilePicture` VARCHAR(255) NULL,
    `role` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `number` VARCHAR(50) NULL,
    `address` VARCHAR(255) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` CHAR(40) NOT NULL,
    `token` VARCHAR(500) NOT NULL,
    `revokedAt` DATETIME NULL,
    `expiredAt` DATETIME NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResetPasswordToken` (
    `id` CHAR(40) NOT NULL,
    `token` VARCHAR(500) NOT NULL,
    `revokedAt` DATETIME NULL,
    `expiredAt` DATETIME NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimalType` (
    `id` CHAR(40) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `AnimalType_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animal` (
    `id` CHAR(40) NOT NULL,
    `userId` CHAR(40) NOT NULL,
    `animalTypeId` CHAR(40) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `age` TINYINT UNSIGNED NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `breed` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `Animal_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimalPhoto` (
    `id` CHAR(40) NOT NULL,
    `animalId` CHAR(40) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `size` INTEGER UNSIGNED NOT NULL,
    `extension` VARCHAR(100) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `AnimalPhoto_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResetPasswordToken` ADD CONSTRAINT `ResetPasswordToken_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_animalTypeId_fkey` FOREIGN KEY (`animalTypeId`) REFERENCES `AnimalType`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimalPhoto` ADD CONSTRAINT `AnimalPhoto_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

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
