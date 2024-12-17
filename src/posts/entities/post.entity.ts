import { Bookmark } from "src/bookmark/entities/bookmark.entity";
import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Like } from "src/like/entities/like.entity";
import { User } from "src/users/entities/user.entity";
import { Vote } from "src/vote/entities/vote.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
@PrimaryGeneratedColumn()
id: number;

@Column()
title: string;

@Column()
content: string;

@Column({ default: 0})
views: number;

@Column({ default: 0})
likesCount: number;

@Column({ default: 0})
commentsCount: number;

@ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE'})
user: User;

@OneToMany(() => Comment, (comment) => comment.post)
comments: Comment[];

@OneToMany(() => Like, (like) => like.post)
likes: Like[];

@ManyToMany(() => Category, (category) => category.posts)
categories: Category[];

@OneToMany(() => Vote, (vote) => vote.post)
votes: Vote[];

@OneToMany(() => Bookmark, (bookmark) => bookmark.post)
bookmarks: Bookmark[];

@Column({ default: 0})
popularity: number;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
created: Date;

incrementViewCount() {
    this.views += 1;
}
incrementLikeCount() {
    this.likesCount += 1;
}
incrementCommentCount() {
    this.commentsCount += 1;
  }
}


