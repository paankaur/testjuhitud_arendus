import TodoModel from "../models/todo.model.js";

const createTodo = async (req, res, next) => {
    try {
  const createdModel = await TodoModel.create(req.body);
  res.status(201).json(createdModel);
} catch (error) {
  next(error);
}
};

export { createTodo };
