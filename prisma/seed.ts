import { PrismaClient } from '@prisma/client';
import Animal from './seed/Animal';
import AnimalType from './seed/AnimalType';
import User from './seed/User';

const prisma = new PrismaClient();

async function main() {
  User();
  AnimalType();
  Animal();
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
