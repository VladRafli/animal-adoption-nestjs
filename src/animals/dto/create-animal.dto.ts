import { AnimalGender, Prisma } from '@prisma/client';

export class CreateAnimalDto implements Prisma.AnimalCreateInput {
  id: string;
  name: string;
  age: number;
  gender: AnimalGender;
  breed: string;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date;
  user: Prisma.UserCreateNestedOneWithoutAnimalInput;
  animalType: Prisma.AnimalTypeCreateNestedOneWithoutAnimalInput;
  AnimalPhoto?: Prisma.AnimalPhotoCreateNestedManyWithoutAnimalInput;
}
