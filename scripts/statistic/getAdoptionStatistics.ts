import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAdoptionStatistics() {
  const totalAdoption = await prisma.adoptionTransaction.count();
  const totalCatAdoption = await prisma.adoptionTransaction.count({
    where: {
      animal: {
        animalType: {
          name: 'cat',
        },
      },
    },
  });
  const totalDogAdoption = await prisma.adoptionTransaction.count({
    where: {
      animal: {
        animalType: {
          name: 'dog',
        },
      },
    },
  });

  return { totalAdoption, totalCatAdoption, totalDogAdoption };
}
