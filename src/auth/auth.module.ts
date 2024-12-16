import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { UsersModule } from 'src/users/users.module';
import { ProfileModule } from 'src/profile/profile.module';
import { Profile } from 'src/profile/entities/profile.entity';
dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]),
JwtModule.register({
  global: true,
  secret: process.env.SECRET_KEY,
  signOptions: { expiresIn: '1d'}
}),
UsersModule,
ProfileModule
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
