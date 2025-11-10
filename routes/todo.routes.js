import express from "express";
import { createTodo, getTodos, getTodoById } from "../controllers/todo.controller.js";

const router = express.Router();
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:todoId", getTodoById);

export default router;
