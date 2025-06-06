const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const setupDB = require("../src/db/seeding/seed");
const { User } = require("../src/app/models/user.model.js");

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
