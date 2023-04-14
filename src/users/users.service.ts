import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/_provider/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: user });
  }

  findAll() {
    return this.prisma.user.findMany({ where: { deletedAt: null } });
  }

  findOne(email: string) {
    return this.prisma.user.findFirst({
      where: { email: email, deletedAt: null },
    });
  }

  async update(username: string, updateUserDto: Prisma.UserUpdateInput) {
    const user = await this.findOne(username);

    return this.prisma.user.update({
      where: { id: user.id },
      data: updateUserDto,
    });
  }

  async remove(username: string) {
    const user = await this.findOne(username);

    return this.prisma.user.delete({ where: { id: user.id } });
  }
}
