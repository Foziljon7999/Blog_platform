import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthGuard)
  @Post(':postId')
  async addLike(@Param('postId') postId: number, @Req() req: any) {
    const userId = req.user.id
    return this.likeService.addLike(userId, postId);
  }

  @Get('count/:postId')
  async countLikes(@Param('postId', ParseIntPipe) postId: number): Promise<{ count: number }> {
    const count = await this.likeService.countLikes(postId);
    return { count };
  }
}
