const mongoose = require("mongoose");
const { Item } = require("../../app/models/item.model.js");
const { User } = require("../../app/models/user.model.js");
const connectDB = require("../connection.js");

const ENV = process.env.NODE_ENV || "development";
const users = require(`../data/${ENV}-data/users.js`);
const generateItems = require(`../data/${ENV}-data/items.js`);

async function setupDB() {
  await connectDB();

  try {
    await User.deleteMany({});
    await Item.deleteMany({});

    const userTable = await User.insertMany(users);
    const items = await generateItems(userTable);

    await Item.insertMany(items);

    const seededItems = await Item.find().populate("author", "username");
  } catch (err) {
    console.error("❌ Seeding error:", err);
    throw err;
  }
}

if (require.main === module) {
  setupDB().finally(() => mongoose.connection.close());
}

module.exports = setupDB;
