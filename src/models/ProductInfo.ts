import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";

@Entity('product_infos')
export default class ProductInfo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Product, (product) => product.info)
    product!: Product;

    @Column({ type: 'integer' })
    productId!: number;
}