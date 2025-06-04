const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");
const { Item } = require("../src/app/models/item.model.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

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

describe("GET /api/items/:item_id", () => {
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

describe.only("PATCH /api/items/:item_id", () => {
  test("200: Responds with the updated item properties of the selected item_id", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        item_name: "iphone",
        category: "Electronics",
        description: "iphone 16 with a phone case",
        location: "City Centre",
        colour: "Silver",
        size: "small",
        brand: "Apple",
        material: "Metal and Glass",
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(200)
        .then(({ body }) => {
          const item = body.updatedItem;
          expect(item).toMatchObject({
            _id: itemId,
            item_name: "iphone",
            category: "Electronics",
            description: "iphone 16 with a phone case",
            location: "City Centre",
            colour: "Silver",
            size: "small",
            brand: "Apple",
            material: "Metal and Glass",
            resolved: expect.any(Boolean),
            found: expect.any(Boolean),
            lost: expect.any(Boolean),
          });
        });
    });
  });
  //404: no item with the item_id
  test("404: when passed a valid item_id but does not exist in the db", () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const patchBody = {
      item_name: "iphone",
      category: "Electronics",
      description: "iphone 16 with a phone case",
      location: "City Centre",
      colour: "Silver",
      size: "small",
      brand: "Apple",
      material: "Metal and Glass",
    };
    return request(app)
      .patch(`/api/items/${nonExistentId}`)
      .send(patchBody)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Item not found!");
      });
  });
  //400: not valid item id
  //400: type error for item_name
  //400: type error for category
  //400: type error for description
  //400: type error for location
  //400: type error for colour
  //400: type error for size
  //400: type error for brand
  //400: type error for material
});
