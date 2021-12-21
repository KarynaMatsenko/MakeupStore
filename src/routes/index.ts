import { Router } from 'express';
import productRouter from './productRouter';
import userRouter from './userRouter';
import brandRouter from './brandRouter';
import typeRouter from './typeRouter';
import basketProductRouter from "./basketProductRouter";

const router = Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);
router.use('/basketProduct', basketProductRouter);

export default router;
