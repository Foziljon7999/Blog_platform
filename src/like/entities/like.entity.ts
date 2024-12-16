import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE'})
    post: Post;
}