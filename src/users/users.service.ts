import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
 constructor(
  @InjectRepository(User) private userRepository: Repository<User> 
 ) {}

  async createAdmin(username: string, email: string, password: string, role: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = this.userRepository.create({ 
      username,
      email,
      password: hashedPassword,
      role
    })
    await this.userRepository.save(user)
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }})
    if(!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi id: ${id}`)
    }
    return user;
  }

 async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne(id)
    Object.assign(user, updateData)
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id }})
    if(!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    await this.userRepository.delete(id)
  }
}
