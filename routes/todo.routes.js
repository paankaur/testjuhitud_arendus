

import express from 'express';
import { createTodo } from '../controllers/todo.controller.js';

const router = express.Router();
router.post('/', createTodo);

export default router;
