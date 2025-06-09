const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app.js");
const setupDB = require("../src/db/seeding/seed.js");
const { model } = require("mongoose");
const Item = model("Item");

let testItemId;

beforeEach(async () => {
  await setupDB();
});

afterAll(() => mongoose.connection.close());

describe("GET /api/items/:itemId/QandA", () => {
  test("200: responds with objects including the array of questions and the array of answers", async () => {
    const item = await Item.findOne({ item_name: "TEST_ITEM_2_PHONE" });
    testItemId = item._id;
    const res = await request(app)
      .get(`/api/items/${testItemId}/QandA`)
      .expect(200);
    expect(res.body.questionAndAnswerPairs).toBeInstanceOf(Array);
    expect(res.body.questionAndAnswerPairs.length).toBe(3);
    expect(res.body.questionAndAnswerPairs[0]).toHaveProperty("question");
    expect(res.body.questionAndAnswerPairs[0]).toHaveProperty("answer");
  });

  test("404: returns not found if item exists but empty q and a array", async () => {
    // Create an item without questions/answers
    const item = await Item.create({
      item_name: "TEST_ITEM_NO_QA",
      author: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId(),
      description: "Test item without Q&A",
      location: new mongoose.Types.ObjectId(),
      found: true,
      lost: false,
      questions: [],
      answers: [],
    });

    const res = await request(app)
      .get(`/api/items/${item._id}/QandA`)
      .expect(404);
    expect(res.body.msg).toBe("Questions not found for this item");
  });
});
