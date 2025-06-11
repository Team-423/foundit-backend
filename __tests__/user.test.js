const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed");
const { User } = require("../src/app/models/user.model.js");
const { Item } = require("../src/app/models/item.model.js");
const { Category } = require("../src/app/models/category.model.js");
const { Location } = require("../src/app/models/location.model.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("GET /api/users/:userId", () => {
  test("200: returns user by id", () => {
    return User.findOne({ username: "test_user_1" }).then((testUser) => {
      return request(app)
        .get(`/api/users/${testUser._id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.user).toBeDefined();
          expect(res.body.user.username).toBe(testUser.username);
          expect(res.body.user.email).toBe(testUser.email);
          expect(res.body.user.points).toBe(testUser.points);
        });
    });
  });
  test("404: returns error if user does not exist", () => {
    const wrongUsername = new mongoose.Types.ObjectId();
    return request(app)
      .get(`/api/users/${wrongUsername}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
  test("400: returns error if userId is invalid", () => {
    return request(app)
      .get("/api/users/invalid-Id")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid user ID");
      });
  });
});

describe("PATCH /api/users/:userId", () => {
  test("200: Responds with the updated user fields for valid userId", () => {
    return User.find().then((users) => {
      const userId = users[0]._id.toString();
      const patchBody = {
        username: "UpdatedName",
        email: "updated@email.com",
        img_url: "http://example.com/img.png",
        points: 150,
      };

      return request(app)
        .patch(`/api/users/${userId}`)
        .send(patchBody)
        .expect(200)
        .then(({ body }) => {
          const user = body.user;
          expect(user).toMatchObject({
            _id: userId,
            username: "UpdatedName",
            email: "updated@email.com",
            img_url: "http://example.com/img.png",
            points: 150,
          });
        });
    });
  });

  test("200: Responds with same user but with one field updated", () => {
    return User.find().then((users) => {
      const userId = users[0]._id.toString();
      const patchBody = {
        username: "OnlyUsernameChanged",
      };

      return request(app)
        .patch(`/api/users/${userId}`)
        .send(patchBody)
        .expect(200)
        .then(({ body }) => {
          const user = body.user;
          expect(user.username).toBe("OnlyUsernameChanged");
        });
    });
  });

  test("404: Valid userId but user does not exist", () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const patchBody = {
      username: "GhostUser",
    };

    return request(app)
      .patch(`/api/users/${fakeId}`)
      .send(patchBody)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found!");
      });
  });

  test("400: Invalid userId format", () => {
    const patchBody = {
      username: "InvalidIDUser",
    };

    return request(app)
      .patch(`/api/users/notAValidId`)
      .send(patchBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid user ID");
      });
  });

  test("400: Invalid username (not a string)", () => {
    return User.find().then((users) => {
      const userId = users[0]._id.toString();
      const patchBody = {
        username: 123,
      };

      return request(app)
        .patch(`/api/users/${userId}`)
        .send(patchBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request: invalid format!");
        });
    });
  });

  test("400: Invalid email (not a string)", () => {
    return User.find().then((users) => {
      const userId = users[0]._id.toString();
      const patchBody = {
        email: 999,
      };

      return request(app)
        .patch(`/api/users/${userId}`)
        .send(patchBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request: invalid format!");
        });
    });
  });

  test("400: Invalid img_url (not a string)", () => {
    return User.find().then((users) => {
      const userId = users[0]._id.toString();
      const patchBody = {
        img_url: 123,
      };

      return request(app)
        .patch(`/api/users/${userId}`)
        .send(patchBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request: invalid format!");
        });
    });
  });

  test("400: Invalid points (not a number)", () => {
    return User.find().then((users) => {
      const userId = users[0]._id.toString();
      const patchBody = {
        points: "lots",
      };

      return request(app)
        .patch(`/api/users/${userId}`)
        .send(patchBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request: invalid format!");
        });
    });
  });
});

describe("GET /api/users/:userId/items", () => {
  test("200: returns items for a valid userId", async () => {
    const testUser = await User.create({
      username: "test_user_1",
      email: "test1@example.com",
    });
    const testCategories = await Category.find();
    const testCategory = testCategories[0]._id;
    const testLocations = await Location.find();
    const testLocation = testLocations[0]._id;

    await Item.insertMany([
      {
        item_name: "Lost Key",
        category: testCategory,
        description: "A silver key",
        location: testLocation,
        found: false,
        lost: true,
        author: testUser._id,
      },
      {
        item_name: "Found Wallet",
        category: testCategory,
        description: "A black leather wallet",
        location: testLocation,
        found: true,
        lost: false,
        author: testUser._id,
      },
    ]);

    const res = await request(app)
      .get(`/api/users/${testUser._id}/items`)
      .expect(200);

    expect(res.body.items).toBeDefined();
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items).toHaveLength(2);
    res.body.items.forEach((item) => {
      expect(item.author._id.toString()).toBe(testUser._id.toString());
      expect(item).toHaveProperty("item_name");
      expect(item).toHaveProperty("category");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("location");
      expect(item).toHaveProperty("found");
      expect(item).toHaveProperty("lost");
    });
  });

  test("404: returns error if no items exist for the user", () => {
    return User.findOne({ username: "test_user_1" }).then((testUser) => {
      return Item.deleteMany({ author: testUser._id }).then(() => {
        return request(app)
          .get(`/api/users/${testUser._id}/items`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("No items found for this user!");
          });
      });
    });
  });

  test("400: returns error if userId is invalid", () => {
    return request(app)
      .get("/api/users/invalid-Id/items")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: invalid user ID!");
      });
  });
});

describe("GET /api/users/:userId/points", () => {
  test.only("200: Increments points correctly", async () => {
  const user = await User.create({
    username: "point_tester",
    email: "pt@example.com",
    points: 100
  });

  const patchBody = { points: 110 }; 

  const res = await request(app)
    .patch(`/api/users/${user._id}`)
    .send(patchBody)
    .expect(200);

  expect(res.body.user.points).toBe(110);
});
})
