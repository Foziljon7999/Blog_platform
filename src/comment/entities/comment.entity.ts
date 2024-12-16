import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
@PrimaryGeneratedColumn()
id: number;

@Column()
text: string;

@ManyToOne(() => User, (user) => user.comments)
user: User

@ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE'})
post: Post;

@CreateDateColumn()
ceatedAt: Date;
}
