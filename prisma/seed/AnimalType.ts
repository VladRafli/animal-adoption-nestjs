import { PrismaClient } from '@prisma/client';
import * as uuid from 'uuid';

const prisma = new PrismaClient();

export default async function AnimalType() {
  const { catTypeId, dogTypeId } = {
    catTypeId: uuid.v4(),
    dogTypeId: uuid.v4(),
  };
  await prisma.animalType.create({
    data: {
      id: catTypeId,
      name: 'cat',
    },
  });
  await prisma.animalType.create({
    data: {
      id: dogTypeId,
      name: 'dog',
    },
  });

  return { catTypeId, dogTypeId };
}
