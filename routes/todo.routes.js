import express from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:todoId", getTodoById);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

export default router;
