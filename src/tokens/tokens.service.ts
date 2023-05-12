import { PrismaService } from '@/_provider';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class TokensService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: string) {
    return await this.prismaService.refreshToken.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return await this.prismaService.refreshToken.findMany();
  }

  async revokeToken(id: string) {
    return await this.prismaService.refreshToken.update({
      data: {
        revokedAt: dayjs().format(),
      },
      where: {
        id,
      },
    });
  }
}
