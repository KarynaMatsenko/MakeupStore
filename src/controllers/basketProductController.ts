import { Request, Response } from "express";
import { BasketProduct } from '../models';

class BasketProductController {
    public async create(req: Request, res: Response) {
        const { productId } = req.body;
        const newBasketProduct = new BasketProduct();
        newBasketProduct.productId = productId;
        newBasketProduct.basketId = (req as any).user.id;
        const brand = await BasketProduct.save(newBasketProduct);
        return res.json(brand);
    }

    public async getAll(req: Request, res: Response) {
        const basketProducts = await BasketProduct.find({ relations: ['product'] });
        return res.json(basketProducts);
    }

}

export default new BasketProductController();