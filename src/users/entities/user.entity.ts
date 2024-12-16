import { Comment } from "src/comment/entities/comment.entity";
import { Like } from "src/like/entities/like.entity";
import { Post } from "src/posts/entities/post.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'varchar', length: 50, default: 'user'})
    role: string;

    @Column({ nullable: true }) 
    refreshToken?: string;

    @Column({ nullable: true })
    profileId: number; 

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Like, (likes) => likes.user)
    likes: Like[];

    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true})
    @JoinColumn()
    profile: Profile;
 
    @CreateDateColumn()
    createdAt: Date;
}