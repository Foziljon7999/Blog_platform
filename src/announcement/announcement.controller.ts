import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { title } from 'process';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  async createAnnouncement(
    @Body('title') title: string,
    @Body('content') content: string
  ) {
    return this.announcementService.create(title, content)
  }

  @Get('all')
  async getAllAnnouncements() {
    return this.announcementService.findAll();
  }

  @Get(':id')
  async getAnnouncement(@Param('id') id: string) {
    return this.announcementService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async updateAnnouncement(@Param('id') id: number, @Body('title') title: string,
  @Body('content') content: string
) {
    return this.announcementService.update(id, title, content);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteAnnouncement(@Param('id') id: number) {
    return this.announcementService.remove(id);
  }
}
