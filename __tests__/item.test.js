require("jest-sorted");
const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed.js");
const { Item } = require("../src/app/models/item.model.js");
const { User } = require("../src/app/models/user.model.js");
const { Brand } = require("../src/app/models/brand.model.js");
const { Location } = require("../src/app/models/location.model.js");
const { Colour } = require("../src/app/models/colour.model.js");
const { Category } = require("../src/app/models/category.model.js");

beforeEach(async () => {
  await setupDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/items", () => {
  test("200: Responds with test item 2 when filtered with item_name=phone", () => {
    return Promise.all([Category.find(), Location.find()]).then(
      ([categoryDoc, locationDoc]) => {
        const locationId = locationDoc[1]._id.toString();
        const categoryId = categoryDoc[1]._id.toString();

        return request(app)
          .get(
            `/api/items?item_name=TEST_ITEM_2_PHONE&category=${categoryId}&location=${locationId}`
          )
          .expect(200)
          .then((items) => {
            expect(items._body.length).toBeGreaterThan(0);
            items._body.forEach((item) => {
              expect(item).toMatchObject({
                item_name: expect.any(String),
                author: expect.any(Object),
                category: expect.any(Object),
                description: expect.any(String),
                created_at: expect.any(String),
                location: expect.any(Object),
                brand: expect.any(Object),
                found: expect.any(Boolean),
                lost: expect.any(Boolean),
                address: expect.any(String),
                coordinates: {
                  lat: expect.any(Number),
                  lng: expect.any(Number),
                },
                questions: expect.any(Array),
                answers: expect.any(Array),
              });
            });

            expect(items._body[0]).toMatchObject({
              item_name: "TEST_ITEM_2_PHONE",
              description: "Test description for item 2",
              size: "TestMedium",
              material: "TestMaterial2",
              img_url: "test_item_img_url2",
              address: "2 Test Street, Birmingham",
              coordinates: {
                lat: 52.4862,
                lng: -1.8904,
              },
            });
          });
      }
    );
  });
  test("200: Responds with test item 3 when filtered with category=TEST_ACCESSORY", () => {
    return Promise.all([
      Category.find(),
      Location.findOne({ location_name: "TEST_LOCATION_3" }),
    ]).then(([categoryDoc, locationDoc]) => {
      const locationId = locationDoc._id.toString();
      const categoryId = categoryDoc[2]._id.toString();

      return request(app)
        .get(
          `/api/items?item_name=umbrella&location=${locationId}&category=${categoryId}`
        )
        .expect(200)
        .then((items) => {
          expect(items._body[0]).toMatchObject({
            item_name: "TEST_ITEM_3_UMBRELLA",
            category: expect.any(Object),
            description: "Test description for item 3",
            location: expect.any(Object),
            colour: expect.any(Object),
            size: "TestMedium",
            brand: expect.any(Object),
            material: "TestMaterial3",
            img_url: "test_item_img_url3",
            resolved: false,
            found: true,
            lost: false,
            address: expect.any(String),
            coordinates: {
              lat: expect.any(Number),
              lng: expect.any(Number),
            },
          });
        });
    });
  });
  test("200: Responds with test 3 when filtered with material=MATERIAL3", () => {
    return Promise.all([
      Category.find(),
      Location.findOne({ location_name: "TEST_LOCATION_3" }),
    ]).then(([categoryDoc, locationDoc]) => {
      const locationId = locationDoc._id.toString();
      const categoryId = categoryDoc[2]._id.toString();

      return request(app)
        .get(
          `/api/items?item_name=umbrella&location=${locationId}&category=${categoryId}&material=MATERIAL3`
        )
        .expect(200)
        .then((items) => {
          expect(items._body[0]).toEqual(
            expect.objectContaining({
              item_name: "TEST_ITEM_3_UMBRELLA",
              category: expect.any(Object),
              description: "Test description for item 3",
              location: expect.any(Object),
              colour: expect.any(Object),
              size: "TestMedium",
              material: "TestMaterial3",
              img_url: "test_item_img_url3",
              resolved: false,
              found: true,
              lost: false,
              address: expect.any(String),
              coordinates: {
                _id: expect.any(String),
                lat: expect.any(Number),
                lng: expect.any(Number),
              },
            })
          );
        });
    });
  });
  test("200: Responds with 2 items when filtered with just the minimum queries", () => {
    return Promise.all([
      Category.find(),
      Location.findOne({ location_name: "TEST_LOCATION_5" }),
    ]).then(([categoryDoc, locationDoc]) => {
      const locationId = locationDoc._id.toString();
      const categoryId = categoryDoc[2]._id.toString();

      return request(app)
        .get(
          `/api/items?item_name=ring&location=${locationId}&category=${categoryId}`
        )
        .expect(200)
        .then((items) => {
          expect(items.body.length).toBe(2);
          items.body.forEach((item) => {
            expect(item.colour.colour).toBe("Test_colour_5");
            expect(item.category.category_name).toBe("Test_category_5");
          });
        });
    });
  });
});

