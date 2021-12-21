import { v4 } from 'uuid';
import path from 'path';
import { Basket, BasketProduct, Product, ProductInfo } from '../models';
import ApiError from '../error/ApiError';
import { NextFunction, Request, Response } from "express";

class ProductController {
    public async create(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files as any;
            console.log(v4);
            let fileName = v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', '../static', fileName));
            const newProduct = new Product();
            newProduct.name = name;
            newProduct.price = price;
            newProduct.brandId = brandId;
            newProduct.typeId = typeId;
            newProduct.img = fileName;
            const product = await Product.save(newProduct);

            if (info) {
                info = JSON.parse(info);
                (info as any[]).forEach(i => {
                    const newInfo = new ProductInfo();
                    newInfo.title = i.title;
                    newInfo.description = i.description;
                    newInfo.productId = (product as any).id;
                    ProductInfo.save(newInfo);
                });
            }

            return res.json(product);
        } catch (e: any) {
            console.log(e);
            next(ApiError.badRequest(e.message));
        }

    }

    public async getAll(req: Request, res: Response) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || '1';
        limit = limit || '9';
        limit = Number.parseInt(limit as string) as unknown as string;
        let offset = (page as any) * (limit as any) - (limit as any);
        let products;
        if (!brandId && !typeId) {
            products = await Product.find({ take: (limit as any), skip: offset });
        }
        if (brandId && !typeId) {
            products = await Product.find({ where: { brandId }, take: (limit as any), skip: offset });
        }
        if (!brandId && typeId) {
            products = await Product.find({ where: { typeId }, take: (limit as any), skip: offset });
        }
        if (brandId && typeId) {
            products = await Product.find({ where: { typeId, brandId }, take: (limit as any), skip: offset });
        }
        return res.json(products);
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const basketProduct = await BasketProduct.findOne({ basketId: (req as any).user.id, productId: id as any });
        const product = await Product.findOne({
            where: {
                id,
            },
            relations: ['info'],
            // include: [{ model: ProductInfo, as: 'info' }],
        })
        return res.json({ ...product, isInBasket: basketProduct !== undefined });
    }
}

export default new ProductController();