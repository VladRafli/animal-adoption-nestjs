import { bcrypt, uuid } from '@/_helper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_provider/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const { password, ...rest } = user;

    return await this.prisma.user.create({
      data: {
        id: uuid.v4(),
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        ...rest,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({ where: { deletedAt: null } });
  }

  async findOne(id: string) {
    return await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { password, ...rest } = updateUserDto;

    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        ...rest,
      },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return await this.prisma.user.delete({ where: { id: user.id } });
  }
}
