const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");
const { Location } = require("../src/app/models/location.model.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("GET /api/items/locations", () => {
  test("200: Responds with an array of all locations listed", () => {
    return request(app)
      .get("/api/items/locations")
      .expect(200)
      .then(({ body }) => {
        const locations = body.locations;
        expect(locations.length).toBeGreaterThan(0);
        locations.forEach((location) => {
          expect(location).toMatchObject({
            _id: expect.any(String),
            location_name: expect.any(String),
          });
        });
      });
  });
});
