import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import BasketProduct from "./BasketProduct";
import Rating from "./Rating";
import ProductInfo from "./ProductInfo";
import Brand from "./Brand";
import Type from "./Type";

@Entity('products')
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: 'integer' })
    price!: number;

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand!: Brand;

    @Column({ type: 'integer' })
    brandId!: number;

    @ManyToOne(() => Type, (type) => type.products)
    type!: Type;

    @Column({ type: 'integer' })
    typeId!: number;

    @Column()
    img!: string;

    @OneToMany(() => BasketProduct, (basketProduct) => basketProduct.product)
    basketProducts!: BasketProduct[];

    @OneToMany(() => Rating, (rating) => rating.product)
    ratings!: Rating[];

    @OneToMany(() => ProductInfo, (productInfo) => productInfo.product)
    info!: ProductInfo[];
}