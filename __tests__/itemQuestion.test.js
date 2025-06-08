const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const setupDB = require("../src/db/seeding/seed.js"); 
const ItemQuestion  = require("../src/app/models/itemQuestion.model.js")

beforeEach(() => setupDB());
afterAll(() => mongoose.connection.close());

describe("GET /api/items/:itemId/questions", () => {
  test("200: responds with an array of questions for a valid item", async () => {
    const itemId = "60f8d9987d2a4c1a88e6f9b2"; 
    const res = await request(app).get(`/api/items/${itemId}/questions`).expect(200);
    expect(res.body.questions).toBeInstanceOf(Array);
    expect(res.body.questions.length).toBe(3);
  });

  test("404: returns not found if item has no questions", async () => {
    const fakeId = "ldfnvdls;kfnsd";
    const res = await request(app).get(`/api/items/${fakeId}/questions`).expect(404);
    expect(res.body.msg).toBe("Questions not found for this item");
  });
});