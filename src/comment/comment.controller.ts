import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: any) {
    const userId = req.user.id
    return this.commentService.create(createCommentDto, userId);
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
