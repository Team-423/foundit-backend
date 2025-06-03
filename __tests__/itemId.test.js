const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed");
const Item = require("../src/app/models/items.js");

beforeEach(async () => {
  await setupDB();
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /items/:item_id", () => {
  test("200: Responds with a single item when given a valid id", async () => {
    const testItems = await Item.find();
    const itemId = testItems[0]._id.toString();

    return request(app)
      .get(`/api/items/${itemId}`)
      .expect(200)
      .then(({ body }) => {
        const item = body.itemById;
        expect(item).toHaveProperty("_id", itemId);
        expect(item).toHaveProperty("item_name");
        expect(item).toHaveProperty("description");
        expect(item).toHaveProperty("category");
        expect(item).toHaveProperty("location");
        expect(item).toHaveProperty("colour");
        expect(item).toHaveProperty("size");
        expect(item).toHaveProperty("brand");
        expect(item).toHaveProperty("material");
        expect(item).toHaveProperty("resolved");
        expect(item).toHaveProperty("found");
        expect(item).toHaveProperty("lost");
      });
  });

  test("404: When ID is valid but item doesn't exist", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const { body } = await request(app)
      .get(`/api/items/${nonExistentId}`)
      .expect(404);
    expect(body).toEqual({ msg: "Item not found" });
  });

  test("400: Responds with invalid item format when given invalid item format", async () => {
    const invalidIdFormat = "notavalidid";
    const { body } = await request(app)
      .get(`/api/items/${invalidIdFormat}`)
      .expect(400);
    expect(body).toEqual({ msg: "Bad request: invalid format" });
  });
});
