import { Module} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Like } from 'src/like/entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Like, Comment])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
