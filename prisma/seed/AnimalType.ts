import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AnimalType() {
  await prisma.animalType.create({
    data: {
      id: 1,
      name: 'Kucing',
    },
  });
  await prisma.animalType.create({
    data: {
      id: 2,
      name: 'Anjing',
    },
  });
}
