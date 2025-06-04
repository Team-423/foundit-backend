const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed");
const User = require("../src/app/models/user.model.js");

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("GET /api/users/:userId", () => {
  test("200: returns user by id", () => {
    return User.findOne({ username: "johndoe" }).then((testUser) => {
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
