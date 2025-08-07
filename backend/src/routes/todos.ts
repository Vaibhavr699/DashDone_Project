import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

router.use(authMiddleware);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;