import { PrismaClient } from '@prisma/client';
import * as Bcrypt from 'bcrypt';
import * as uuid from 'uuid';

const prisma = new PrismaClient();

export default async function User() {
  const userId = uuid.v4();
  await prisma.user.create({
    data: {
      id: userId,
      email: 'admin@example.com',
      password: Bcrypt.hashSync('admin', Bcrypt.genSaltSync()),
      name: 'Admin',
      role: 'admin',
    },
  });
  return { userId };
}
