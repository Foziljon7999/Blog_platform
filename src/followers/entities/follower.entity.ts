import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('followers') 
export class Follower {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE'})
    follower: User;

    @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE'})
    following: User;
}
