import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Rating from './Rating';
import Basket from "./Basket";

@Entity('users')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: 'USER' })
    role!: string;

    @OneToMany(() => Basket, (basket) => basket.user)
    baskets!: Basket[];

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings!: Rating[];
}