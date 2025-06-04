const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");
const { Item } = require("../src/app/models/items.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("GET /items/:item_id", () => {
  test("200: Responds with a single item when given a valid id", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();

      return request(app)
        .get(`/api/items/${itemId}`)
        .expect(200)
        .then(({ body }) => {
          const item = body.itemById;

          expect(item).toMatchObject({
            _id: itemId,
            item_name: expect.any(String),
            description: expect.any(String),
            category: expect.any(String),
            location: expect.any(String),
            colour: expect.any(String),
            size: expect.any(String),
            brand: expect.any(String),
            material: expect.any(String),
            resolved: expect.any(Boolean),
            found: expect.any(Boolean),
            lost: expect.any(Boolean),
          });
        });
    });
  });

  test("404: When ID is valid but item doesn't exist", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    // will log: "new ObjectId('683f62a3190bb5bc3512af25')" if toString() not applied
    return request(app)
      .get(`/api/items/${nonExistentId}`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Item not found!" });
      });
  });

  test("400: Responds with 'Bad request: invalid format!' when given invalid item format", async () => {
    const invalidIdFormat = "notavalidid";

    return request(app)
      .get(`/api/items/${invalidIdFormat}`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad request: invalid format!" });
      });
  });
});
