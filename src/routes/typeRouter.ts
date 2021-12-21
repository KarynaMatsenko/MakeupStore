import { Router } from 'express';
import typeController from '../controllers/typeController';
import checkRole from '../middleware/checkRoleMiddleware';

const router = Router()

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

export default router;
