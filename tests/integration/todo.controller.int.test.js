import supertest from "supertest";
import app from "../../app.js";
//const app = await import("../../app.js").then(module => module.default);
import TodoModel from "../../models/todo.model.js";
import newTodo from "../mock-data/new-todo.json";
import mongoose from "mongoose";

const endpointUrl = "/todos/";
let firstTodo;

describe(endpointUrl, () => {
  it("POST " + endpointUrl, async () => {
    const response = await supertest(app).post(endpointUrl).send(newTodo);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.completed).toBe(newTodo.completed);
  });

  it(
    "should return 500 on malfiormed data with POST " + endpointUrl,
    async () => {
      const response = await supertest(app)
        .post(endpointUrl)
        .send({ title: "Missing completed property" });
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({
        message:
          "Todo validation failed: completed: Path `completed` is required.",
      });
    }
  );
  it("GET " + endpointUrl, async () => {
    const response = await supertest(app).get(endpointUrl);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].completed).toBeDefined();
    firstTodo = response.body[0];
  });

  it("GET by Id " + endpointUrl + ":todoId", async () => {
    const response = await supertest(app).get(
      endpointUrl + firstTodo._id.toString()
    );
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(firstTodo._id.toString());
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.completed).toBe(firstTodo.completed);
  });

  it("GET " + endpointUrl + ":todoId with non-existing id", async () => {
    const nonExistingId = new mongoose.Types.ObjectId().toString();
    const response = await supertest(app).get(endpointUrl + nonExistingId);
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: "Todo not found" });
  });
});
