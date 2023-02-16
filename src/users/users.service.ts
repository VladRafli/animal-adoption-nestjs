import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({ where: { deletedAt: null } });
  }

  findOne(username: string) {
    return this.prisma.user.findFirst({
      where: { username: username, deletedAt: null },
    });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
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
