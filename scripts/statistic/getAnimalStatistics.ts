import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAnimalStatistics() {
  const totalAnimal = await prisma.animal.count();
  const totalCat = await prisma.animal.count({
    where: {
      animalType: {
        name: 'cat',
      },
    },
  });
  const totalDog = await prisma.animal.count({
    where: {
      animalType: {
        name: 'dog',
      },
    },
  });

  return { totalAnimal, totalCat, totalDog };
}
