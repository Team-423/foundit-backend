const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const endpointsJson = require("../endpoints.json");
const setupDB = require("../src/db/seeding/seed");
const User = require("../src/app/models/users.js")

beforeEach(async () => {
  await setupDB();
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("ANY /badURL", () => {
  test("404: Responds with error message when path is not found", () => {
    return request(app)
      .get("/api/notAPath")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found!");
      });
  });
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/users/:userId", () => {
  test("200: returns user by id", () => {
    return User.findOne({ username: "johndoe" })
    .then((testUser) => {
      return request(app).get(`/api/users/${testUser._id}`).expect(200).then((res) => {
        expect(res.body.user).toBeDefined()
        expect(res.body.user.username).toBe(testUser.username)
        expect(res.body.user.email).toBe(testUser.email)
        expect(res.body.user.points).toBe(testUser.points)
      })
    })
  });
  test("404: returns error if user does not exist", () => {
    const wrongUsername = new mongoose.Types.ObjectId()
    return request(app).get(`/api/users/${wrongUsername}`).expect(404).then(({body}) => {
      expect(body.msg).toBe("User not found")
    })
  })
    test("400: returns error if userId is invalid", () => {
    return request(app).get("/api/users/invalid-Id").expect(400).then(({body}) => {
      expect(body.msg).toBe("Invalid user ID")
    })
  })
});

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

