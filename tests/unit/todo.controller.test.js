import * as TodoController from "../../controllers/todo.controller.js";
import TodoModel from "../../models/todo.model.js";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import httpMocks from "node-mocks-http";
import newTodo from "../mock-data/new-todo.json";
import allTodos from "../mock-data/all-todos.json";

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TodoController.createTodo", () => {
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

  it("should handle errors", async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("TodoController.getTodos", () => {
  it("should have a getTodos function", () => {
    expect(typeof TodoController.getTodos).toBe("function");
  });

  it("should call TodoModel.find({})", async () => {
    await TodoController.getTodos(req, res, next);
    expect(TodoModel.find).toHaveBeenCalledWith({});
  });

  it("should return 200 status code and json body", async () => {
    const todos = allTodos;
    TodoModel.find.mockReturnValue(todos);
    await TodoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBe(true);
    expect(res._getJSONData()).toEqual(todos);
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding todos" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.find.mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
