import { Roles } from '@/_decorators';
import { JwtAuthGuard, RolesGuard } from '@/_guard';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller({
  path: 'statistics',
  version: '1',
})
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'shelter')
  async getStatistics(@Req() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved statistics',
      data: await this.statisticsService.getStatistics(req.user.role),
    };
  }
}
