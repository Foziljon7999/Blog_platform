import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class AdminPanelService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async blockUser(userId: number, reason: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }})
    if(user) {
      user.status = 'blocked';
      user.reason = reason;
      return this.userRepository.save(user)
    }
    throw new NotFoundException('User not found')
  }

  async findAllPosts(): Promise<Post[]> {
    return this.postsRepository.find()
  }

  async updatePostStatus(postId: number, status: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id: postId }})
    if(post) {
      post.status = status;
      return this.postsRepository.save(post)
    }
    throw new NotFoundException('Post not found')
  }

  async findAllComments(): Promise<Comment[]> {
    return this.commentRepository.find()
  }

  async deleteComment(commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId }})
    if(comment){
      await this.commentRepository.remove(comment)
    } else {
      throw new NotFoundException('Comment not found')
    }
  }
}
