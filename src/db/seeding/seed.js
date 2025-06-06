const mongoose = require("mongoose");
const { Item } = require("../../app/models/item.model.js");
const { User } = require("../../app/models/user.model.js");
const { Brand } = require("../../app/models/brand.model.js");
const { Location } = require("../../app/models/location.model.js");
const { Colour } = require("../../app/models/colour.model.js");
const connectDB = require("../connection.js");
const ENV = process.env.NODE_ENV || "development";
const users = require(`../data/${ENV}-data/users.js`);
const generateItems = require(`../data/${ENV}-data/items.js`);
const brands = require(`../data/${ENV}-data/brands.js`);
const locations = require(`../data/${ENV}-data/locations.js`);
const colours = require(`../data/${ENV}-data/colours.js`);

async function setupDB() {
  await connectDB();

  try {
    await User.deleteMany({});
    await Item.deleteMany({});
    await Brand.deleteMany({});
    await Location.deleteMany({});
    await Colour.deleteMany({});

    const brandTable = await Brand.insertMany(brands);
    const userTable = await User.insertMany(users);
    const locationTable = await Location.insertMany(locations);

    const items = await generateItems(userTable, brandTable, locationTable);

    await Item.insertMany(items);

    await Colour.insertMany(colours.map((colour) => ({ colour })));

    const seededItems = await Item.find()
      .populate("author", "username")
      .populate("brand", "brand_name")
      .populate("location", "location_name");
  } catch (err) {
    console.error("❌ Seeding error:", err);
    throw err;
  }
}

if (require.main === module) {
  setupDB().finally(() => mongoose.connection.close());
}

module.exports = setupDB;
