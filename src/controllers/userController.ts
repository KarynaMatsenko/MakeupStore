import ApiError from "../error/ApiError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { NextFunction, Request, Response } from "express";
import Basket from "../models/Basket";
const generateJwt = (id: number, email: string, role: string) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY as string,
        { expiresIn: '24h' },
    )
}

class UserController {
    public async registration(req: Request, res: Response, next: NextFunction) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Данный email занят'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = new User();
        newUser.email = email;
        newUser.role = role;
        newUser.password = hashPassword;
        const user = await User.save(newUser);
        const newBasket = new Basket();
        newBasket.userId = user.id;
        await Basket.save(newBasket);
        const token = generateJwt((user as any).id, (user as any).email, (user as any).role);
        return res.json({ token })
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Такого позьзователя нет'));
        }
        let comparePassword = bcrypt.compareSync(password, (user as any).password);
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'));
        }
        const token = generateJwt((user as any).id, (user as any).email, (user as any).role);
        return res.json({ token });
    }

    public async check(req: Request, res: Response, next: NextFunction) {

        const token = generateJwt((req as any).user.id, (req as any).user.email, (req as any).user.role)
        return res.json({ token })
    }
}

export default new UserController();