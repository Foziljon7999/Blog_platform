import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
@PrimaryGeneratedColumn()
id: number;

@Column()
text: string;

@ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE'})
user: User

@ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE'})
post: Post;

@CreateDateColumn()
ceatedAt: Date;

@ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE'})
parent: Comment;

@OneToMany(() => Comment, (comment) => comment.parent)
replies: Comment[];

@Column({ default: 'active'})
status: string;
}
