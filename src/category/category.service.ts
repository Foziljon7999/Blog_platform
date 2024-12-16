import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Post) private postCategory: Repository<Post>
  ) {}


 async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
  const category = this.categoryRepository.create(createCategoryDto)
    return this.categoryRepository.save(category);
  }

 async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

 async findByCategory(categoryId: number): Promise<Post[]> {
    return this.postCategory.find({
      where: { categories: { id: categoryId }},
      relations: ['categories']
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
