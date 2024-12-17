import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement) private announcementRepository: Repository<Announcement>
  ) {}

  async create(title: string, content: string): Promise<Announcement> {
    const announcemnet = this.announcementRepository.create({ title, content})
    return this.announcementRepository.save(announcemnet);
  }

  async findAll(): Promise<Announcement[]> {
    return this.announcementRepository.find({
      where: { isActive: true},
      order: { createdAt: 'DESC'}
    });
  }

  async findOne(id: number): Promise<Announcement> {
    const announcement = await this.announcementRepository.findOne({ where: { id, isActive: true }})
    if(!announcement) throw new NotFoundException('Announcement not found')
      return announcement;
  }

  

  async update(id: number, title: string, content: string): Promise<Announcement> {
    const announcement = await this.findOne(id)
    announcement.title = title;
    announcement.content = content;
    return this.announcementRepository.save(announcement)
  }

  async remove(id: number): Promise<void> {
    const announcement = await this.findOne(id)
    await this.announcementRepository.remove(announcement)
  }
}
