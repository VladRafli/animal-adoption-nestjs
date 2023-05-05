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

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const user = await this.findOne(id);

    return this.prisma.user.update({
      where: { id: user.id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return this.prisma.user.delete({ where: { id: user.id } });
  }
}
