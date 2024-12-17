import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { LikeModule } from './like/like.module';
import { Like } from './like/entities/like.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { FollowersModule } from './followers/followers.module';
import { Follower } from './followers/entities/follower.entity';
import { StatisticsModule } from './statistics/statistics.module';
import { VoteModule } from './vote/vote.module';
import { Vote } from './vote/entities/vote.entity';
import { AnnouncementModule } from './announcement/announcement.module';
import { Announcement } from './announcement/entities/announcement.entity';
import { BookmarkModule } from './bookmark/bookmark.module';
import { Bookmark } from './bookmark/entities/bookmark.entity';
import { UserPreferencesModule } from './user_preferences/user_preferences.module';
import { UserPreference } from './user_preferences/entities/user_preference.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    type: 'postgres',
    password: '1111',
    database: 'blog',
    entities: [User, Post, Comment, Like, Category, Profile, Follower, Vote, Announcement, Bookmark, UserPreference],
    synchronize: true
  }),
UsersModule,
AuthModule,
PostsModule,
CommentModule,
LikeModule,
CategoryModule,
ProfileModule,
FollowersModule,
StatisticsModule,
VoteModule,
AnnouncementModule,
BookmarkModule,
UserPreferencesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
