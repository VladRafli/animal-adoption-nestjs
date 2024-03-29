import { PrismaService } from '@/_provider/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStatistics(role: string) {
    if (role === 'admin') {
      return await this.prismaService.applicationStatistics.findMany({
        include: {
          adoptionStatistics: true,
          animalStatistics: true,
          userStatistics: true,
        },
        take: 8,
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    if (role === 'shelter') {
      return await this.prismaService.shelterStatistics.findMany({
        include: {
          shelterAdoptionStatistics: true,
          shelterAnimalStatistics: true,
        },
        take: 8,
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    throw new BadRequestException('Invalid role');
  }
}
