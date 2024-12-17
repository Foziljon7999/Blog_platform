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

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const { text, parentId, postId } = dto;
  
    const comment = new Comment();
    comment.text = text;
  
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    comment.post = post;
  
    if (parentId) {
      const parentComment = await this.commentRepository.findOne({ where: { id: parentId } });
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }
      comment.parent = parentComment;
    }
  
    return this.commentRepository.save(comment);
  }

  async getComments(postId: number): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { post: { id: postId }, parent: null }, // Faqat root kommentariyalar
      relations: ['replies'], // Javoblarni yuklash
    });
  
    // Rekursiv tarzda replies bilan to'ldirish
    return this.loadReplies(comments);
  }
  
  private async loadReplies(comments: Comment[]): Promise<Comment[]> {
    for (const comment of comments) {
      const replies = await this.commentRepository.find({
        where: { parent: { id: comment.id } },
        relations: ['replies'], // Repliesni ham yuklash
      });
      comment.replies = await this.loadReplies(replies); // Rekursiv chaqiriq
    }
    return comments;
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
