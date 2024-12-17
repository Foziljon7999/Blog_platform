import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark) private bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  async addBookmark(userId: number, postId: number): Promise<Bookmark> {
    const post = await this.postRepository.findOne({ where: { id: postId }})
    if(!post) {
      throw new NotFoundException('Post not found')
    }
    const bookmark = this.bookmarkRepository.create({ user: { id: userId }, post})
    return this.bookmarkRepository.save(bookmark)
  }

  async getUserBookmarks(userId: number): Promise<Bookmark[]>{
    return this.bookmarkRepository.find({
      where: { user: { id: userId }},
      relations: ['post']
    })
  }

  async removeBookmark(userId: number, postId: number): Promise<string> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { user: { id: userId }, post: { id: postId }}
    })
    if(!bookmark) {
      throw new NotFoundException('Bookmark not found')
    }
    await this.bookmarkRepository.remove(bookmark)
    return 'Bookmark removed'
  }
}
