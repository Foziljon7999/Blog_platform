import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AdminPanelService } from './admin_panel.service';
import { CreateAdminPanelDto } from './dto/create-admin_panel.dto';
import { UpdateAdminPanelDto } from './dto/update-admin_panel.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Get('users')
  getAllUsers() {
    return this.adminPanelService.findAllUsers()
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch('block-user/:id')
  blockUser(@Param('id') userId: number, @Body() body: { reason: string}) {
    return this.adminPanelService.blockUser(userId, body.reason)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('posts')
  getAllPosts() {
    return this.adminPanelService.findAllPosts()
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch('update-post/:id')
  updatePostStatus(@Param('id') postId: number, @Body() body: { status: string}) {
    return this.adminPanelService.updatePostStatus(postId, body.status)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('comments')
  getAllComments() {
    return this.adminPanelService.findAllComments()
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete('delete-comment/:id')
  deleteComment(@Param('id') commentId: number) {
    return this.adminPanelService.deleteComment(commentId)
  }
}
