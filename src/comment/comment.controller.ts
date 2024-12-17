import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }

  @Get(':postId')
  findByPost(@Param('postId') postId: number) {
    return this.commentService.findByPost(postId);
  }
  @Get('by-post/:postId')
  async findByPostWithCount(@Param('postId') postId: number) {
    return this.commentService.findByPostWithCount(postId);
  }
}
