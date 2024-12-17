import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { VoteService } from './vote.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @UseGuards(AuthGuard)
  @Post(':postId')
async vote(
  @Param('postId') postId: number,
  @Body('value') value: number,
  @Req() req: any
) {
const userId = req.user.id
return this.voteService.vote(postId, userId, value)
}

@Get('/trending-posts')
async getTrendingposts() {
  return this.voteService.getTrandingPosts()
}
}
