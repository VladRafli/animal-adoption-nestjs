import { AnimalGender, Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as uuid from 'uuid';

const prisma = new PrismaClient();

export default async function Animal({
  user,
  animalType,
}: {
  user: {
    userId: string;
  };
  animalType: {
    catTypeId: string;
    dogTypeId: string;
  };
}) {
  // Cat
  const cat: Prisma.AnimalCreateManyInput[] = Array.from({ length: 5 }).map(
    () => ({
      id: uuid.v4(),
      userId: user.userId,
      animalTypeId: animalType.catTypeId,
      name: faker.name.firstName(),
      age: faker.datatype.number({ min: 0, max: 10 }),
      gender: AnimalGender[faker.name.sex()],
      breed: faker.animal.cat(),
    }),
  );

  // Dog
  const dog: Prisma.AnimalCreateManyInput[] = Array.from({ length: 5 }).map(
    () => ({
      id: uuid.v4(),
      userId: user.userId,
      animalTypeId: animalType.dogTypeId,
      name: faker.name.firstName(),
      age: faker.datatype.number({ min: 0, max: 10 }),
      gender: AnimalGender[faker.name.sex()],
      breed: faker.animal.dog(),
    }),
  );

  const data = [];

  cat.forEach((val) => data.push(val));
  dog.forEach((val) => data.push(val));

  await prisma.animal.createMany({
    data: data,
  });
}
