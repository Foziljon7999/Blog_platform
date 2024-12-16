import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('update')
  @UseGuards(AuthGuard)
  async updateProfile(@Req() req, @Body() updateData: UpdateProfileDto) {
    const userId = req.user.id
    return this.profileService.updateProfile(userId, updateData)
  }
  
  @Get('me')
  @UseGuards(AuthGuard)
  async getMyProfile(@Req() req) {
    const userId = req.user.id
    return this.profileService.getProfileByUserId(userId)
  }
}
