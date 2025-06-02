const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const endpointsJson = require("../endpoints.json");
const setupDB = require("../src/index");

beforeEach(async () => {
  await setupDB();
});
afterAll(async () => {
  await mongoose.connection.close();
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
