const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("GET /api/items/brands", () => {
  test("200: Responds with an array of all brands listed", () => {
    return request(app)
      .get("/api/items/brands")
      .expect(200)
      .then(({ body }) => {
        const brands = body.brands;
        expect(brands.length).toBeGreaterThan(0);
        brands.forEach((brand) => {
          expect(brand).toMatchObject({
            _id: expect.any(String),
            brand_name: expect.any(String),
          });
        });
      });
  });
});
