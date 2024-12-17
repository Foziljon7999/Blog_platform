import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower) private followerRepository: Repository<Follower>
  ) {}

  async followUser(followerId: number, followingId: number): Promise<Follower>{
    if(followerId === followingId){
      throw new BadRequestException("You cant follow yourself" )
    }
    const follow = this.followerRepository.create({ follower: { id: followerId}, following: { id: followingId }})
    return this.followerRepository.save(follow)
  }

  async unfollowUser(followerId: number, followingId: number): Promise<void> {
    await this.followerRepository.delete({ follower: { id: followerId}, following: { id: followingId }})
  }

  async getFollowers(userId: number): Promise<Follower[]> {
    return this.followerRepository.find({ where: { following: { id: userId }}, relations: ['follower']})
  } 

  async getFollowing(userId: number): Promise<Follower[]>{
   return this.followerRepository.find({ where: { follower: { id: userId }}, relations: ['following']})
  }
}