test("404: Responds with no results if item_name has no match", () => {
  return Promise.all([
    Category.find(),
    Location.findOne({ location_name: "TEST_LOCATION_3" }),
  ]).then(([categoryDoc, locationDoc]) => {
    const locationId = locationDoc._id.toString();
    const categoryId = categoryDoc[2]._id.toString();

    return request(app)
      .get(
        `/api/items?item_name=notAnItem&location=${locationId}&category=${categoryId}`
      )
      .expect(404)
      .then((items) => {
        expect(items.body).toEqual({ msg: "No results!" });
      });
  });
});
test("400: Responds with Missing required fields if name, location or category are missing", () => {
  return request(app)
    .get("/api/items?item_name=umbrella&category=TEST_ACCESSORY")
    .expect(400)
    .then((items) => {
      expect(items.body).toEqual({ msg: "Missing required fields" });
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
            category: expect.any(Object),
            location: expect.any(Object),
            colour: expect.any(Object),
            size: expect.any(String),
            material: expect.any(String),
            resolved: expect.any(Boolean),
            found: expect.any(Boolean),
            lost: expect.any(Boolean),
            address: expect.any(String),
            coordinates: {
              lat: expect.any(Number),
              lng: expect.any(Number),
            },
            questions: expect.any(Array),
            answers: expect.any(Array),
          });
          expect(typeof item.brand === "string" || item.brand === null);
        });
    });
  });
  test("404: When ID is valid but item doesn't exist", () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

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
    return Promise.all([
      Item.find(),
      Brand.find(),
      Colour.find(),
      Location.find(),
      Category.find(),
    ]).then(([testItems, testBrands, colourDoc, locationDoc, categoryDoc]) => {
      const itemId = testItems[0]._id.toString();
      const brandId = testBrands[0]._id.toString();
      const colourId = colourDoc[0]._id.toString();
      const locationId = locationDoc[0]._id.toString();
      const categoryId = categoryDoc[0]._id.toString();

      const patchBody = {
        item_name: "iphone",
        category: categoryId,
        description: "iphone 16 with a phone case",
        location: locationId,
        colour: colourId,
        size: "small",
        material: "Metal and Glass",
        brand: brandId,
        address: "Updated address",
        coordinates: {
          lat: 51.5,
          lng: -0.1,
        },
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
            category: categoryId,
            description: "iphone 16 with a phone case",
            location: locationId,
            colour: colourId,
            size: "small",
            material: "Metal and Glass",
            brand: brandId,
            resolved: expect.any(Boolean),
            found: expect.any(Boolean),
            lost: expect.any(Boolean),
            address: "Updated address",
            coordinates: {
              lat: 51.5,
              lng: -0.1,
            },
            questions: expect.any(Array),
            answers: expect.any(Array),
          });
        });
    });
  });
  test("200: Responds with the same information but only one updated property", () => {
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
            category: expect.any(String),
            description: "Test description for item 1",
            colour: expect.any(String),
            size: "TestSmall",
            material: "TestMaterial1",
            resolved: expect.any(Boolean),
            found: expect.any(Boolean),
            lost: expect.any(Boolean),
            questions: expect.any(Array),
            answers: expect.any(Array),
          });
          expect(typeof item.brand === "string" || item.brand === null);
          expect(typeof item.location === "string" || item.location === null);
        });
    });
  });
  test("404: when passed a valid item_id but does not exist in the db", () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    return Promise.all([Colour.find(), Location.find(), Category.find()]).then(
      ([colourDoc, locationDoc, categoryDoc]) => {
        const colourId = colourDoc[0]._id.toString();
        const locationId = locationDoc[0]._id.toString();
        const categoryId = categoryDoc[0]._id.toString();

        const patchBody = {
          item_name: "iphone",
          category: categoryId,
          description: "iphone 16 with a phone case",
          location: locationId,
          colour: colourId,
          size: "small",
          material: "Metal and Glass",
        };

        return request(app)
          .patch(`/api/items/${nonExistentId}`)
          .send(patchBody)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("Item not found!");
          });
      }
    );
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

