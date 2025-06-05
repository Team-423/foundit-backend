const request = require("supertest");
const app = require("../src/app");
const { Colour } = require("../src/app/models/colour.model.js");
const seedDB = require("../src/db/seeding/seed.js"); 

describe("GET /api/items/colours", () => {
  beforeAll(async () => {
    await seedDB();
  });

  test("200: responds with an array of all colours", async () => {
    const res = await request(app).get("/api/items/colours").expect(200);
    expect(res.body).toHaveProperty("colours");
    expect(Array.isArray(res.body.colours)).toBe(true);
    expect(res.body.colours.length).toBeGreaterThan(0);
  });
});