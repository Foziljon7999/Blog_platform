import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Like } from 'src/like/entities/like.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Follower } from 'src/followers/entities/follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Like, Profile, Follower])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule]
  
})
export class UsersModule {}
