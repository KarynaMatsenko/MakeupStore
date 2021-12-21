import { Request, Response } from "express";
import { Brand } from '../models';

class BrandController {
    public async create(req: Request, res: Response) {
        const { name } = req.body;
        const newBrand = new Brand();
        newBrand.name = name;
        const brand = await Brand.save(newBrand);
        return res.json(brand);
    }

    public async getAll(req: Request, res: Response) {
         const brands = await Brand.find();
         return res.json(brands);
    }

}

export default new BrandController();