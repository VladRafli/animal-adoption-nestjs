import { bcrypt, uuid } from '@/_helper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/_provider/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { S3StorageService } from '@/_provider';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private s3StorageService: S3StorageService,
  ) {}

  async create(user: CreateUserDto) {
    const { password, profilePicture, ...rest } = user;
    const userId = uuid.v4();

    return await this.prisma.user.create({
      data: {
        id: userId,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        profilePicture:
          user.profilePicture !== undefined
            ? (
                await this.s3StorageService.uploadFile(
                  `profile/${userId}/${uuid.v4()}.jpg`,
                  Buffer.from(profilePicture, 'base64'),
                )
              ).Location
            : null,
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
    const { password, profilePicture, ...rest } = updateUserDto;

    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password:
          updateUserDto.password !== undefined
            ? bcrypt.hashSync(password, bcrypt.genSaltSync())
            : undefined,
        profilePicture:
          updateUserDto.profilePicture !== undefined
            ? (
                await this.s3StorageService.uploadFile(
                  `profile/${user.id}/${uuid.v4()}.jpg`,
                  Buffer.from(profilePicture, 'base64'),
                )
              ).Location
            : null,
        ...rest,
      },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return await this.prisma.user.delete({ where: { id: user.id } });
  }
}
