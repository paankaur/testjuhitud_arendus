import express from "express";
import { createTodo, getTodos, getTodoById, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router();
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:todoId", getTodoById);
router.put("/:todoId", updateTodo);

export default router;
