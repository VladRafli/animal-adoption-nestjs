import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { PrismaService } from '@/_provider';
import { JwtStrategy } from '@/_strategy';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, PrismaService, JwtStrategy],
})
export class StatisticsModule {}
