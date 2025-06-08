const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("GET /api/items/categories", () => {
  test("200: Responds with an array of all available categories", async () => {
    const { body } = await request(app)
      .get("/api/items/categories")
      .expect(200);

    expect(body).toHaveProperty("categories");
    expect(Array.isArray(body.categories)).toBe(true);
    expect(body.categories.length).toBeGreaterThan(0);

    body.categories.forEach((category) => {
      expect(typeof category).toBe("object");
    });
  });

  test("200: Responds with an array where all categories are unique", async () => {
    const { body } = await request(app)
      .get("/api/items/categories")
      .expect(200);

    const categories = body.categories;
    const uniqueCategories = new Set(categories);
    expect(uniqueCategories.size).toBe(categories.length);
  });

  test("200: Responds with a body containing only the 'categories' property", async () => {
    const { body } = await request(app)
      .get("/api/items/categories")
      .expect(200);

    expect(Object.keys(body).length).toBe(1);
    expect(body).toHaveProperty("categories");
    expect(Array.isArray(body.categories)).toBe(true);
  });
});
