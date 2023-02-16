import { PrismaClient } from '@prisma/client';
import * as Bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function User() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: Bcrypt.hashSync('admin', Bcrypt.genSaltSync()),
    },
  });
}
