import * as  TodoController  from "../../controllers/todo.controller.js";
import TodoModel from "../../models/todo.model.js";
import { beforeEach, expect, jest } from '@jest/globals';
import httpMocks from "node-mocks-http";
import newTodo from "../mock-data/new-todo.json";

TodoModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});


describe("TodoController", () => {
    beforeEach(() => {
        req.body = newTodo;
    });
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  it("should call TodoModel.create", () => {
    req.body = newTodo;
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
  });

  it("should return 201 status code", async () => {
    req.body = newTodo;
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBe(true);
  });

  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toEqual(newTodo);
  });
});
