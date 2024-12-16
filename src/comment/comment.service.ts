import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: createCommentDto.postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  async findByPost(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });
  }
  async findByPostWithCount(postId: number): Promise<{ comments: Comment[]; count: number }> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    const comments = await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });

    const count = await this.commentRepository.count({ where: { post: { id: postId } } });

    return { comments, count };
  }
}
