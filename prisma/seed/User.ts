import { PrismaClient } from '@prisma/client';
import * as Bcrypt from 'bcrypt';
import * as uuid from 'uuid';

const prisma = new PrismaClient();

export default async function User() {
  const userId = Array.from({ length: 3 }).map(() => uuid.v4());
  await prisma.user.createMany({
    data: [
      {
        id: userId[0],
        email: 'admin@example.com',
        password: Bcrypt.hashSync('admin', Bcrypt.genSaltSync()),
        name: 'Admin',
        role: 'admin',
      },
      {
        id: userId[1],
        email: 'adopter@example.com',
        password: Bcrypt.hashSync('adopter', Bcrypt.genSaltSync()),
        name: 'Adopter',
        role: 'adopter',
      },
      {
        id: userId[2],
        email: 'shelter@example.com',
        password: Bcrypt.hashSync('shelter', Bcrypt.genSaltSync()),
        name: 'Shelter',
        role: 'shelter',
      },
    ],
  });
  return { userId };
}
