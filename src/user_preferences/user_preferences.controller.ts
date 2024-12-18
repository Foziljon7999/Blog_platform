import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UserPreferencesService } from './user_preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user_preference.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user-preferences')
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUserPreferences(@Req() req ) {
    const userId = req.user.id
    return this.userPreferencesService.findOneByUserId(userId)
  }

  @UseGuards(AuthGuard)
  @Post()
  setUserPerferences(@Req() req,
  @Body() createUserPreferencesDto: CreateUserPreferenceDto) {
    const userId = req.user.id
return this.userPreferencesService.updateUserPreference(userId, createUserPreferencesDto)
  }
}
