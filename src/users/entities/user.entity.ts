import { Bookmark } from "src/bookmark/entities/bookmark.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Follower } from "src/followers/entities/follower.entity";
import { Like } from "src/like/entities/like.entity";
import { Post } from "src/posts/entities/post.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Vote } from "src/vote/entities/vote.entity";
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

    @OneToMany(() => Vote, (votes) => votes.user)
    votes: Vote[];

    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true})
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Follower, (follower) => follower.following, { cascade: true})
    followers: Follower[];

    @OneToMany(() => Follower, (follower) => follower.follower, { cascade: true})
    following: Follower[];

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmarks: Bookmark[];

    @Column({ default: 'active'})
    status: string;

    @Column({ default: ''})
    reason: string;

    @CreateDateColumn()
    createdAt: Date;
}