
import TodoModel from '../models/todo.model.js';

const createTodo = async (req, res, next) => {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
};

export { createTodo };