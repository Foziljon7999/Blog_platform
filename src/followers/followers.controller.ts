import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post('follow/:id')
  @UseGuards(AuthGuard)
  async followUser(@Req() req, @Param('id') followingId: number) {
    const followerId = req.user.id
    return this.followersService.followUser(followerId, followingId)
  }

  @Delete('unfollow/:id')
  @UseGuards(AuthGuard)
  async unfollowUser(@Req() req, @Param('id') followingId: number) {
    const followerId = req.user.id
    return this.followersService.unfollowUser(followerId, followingId)
  }
  
  @Get('followers')
  @UseGuards(AuthGuard)
  async getFollowers(@Req() req ) {
    const userId = req.user.id
    return this.followersService.getFollowers(userId)
  }

  @Get('following')
  @UseGuards(AuthGuard)
  async getFollowing(@Req() req ) {
    const userId = req.user.id
    return this.followersService.getFollowing(userId)
  }
}
