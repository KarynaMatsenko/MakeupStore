import { Type } from '../models';
import { Request, Response } from "express";

class TypeController {
    public async create(req: Request, res: Response) {
         const { name } = req.body;
         const newType = new Type();
         newType.name = name;
         const type = await Type.save(newType);
         return res.json(type);
    }

    public async getAll(req: Request, res: Response) {
         const types = await Type.find();
         return res.json(types);
    }

}

export default new TypeController();