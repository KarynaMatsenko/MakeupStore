import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Product from "./Product";

@Entity('rating')
export default class Rating extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'integer' })
    rate!: number;

    @ManyToOne(() => User, (user) => user.ratings)
    user!: User;

    @Column({ type: 'integer' })
    userId!: number;

    @ManyToOne(() => Product, (product) => product.ratings)
    product!: Product;

    @Column({ type: 'integer' })
    productId!: number;
}