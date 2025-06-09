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

describe("POST /api/items/:itemId/QandA", () => {
  test("201: successfully adds questions to a newly created item", async () => {
    // First create a new item using the API
    const newItem = {
      item_name: "TEST_NEW_ITEM",
      author: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId(),
      description: "Test item for Q&A",
      location: new mongoose.Types.ObjectId(),
      found: true,
      lost: false,
    };

    const createdItemRes = await request(app)
      .post("/api/items")
      .send(newItem)
      .expect(201);

    const newQuestion = "valid testing question";

    const res = await request(app)
      .post(`/api/items/${createdItemRes.body.newItem._id}/QandA`)
      .send({ question: newQuestion })
      .expect(201);

    expect(res.body.questionAndAnswerPairs).toBeInstanceOf(Array);
    expect(res.body.questionAndAnswerPairs.length).toBe(1); // Should have one question
    expect(res.body.questionAndAnswerPairs[0]).toEqual({
      question: newQuestion,
      answer: "",
    });
  });

  test("404: returns not found if item does not exist", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .post(`/api/items/${nonExistentId}/QandA`)
      .send({ question: "valid testing question" })
      .expect(404);

    expect(res.body.msg).toBe("Item not found");
  });

  test("400: returns bad request if question is missing", async () => {
    // First create a new item using the API
    const newItem = {
      item_name: "TEST_NEW_ITEM_2",
      author: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId(),
      description: "Test item for Q&A validation",
      location: new mongoose.Types.ObjectId(),
      found: true,
      lost: false,
    };

    const createdItemRes = await request(app)
      .post("/api/items")
      .send(newItem)
      .expect(201);

    const res = await request(app)
      .post(`/api/items/${createdItemRes.body._id}/QandA`)
      .send({})
      .expect(400);

    expect(res.body.msg).toBe("Question is required");
  });
});

describe("PATCH /api/items/:itemId/QandA", () => {
  test("200: successfully updates answers for existing questions", async () => {
    const item = await Item.findOne({ item_name: "TEST_ITEM_1_WALLET" });
    const newAnswers = ["valid answer 1", "valid answer 2", "valid answer 3"];

    const res = await request(app)
      .patch(`/api/items/${item._id}/QandA`)
      .send({ answers: newAnswers })
      .expect(200);

    expect(res.body.questionAndAnswerPairs).toBeInstanceOf(Array);
    expect(res.body.questionAndAnswerPairs.length).toBe(3);
    expect(res.body.questionAndAnswerPairs[0].answer).toBe(newAnswers[0]);
    expect(res.body.questionAndAnswerPairs[1].answer).toBe(newAnswers[1]);
    expect(res.body.questionAndAnswerPairs[2].answer).toBe(newAnswers[2]);
  });

  test("404: returns not found if item does not exist", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/items/${nonExistentId}/QandA`)
      .send({ answers: ["Answer 1"] })
      .expect(404);

    expect(res.body.msg).toBe("Item not found");
  });

  test("400: returns bad request if answers array is missing", async () => {
    const item = await Item.findOne({ item_name: "TEST_ITEM_1_WALLET" });
    const res = await request(app)
      .patch(`/api/items/${item._id}/QandA`)
      .send({})
      .expect(400);

    expect(res.body.msg).toBe("Answers array is required");
  });

  test("400: returns bad request if answers array length doesn't match questions", async () => {
    const item = await Item.findOne({ item_name: "TEST_ITEM_1_WALLET" });
    const res = await request(app)
      .patch(`/api/items/${item._id}/QandA`)
      .send({ answers: ["Only one answer"] })
      .expect(400);

    expect(res.body.msg).toBe(
      "Answers array must match the number of questions"
    );
  });
});
