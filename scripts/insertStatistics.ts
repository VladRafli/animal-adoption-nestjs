import { PrismaClient } from '@prisma/client';
import getAdoptionStatistics from './statistic/getAdoptionStatistics';
import getAnimalStatistics from './statistic/getAnimalStatistics';
import getUserStatistics from './statistic/getUserStatistics';

const prisma = new PrismaClient();

async function main() {
  const userStatistics = await getUserStatistics();
  const animalStatistics = await getAnimalStatistics();
  const adoptionStatistics = await getAdoptionStatistics();

  await prisma.applicationStatistics.create({
    data: {
      userStatistics: {
        create: {
          totalUser: userStatistics.totalUser,
          totalAdmin: userStatistics.totalAdmin,
          totalAdopter: userStatistics.totalAdopter,
          totalShelter: userStatistics.totalShelter,
        },
      },
      animalStatistics: {
        create: {
          totalAnimal: animalStatistics.totalAnimal,
          totalCat: animalStatistics.totalCat,
          totalDog: animalStatistics.totalDog,
        },
      },
      adoptionStatistics: {
        create: {
          totalAdoption: adoptionStatistics.totalAdoption,
          totalCatAdoption: adoptionStatistics.totalCatAdoption,
          totalDogAdoption: adoptionStatistics.totalDogAdoption,
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
