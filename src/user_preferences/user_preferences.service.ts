import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPreference } from './entities/user_preference.entity';
import { Repository } from 'typeorm';
import { CreateUserPreferenceDto } from './dto/create-user_preference.dto';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectRepository(UserPreference) private userPreferencesRepository: Repository<UserPreference>
  ) {}

  async findOneByUserId(userId: number): Promise<UserPreference> {
    return this.userPreferencesRepository.findOne({ where: { userId }})
  }

  async updateUserPreference(userId: number, createUserPreferencesDto: CreateUserPreferenceDto): Promise<UserPreference> {
    let userPreferences = await this.userPreferencesRepository.findOne({ where: { userId}})
    if(!userPreferences) {
      userPreferences = this.userPreferencesRepository.create({ userId })
    }
    userPreferences.theme = createUserPreferencesDto.theme
    return this.userPreferencesRepository.save(userPreferences)
  }
}
