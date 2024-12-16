import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { FilterPostsDto } from './dto/filter-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { userId, title, content } = createPostDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const post = this.postRepository.create({ title, content, user });
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async findFilteredPosts(filterPostsDto: FilterPostsDto): Promise<Post[]>{
    const { search, categoryId, sortBy } = filterPostsDto

    const query = this.postRepository.createQueryBuilder('post')
    .leftJoinAndSelect('post.categories', 'category')
    .leftJoinAndSelect('post.likes', 'like')

    if(search) {
      query.andWhere('(post.title ILIKE :search OR post.content ILIKE :search)', {search: `%${search}%`})
    }
    
    if(categoryId) {
      query.andWhere('category.id = :categoryId', { categoryId })
    }

    if(sortBy === 'likes') {
      query.orderBy('post.createdAt', 'DESC')
    }

    query.groupBy('post.id')

    return query.getMany()
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    await this.postRepository.save(post);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
