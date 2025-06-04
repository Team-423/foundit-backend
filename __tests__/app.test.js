const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const endpointsJson = require("../endpoints.json");
const setupDB = require("../src/db/seeding/seed");
const User = require("../src/app/models/user.model.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("ANY /badURL", () => {
  test("404: Responds with error message when path is not found", () => {
    return request(app)
      .get("/api/notAPath")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found!");
      });
  });
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
