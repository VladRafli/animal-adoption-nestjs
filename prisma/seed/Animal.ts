import _ from 'lodash';
import { Animal, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export default async function Animal() {
  // Cat
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cat: any[] = Array.from({ length: 50 }).map(() => ({
    userId: 1,
    name: faker.name.firstName(),
    breed: faker.animal.cat(),
    animalTypeId: 1,
  }));

  // Dog
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dog: any[] = Array.from({ length: 50 }).map(() => ({
    userId: 1,
    name: faker.name.firstName(),
    breed: faker.animal.dog(),
    animalTypeId: 2,
  }));

  const data = _.concat(cat, dog);

  await prisma.animal.createMany({
    data: data,
  });
}
