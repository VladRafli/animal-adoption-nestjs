import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getUserStatistics() {
  const totalUser = await prisma.user.count();
  const totalAdmin = await prisma.user.count({
    where: {
      role: 'admin',
    },
  });
  const totalAdopter = await prisma.user.count({
    where: {
      role: 'adopter',
    },
  });
  const totalShelter = await prisma.user.count({
    where: {
      role: 'shelter',
    },
  });

  return { totalUser, totalAdmin, totalAdopter, totalShelter };
}
