
import TodoModel from '../models/todo.model.js';

const createTodo = (req, res, next) => {
    const createdModel = TodoModel.create(req.body);
    res.status(201).json(createdModel);
};

export { createTodo };