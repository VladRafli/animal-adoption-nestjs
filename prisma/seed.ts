import { PrismaClient } from '@prisma/client';
import Animal from './seed/Animal';
import AnimalType from './seed/AnimalType';
import User from './seed/User';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.animalType.deleteMany(),
    prisma.animal.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const user = await User();
  const animalType = await AnimalType();
  await Animal({ user: { userId: user.userId[2] }, animalType });
  await Animal({ user: { userId: user.userId[3] }, animalType });
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
