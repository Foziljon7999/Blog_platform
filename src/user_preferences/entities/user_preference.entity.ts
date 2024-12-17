import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserPreference {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ default: 'light'})
    theme: string;
}
