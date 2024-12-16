import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userReposiroty: Repository<User>
  ) {}

  async addLike(postId: number, userId: number): Promise<string> {
    const post = await this.postRepository.findOne({ where: { id: postId}})
    if(!post)  {
      throw new NotFoundException('Post not found')
    }

    const user = await this.userReposiroty.findOne({ where: { id: userId}})
    if(!user) {
      throw new NotFoundException('User not found')
    }

    const existingLike = await this.likeRepository.findOne({ where: { post: { id: postId }, user: { id: userId }}})
    if(existingLike) {
      await this.likeRepository.delete(existingLike.id)
      return 'Like removed'
    }
    const like = await this.likeRepository.create({ user, post})
    await this.likeRepository.save(like)
    return 'Like added'
  }

  async countLikes(postId: number): Promise<number> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const likeCount = await this.likeRepository.count({ where: { post: { id: postId } } });
    return likeCount;
  }
}
