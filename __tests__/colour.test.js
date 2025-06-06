const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("GET /api/items/colours", () => {
  test("200: responds with an array of all colours", async () => {
    const res = await request(app).get("/api/items/colours").expect(200);
    expect(res.body).toHaveProperty("colours");
    expect(Array.isArray(res.body.colours)).toBe(true);
    expect(res.body.colours.length).toBeGreaterThan(0);
  });
});
