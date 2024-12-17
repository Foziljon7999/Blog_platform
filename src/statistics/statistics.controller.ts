import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(AuthGuard) 
  @Get('user')
  async getUserStats(@Req() req) {
    const userId = req.user.id 
    return this.statisticsService.getUserStats(userId);
  }
}
