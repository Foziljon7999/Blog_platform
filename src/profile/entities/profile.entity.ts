import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ nullable: true })
    bio: string;

    @ManyToOne(() => User, (user) => user.profile, { nullable: false})
    @JoinColumn({ name: 'userId'})
    user: User;

    @Column()
    userId: number;
}
