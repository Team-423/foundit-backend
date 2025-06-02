const mongoose = require("mongoose");
const Item = require("./db/models/items.js");
const User = require("./db/models/users.js");
const connectDB = require("./connection.js");

async function setupDB() {
  await connectDB();

  try {
    await User.deleteMany({});
    await Item.deleteMany({});

    const createdUser = await User.create({
      username: "johndoe",
      email: "johndoe@example.com",
      points: 120,
    });

    const users = [
      {
        username: "janesmith",
        email: "janesmith@example.com",
        points: 250,
      },
      {
        username: "techguy99",
        email: "techguy99@example.net",
        points: 75,
      },
      {
        username: "bookworm21",
        email: "bookworm21@example.org",
        points: 340,
      },
    ];

    await User.insertMany(users);
    const items = [
      {
        item_name: "Black Wallet",
        author: createdUser._id,
        category: "Accessories",
        description: "Leather wallet containing ID and credit cards",
        created_at: new Date("2025-05-01T10:30:00Z"),
        location: "Central Library",
        colour: "Black",
        size: "Small",
        brand: "Fossil",
        material: "Leather",
        resolved: false,
        found: false,
        lost: true,
      },
      {
        item_name: "Silver iPhone 13",
        author: createdUser._id,
        category: "Electronics",
        description: "Phone with cracked screen and red case",
        created_at: new Date("2025-04-20T14:45:00Z"),
        location: "Campus Cafeteria",
        colour: "Silver",
        size: "Medium",
        brand: "Apple",
        material: "Metal/Glass",
        resolved: true,
        found: true,
        lost: false,
      },
      {
        item_name: "Blue Umbrella",
        author: createdUser._id,
        category: "Accessories",
        description: "Compact foldable umbrella with floral pattern",
        created_at: new Date("2025-03-28T09:15:00Z"),
        location: "Building A Lobby",
        colour: "Blue",
        size: "Medium",
        brand: "Totes",
        material: "Nylon",
        resolved: false,
        found: true,
        lost: false,
      },
      {
        item_name: "Red Backpack",
        author: createdUser._id,
        category: "Bags",
        description: "Red Nike backpack with gym clothes and water bottle",
        created_at: new Date("2025-05-15T08:00:00Z"),
        location: "Gym",
        colour: "Red",
        size: "Large",
        brand: "Nike",
        material: "Polyester",
        resolved: false,
        found: false,
        lost: true,
      },
      {
        item_name: "Gold Ring",
        author: createdUser._id,
        category: "Jewelry",
        description: "Simple gold band with initials engraved inside",
        created_at: new Date("2025-04-01T13:20:00Z"),
        location: "Restroom near Cafeteria",
        colour: "Gold",
        size: "Small",
        brand: "Unknown",
        material: "Gold",
        resolved: true,
        found: true,
        lost: false,
      },
    ];

    await Item.insertMany(items);
    const item = await Item.findOne({ item_name: "Black Wallet" }).populate(
      "author"
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

if (require.main === module) {
  setupDB().finally(() => mongoose.connection.close());
}

module.exports = setupDB;
