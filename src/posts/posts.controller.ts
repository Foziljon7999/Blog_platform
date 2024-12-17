import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilterPostsDto } from './dto/filter-posts.dto';
import { Post as BlogPost } from './entities/post.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('all')
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Get('filter')
  findFilteredPosts(@Query() filterPostsDto: FilterPostsDto): Promise<BlogPost[]> {
    return this.postsService.findFilteredPosts(filterPostsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Post(':id/view')
  async viewPost(@Param('id') postId: number) {
    return this.postsService.viewPost(postId);
  }

  @Post(':id/like')
  async likePost(@Param('id') postId: number) {
    return this.postsService.likePost(postId);
  }

  @Post(':id/comment')
  async addComment(@Param('id') postId: number) {
    return this.postsService.addCommentToPost(postId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('stats/top-posts')
  async getTopPosts() {
    return this.postsService.GetTopPosts();
  }
}
