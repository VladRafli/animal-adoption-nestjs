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
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.refreshToken.findMany({
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async revokeToken(id: string) {
    return await this.prismaService.refreshToken.update({
      data: {
        revokedAt: dayjs().format(),
      },
      where: {
        id,
      },
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });
  }
}
