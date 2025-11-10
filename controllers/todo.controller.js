import TodoModel from "../models/todo.model.js";

const createTodo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};
const getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (error) {
    next(error);
  }
};
const getTodoById = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const todo = await TodoModel.findById(todoId);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    next(error);
  }
};

export { createTodo, getTodos, getTodoById };
