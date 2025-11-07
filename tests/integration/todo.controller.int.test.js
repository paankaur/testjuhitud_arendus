import supertest from "supertest";
import app from "../../app.js";
//const app = await import("../../app.js").then(module => module.default);
import TodoModel from "../../models/todo.model.js";
import newTodo from "../mock-data/new-todo.json";

const endpointUrl = "/todos/";

describe(endpointUrl, () => {
    it("POST " + endpointUrl, async () => {
        const response = await supertest(app)
            .post(endpointUrl)
            .send(newTodo);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.completed).toBe(newTodo.completed);
    });
});
