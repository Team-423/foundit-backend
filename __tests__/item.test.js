const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");
const { Item } = require("../src/app/models/item.model.js");
const { User } = require("../src/app/models/user.model.js");

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
  test("404: When ID is valid but item doesn't exist", () => {
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
            category: "TEST_ACCESSORY",
            description: "Test description for item 1",
            location: "TEST_LOCATION_1",
            colour: "TestBlack",
            size: "TestSmall",
            brand: "TestBrand1",
            material: "TestMaterial1",
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
        item_name: "test_item",
        author: testUser._id,
        category: "test_category",
        description: "test_description",
        created_at: "2025-05-01T10:30:00.000Z",
        location: "test_location",
        colour: "test_colour",
        size: "test_size",
        brand: "test_brand",
        material: "test_material",
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
            item_name: "test_item",
            author: testUser._id.toString(),
            category: "test_category",
            description: "test_description",
            location: "test_location",
            colour: "test_colour",
            size: "test_size",
            brand: "test_brand",
            material: "test_material",
            resolved: false,
            found: false,
            lost: true,
          });
        });
    });
  });
  test("400: Item posted is missing two required fields - 'category' & 'location'", () => {
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

describe("DELETE /api/items/:itemId", () => {
  test("204: deletes an item when given a valid id", async () => {
    const testItem = await Item.findOne();
    const itemId = testItem._id.toString();
    await request(app).delete(`/api/items/${itemId}`).expect(204);
    const check = await Item.findById(itemId);
    expect(check).toBeNull();
  });
  test("404: returns not found when deleting non-existent items", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    return request(app)
      .delete(`/api/items/${nonExistentId}`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Item not found!" });
      });
  });
  test("400: returns bad request for invalid ID", async () => {
    return request(app)
      .delete("/api/items/invalidIdFormat")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad request: invalid format!" });
      });
  });
});

describe("GET /api/items/categories", () => {
  test("200: Responds with an array of all available categories", async () => {
    const { body } = await request(app)
      .get("/api/items/categories")
      .expect(200);

    expect(body).toHaveProperty("categories");
    expect(Array.isArray(body.categories)).toBe(true);
    expect(body.categories.length).toBeGreaterThan(0);

    body.categories.forEach((category) => {
      expect(typeof category).toBe("string");
      expect(category.length).toBeGreaterThan(0);
    });

    expect(body.categories).toEqual(
      expect.arrayContaining([
        "Accessories",
        "Electronics",
        "Bags",
        "Jewelry",
        "Clothing",
        "Keys",
        "Other",
      ])
    );
    expect(body.categories.sort()).toEqual(
      [
        "Accessories",
        "Bags",
        "Clothing",
        "Electronics",
        "Jewelry",
        "Keys",
        "Other",
      ].sort()
    );
  });

  test("200: Responds with an array where all categories are unique", async () => {
    const { body } = await request(app)
      .get("/api/items/categories")
      .expect(200);

    const categories = body.categories;
    const uniqueCategories = new Set(categories);
    expect(uniqueCategories.size).toBe(categories.length);
  });

  test("200: Responds with an array of categories sorted alphabetically", async () => {
    const { body } = await request(app)
      .get("/api/items/categories")
      .expect(200);

    const categories = body.categories;
    const sortedCategories = [...categories].sort();
    expect(categories).toEqual(sortedCategories);
  });

  test("404: Responds with 'Path not found' for unsupported methods on this endpoint", async () => {
    const { body } = await request(app)
      .post("/api/items/categories")
      .expect(404);
    expect(body).toEqual({ msg: "Path not found" });

    const { body: patchBody } = await request(app)
      .patch("/api/items/categories")
      .send({})
      .expect(404);
    expect(patchBody).toEqual({ msg: "Path not found" });
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
