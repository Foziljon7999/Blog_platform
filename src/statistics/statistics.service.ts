import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
 constructor(
  @InjectRepository(User) private userRepository: Repository<User>
 ){}

 async getUserStats(userId: number) {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['posts', 'posts.likes', 'posts.comments']
  })
  if(!user) {
    throw new NotFoundException('User not found')
  }

  const stats = user.posts.map((post) => ({
    postId: post.id,
    title: post.title,
    likeCount: post.likes.length,
    commentCount: post.comments.length
  }));

  return {
    userId: user.id,
    username: user.username,
    stats
  }
 }
}
