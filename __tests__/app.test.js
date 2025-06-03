const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const endpointsJson = require("../endpoints.json");
const setupDB = require("../src/db/seeding/seed");

beforeEach(async () => {
  await setupDB();
});
afterAll(async () => {
  await mongoose.connection.close();
});

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

describe("GET /api/items", () => {
  test("200: Responds with an array of all items with required properties", () => {
    return request(app)
      .get("/api/items")
      .expect(200)
      .then((items) => {
        expect(items._body.length).toBeGreaterThan(0);
        items._body.forEach((item) => {
          expect(item).toEqual(
            expect.objectContaining({
              item_name: expect.any(String),
              author: expect.any(Object),
              category: expect.any(String),
              description: expect.any(String),
              created_at: expect.any(String),
              location: expect.any(String),
              found: expect.any(Boolean),
              lost: expect.any(Boolean),
            })
          );
        });
      });
  });
});
