import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        (req as any).user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" });
    }
};