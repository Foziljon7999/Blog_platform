import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async updateProfile(userId: number, updateData: UpdateProfileDto): Promise<Profile> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let profile = await this.profileRepository.findOne({ 
      where: { user: { id: userId } },
      relations: ['user'] 
    });

    if (!profile) {
      profile = this.profileRepository.create({
        userId: user.id, 
        avatarUrl: '',  
        bio: ''         
      });
    }

    Object.assign(profile, updateData);

    try {
      await this.profileRepository.manager.transaction(async (manager: EntityManager) => {
        await manager.save(profile);
      });
    } catch (error) {
      console.error('Error during profile save:', error.message);
      throw new Error('Profile could not be updated');
    }

    return profile;
  }

  async getProfileByUserId(userId: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { user: { id: userId}},
      relations: ['user']
    })
  }
}