describe("PATCH /api/items/:itemId/resolved", () => {
  test("200: Responds with patched item object with its resolved status as true", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      expect(testItems[0].resolved).toBe(false); // if resolved status is already true, test with another item
      const patchBody = {
        resolved: true,
      };
      return request(app)
        .patch(`/api/items/${itemId}/resolved`)
        .send(patchBody)
        .expect(200)
        .then(({ body }) => {
          const item = body.updatedItem;
          expect(item).toMatchObject({
            _id: itemId,
            item_name: expect.any(String),
            category: expect.any(String),
            description: expect.any(String),
            location: expect.any(String),
            colour: expect.any(String),
            size: expect.any(String),
            brand: expect.any(String),
            material: expect.any(String),
            resolved: true,
            found: expect.any(Boolean),
            lost: expect.any(Boolean),
            questions: expect.any(Array),
            answers: expect.any(Array),
          });
        });
    });
  });
  test("400: Responds with error message when the request body value is not a boolean", () => {
    return Item.find().then((testItems) => {
      const itemId = testItems[0]._id.toString();
      const patchBody = {
        resolved: 999,
      };
      return request(app)
        .patch(`/api/items/${itemId}/resolved`)
        .send(patchBody)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe(
            "Bad request: 'resolved' must be a boolean value!"
          );
        });
    });
  });
  test("400: Responds with error message when passed an invalid ID", () => {
    const patchBody = {
      resolved: true,
    };
    return request(app)
      .patch(`/api/items/notAValidID/resolved`)
      .send(patchBody)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request: invalid format!");
      });
  });
  test("404: Responds with error message when item_id is valid but does not exist in the database", () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const patchBody = {
      resolved: true,
    };
    return request(app)
      .patch(`/api/items/${nonExistentId}/resolved`)
      .send(patchBody)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Item not found!");
      });
  });
});

describe("POST /api/items", () => {
  test("201: Post a new item and responds with newly created item including address and coordinates", () => {
    return Promise.all([
      User.find(),
      Brand.find(),
      Location.find(),
      Colour.find(),
      Category.find(),
    ]).then(([users, brands, locations, colours, category]) => {
      const testUser = users[0];
      const testBrand = brands[0];
      const testLocation = locations[0];
      const testColour = colours[0];
      const testCategory = category[0];

      const testItem = {
        item_name: "test_item",
        author: testUser.username,
        category: testCategory.category_name,
        description: "test_description",
        location: testLocation.location_name,
        colour: testColour.colour,
        size: "test_size",
        brand: testBrand.brand_name,
        material: "test_material",
        resolved: false,
        found: false,
        lost: true,
        address: "100 Test Street, Manchester",
        coordinates: {
          lat: 53.4808,
          lng: -2.2426,
        },
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
            category: testCategory._id.toString(),
            description: "test_description",
            location: testLocation._id.toString(),
            colour: testColour._id.toString(),
            size: "test_size",
            material: "test_material",
            brand: testBrand._id.toString(),
            resolved: false,
            found: false,
            lost: true,
            address: "100 Test Street, Manchester",
            coordinates: {
              lat: 53.4808,
              lng: -2.2426,
            },
            questions: expect.any(Array),
            answers: expect.any(Array),
          });
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
        expect(body).toEqual({ msg: `Missing required field: category!` });
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

describe("GET /api/items/resolved", () => {
  test("200: Returns an array of all the resolved items in the db", () => {
    return request(app)
      .get("/api/items/resolved")
      .expect(200)
      .then(({ body }) => {
        const testResolvedItemsList = body.resolvedItemsList;
        expect(Array.isArray(testResolvedItemsList)).toBe(true);
        testResolvedItemsList.forEach((item) => {
          expect(item).toHaveProperty("item_name");
          expect(item).toHaveProperty("img_url");
          expect(item).toHaveProperty("resolved", true);
        });
      });
  });
  test("200: Returns array of items sorted by most recent", () => {
    return request(app)
      .get("/api/items/resolved")
      .expect(200)
      .then(({ body }) => {
        const testResolvedItemsList = body.resolvedItemsList;
        expect(testResolvedItemsList).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});
// PATCH api/items/:itemId/resolved
describe("PATCH /api/items/:itemId/resolved (points increment)", () => {
  test("200: Marking item as resolved increases author's points by 10", async () => {
    // Find a user and one of their items
    const user = await User.findOne();
    const item = await Item.create({
      item_name: "Should increase points",
      author: user._id,
      category: (await Category.findOne())._id,
      description: "Testing points",
      location: (await Location.findOne())._id,
      found: false,
      lost: true,
      resolved: false,
    });

    // Get initial points
    const userBefore = await User.findById(user._id);
    const initialPoints = userBefore.points || 0;

    // Mark item as resolved
    await request(app)
      .patch(`/api/items/${item._id}/resolved`)
      .send({ resolved: true })
      .expect(200);

    // Refetch user
    const userAfter = await User.findById(user._id);
    expect(userAfter.points).toBe(initialPoints + 10);
  });

  test("Does NOT increment points if resolved is set to false", async () => {
    const user = await User.findOne();
    const item = await Item.create({
      item_name: "Should not increase points",
      author: user._id,
      category: (await Category.findOne())._id,
      description: "Not resolved",
      location: (await Location.findOne())._id,
      found: false,
      lost: true,
      resolved: false,
    });

    const userBefore = await User.findById(user._id);
    const initialPoints = userBefore.points || 0;

    // Mark item as NOT resolved
    await request(app)
      .patch(`/api/items/${item._id}/resolved`)
      .send({ resolved: false })
      .expect(200);

    // Refetch user
    const userAfter = await User.findById(user._id);
    expect(userAfter.points).toBe(initialPoints);
  });
});
