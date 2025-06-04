const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");
const { Item } = require("../src/app/models/item.model.js");
const User = require("../src/app/models/user.model.js");

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

  test("400: Responds with 'Bad request: invalid format!' when given invalid item format", () => {
    const invalidIdFormat = "notavalidid";

    return request(app)
      .get(`/api/items/${invalidIdFormat}`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad request: invalid format!" });
      });
  });
});


describe("PATCH /api/items/:item_id", () => {
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
  test("200: Responds with the same infomation but only one updated property", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        item_name: "iphone",
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
            category: "Accessories",
            description: "Leather wallet containing ID and credit cards",
            location: "Central Library",
            colour: "Black",
            size: "Small",
            brand: "Fossil",
            material: "Leather",
            resolved: expect.any(Boolean),
            found: expect.any(Boolean),
            lost: expect.any(Boolean),
          });
        });
    });
  });
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
  test("400: when passed an invalid item_id", () => {
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
      .patch(`/api/items/notAValidID`)
      .send(patchBody)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request: invalid format!");
      });
  });
  test("400: when passed an invalid item_name", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        item_name: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
  test("400: when passed an invalid category", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        category: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
  test("400: when passed an invalid description", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        description: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
  test("400: when passed an invalid location", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        location: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
  test("400: when passed an invalid colour", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        colour: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
  test("400: when passed an invalid size", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        size: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
  test("400: when passed an invalid brand", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        brand: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
  test("400: when passed an invalid material", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        material: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
});

describe("POST /api/items", () => {
  test("201: Post a new item and responds with newly created item", () => {
    return User.find().then((users) => {
      const testUser = users[0];
      const testItem = {
        item_name: "test item",
        author: testUser._id,
        category: "test category",
        description: "test description",
        created_at: "2025-05-01T10:30:00.000Z",
        location: "test location",
        colour: "test color",
        size: "test size",
        brand: "test brand",
        material: "Leather",
        resolved: false,
        found: false,
        lost: true,
      };

      return request(app)
        .post("/api/items")
        .send(testItem)
        .expect(201)
        .then((result) => {
          const { newItem } = result.body;
          expect(newItem).toMatchObject({
            item_name: "test item",
            _id: expect.any(String),
            description: "test description",
            category: "test category",
            resolved: false,
          });
        });
    });
  });
  test("400:Item posted is missing a required field", () => {
    return User.find().then((users) => {
      const testUser = users[0];
      const incompleteTestItem = {
        item_name: "test item",
        author: testUser._id,
        description: "test description",
        created_at: "2025-05-01T10:30:00.000Z",
        colour: "test color",
        size: "test size",
        brand: "test brand",
        material: "Leather",
        resolved: false,
        found: false,
        lost: true,
      };
      return request(app)
        .post("/api/items")
        .send(incompleteTestItem)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Missing required fields!" });
        });
    });
  });
});
describe("DELETE /api/items/:itemId",  () => {
  test("204: deletes an item when given a valid id", async () => {
    const testItem = await Item.findOne();
    const itemId = testItem._id.toString();
    await request(app).delete(`/api/items/${itemId}`).expect(204)
    const check = await Item.findById(itemId);
  expect(check).toBeNull();
  })
  test("404: returns not found when deleting non-existent items", async () => {
     const nonExistentId = new mongoose.Types.ObjectId().toString();
    return request(app)
      .delete(`/api/items/${nonExistentId}`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Item not found!" });
      });
  })
    test("400: returns bad request for invalid ID", async () => {

    return request(app)
      .delete("/api/items/invalidIdFormat")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad request: invalid format!" });
      });
  });
})

