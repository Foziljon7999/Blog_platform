import { Controller, Get, Post, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostsService } from 'src/posts/posts.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService,
    private readonly postsSevice: PostsService
  ) {}

  @UseGuards(AuthGuard)
  @Post(':postId')
  async addBookmark(@Req() req, @Param('postId') postId: number) {
    const userId = req.user.id
    return this.bookmarkService.addBookmark(userId, postId)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getBookmarks(@Req() req) {
    const userId = req.user.id
    return this.bookmarkService.getUserBookmarks(userId)
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  async removeBookmark(@Req() req , @Param('postId') postId: number) {
    const userId = req.user.id
    return this.bookmarkService.removeBookmark(userId, postId)
  }

  
  @Get(':postId/share/facebook')
  async shareOnFacebook(@Param('postId') postId: number): Promise<{ facebookShareUrl: string }> {
    const shareUrl = await this.postsSevice.getShareUrl(postId);
    const facebookShareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    return { facebookShareUrl };
  }

  @Get(':postId/share/instagram')
  async shareOnInstagram(@Param('postId') postId: number): Promise<{ instagramShareUrl: string }> {
    const shareUrl = await this.postsSevice.getShareUrl(postId);
    const instagramShareUrl = `https://www.instagram.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    return { instagramShareUrl };
  }

  @Get(':postId/share/telegram')
  async shareOnTelegram(@Param('postId') postId: number): Promise<{ telegramShareUrl: string }> {
    const shareUrl = await this.postsSevice.getShareUrl(postId);
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`;
    return { telegramShareUrl };
  }

  @Get(':postId/share/tiktok')
  async shareOnTiktok(@Param('postId') postId: number): Promise<{ tiktokShareUrl: string }> {
    const shareUrl = await this.postsSevice.getShareUrl(postId);
    const tiktokShareUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`;
    return { tiktokShareUrl };
  }

  @Get(':postId/share/twitter')
  async shareOnTwitter(@Param('postId') postId: number): Promise<{ twitterShareUrl: string }> {
    const shareUrl = await this.postsSevice.getShareUrl(postId);
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
    return { twitterShareUrl };
  }

  @Get(':postId/share/linkedin')
  async shareOnLinkedin(@Param('postId') postId: number): Promise<{ linkedinShareUrl: string }> {
    const shareUrl = await this.postsSevice.getShareUrl(postId);
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`;
    return { linkedinShareUrl };
  }

}
