import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Announcement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({ default: true })
    isActive: boolean;
}
