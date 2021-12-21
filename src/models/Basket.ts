import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";
import {BasketProduct} from "./index";

@Entity('baskets')
export default class Basket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => BasketProduct, (basketProduct) => basketProduct.basket)
    basketProducts!: BasketProduct[];

    @ManyToOne(() => User, (user) => user.baskets)
    user!: User;

    @Column({ type: 'integer' })
    userId!: number;
}