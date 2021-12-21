import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from './Product';
import Basket from "./Basket";

@Entity('basker_products')
export default class BasketProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Basket, (basket) => basket.basketProducts)
    basket!: Basket;

    @Column({ type: 'integer' })
    basketId!: number;

    @ManyToOne(() => Product, (product) => product.basketProducts)
    product!: Product;

    @Column({ type: 'integer' })
    productId!: number;
}