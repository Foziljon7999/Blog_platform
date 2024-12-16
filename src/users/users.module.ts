import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Like } from 'src/like/entities/like.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Like, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
  
})
export class UsersModule {}
