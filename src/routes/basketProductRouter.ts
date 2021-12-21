import { Router } from 'express';
import basketProductController from '../controllers/basketProductController';
import authMiddleware from "../middleware/auth.Middleware";

const router = Router();

router.post('/', authMiddleware, basketProductController.create);
router.get('/', authMiddleware, basketProductController.getAll);

export default router;