import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import { Profile } from 'src/profile/entities/profile.entity';
dotenv.config()


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private jwtService: JwtService
  ) {}

  async register(authDto: AuthDto) {
    try {
      // Yangi foydalanuvchi yaratish
      const user = this.userRepository.create();
      user.username = authDto.username;
      user.email = authDto.email;
      user.password = await bcrypt.hash(authDto.password, 10);
  
      // Foydalanuvchini saqlash
      const savedUser = await this.userRepository.save(user);
  
      // Yangi profil yaratish va userId ni to'g'ri qo'shish
      const profile = this.profileRepository.create({
        userId: savedUser.id,
        avatarUrl: '',
        bio: ''
      });
  
      // Profilni saqlash
      const savedProfile = await this.profileRepository.save(profile);
      console.log("Saved profile:", savedProfile);
  
      // Foydalanuvchi bilan profilni bog'lash
      savedUser.profileId = savedProfile.id;
      await this.userRepository.save(savedUser);
  
      return savedUser;
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Registration failed');
    }
  }
  


  
  async login(loginDto: { email: string; password: string}){
    const user = await this.userRepository.findOneBy({ email: loginDto.email})
    if(!user) {
      throw new NotFoundException('User not found')
    }
    const checkPass = await bcrypt.compare(loginDto.password, user.password)
    if(!checkPass) {
      throw new NotFoundException('Password wrong')
    }
    const payload = { id: user.id, email: user.email, role: user.role}
    const accesToken = await this.jwtService.sign(payload, {secret: process.env.SECRET_KEY, expiresIn: '1d'})
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.SECRET_KEY, expiresIn: '7d'})
    user.refreshToken = refreshToken;
    user.refreshToken=undefined
    user.password=undefined
   
    await this.userRepository.save(user)
    const { password, ...userData } = user
    return { userData, accesToken, refreshToken}
  }

  async getAllMyData(payload: any) {
    const user = await this.userRepository.findOneBy({ id: payload.id })
    user.refreshToken=undefined
    user.password=undefined
    return user
  }

  async findById(id: number): Promise<User | null > {
    return this.userRepository.findOne({ where: { id }})
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string}> {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.SECRET_KEY}); 
      const user = await this.findById(payload.id)

      if (!user || user.refreshToken !== refreshToken) { 
        throw new UnauthorizedException('Yaroqsiz refresh token');
      }

      const newAccesToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role }, { secret: process.env.SECRET_KEY, expiresIn: '1d'});
      return { accessToken: newAccesToken };
    } catch (error) {
      console.error('Refresh token xatosi:', error.message);
      throw new UnauthorizedException('Yaroqsiz yoki muddati tugagan refresh token');
    }
  }

  async logout(token: string): Promise<{ message: string }> {
    const payload = this.jwtService.verify(token)
    const userId = payload.id
    return { message: 'Foydalanuvchi muvaffaqqiyatli tizimdan chiqdi'}
  }
}
