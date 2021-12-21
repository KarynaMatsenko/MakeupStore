import { Router } from 'express';
import productController from '../controllers/productController';
import authMiddleware from "../middleware/auth.Middleware";

const router = Router();

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/:id', authMiddleware, productController.getOne);

export default router;