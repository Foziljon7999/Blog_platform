import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Like } from "src/like/entities/like.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
@PrimaryGeneratedColumn()
id: number;

@Column()
title: string;

@Column()
content: string;

@ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE'})
user: User;

@OneToMany(() => Comment, (comment) => comment.post)
comments: Comment[];

@OneToMany(() => Like, (like) => like.post)
likes: Like[];

@ManyToMany(() => Category, (category) => category.posts)
categories: Category[]

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
created: Date;
}