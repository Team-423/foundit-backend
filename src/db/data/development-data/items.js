const generateDevItems = (userTable, brandTable, locationTable) => {
  const getBrandId = (brandName) => {
    const brandDoc = brandTable.find((brand) => brand.brand_name === brandName);
    return brandDoc ? brandDoc._id : null;
  };

  const getLocationId = (locationName) => {
    const locationDoc = locationTable.find(
      (location) => location.location_name === locationName
    );
    return locationDoc ? locationDoc._id : null;
  };

  return [
    {
      item_name: "Black Wallet",
      author: userTable[0]._id,
      category: "Accessories",
      description: "Leather wallet containing ID and credit cards",
      created_at: new Date("2025-05-01T10:30:00Z"),
      location: getLocationId("Manchester"),
      colour: "Black",
      size: "Small",
      brand: getBrandId("Fossil"),
      material: "Leather",
      img_url:
        "https://cdn.pixabay.com/photo/2020/03/28/13/26/wallet-4977021_1280.jpg",
      resolved: false,
      found: false,
      lost: true,
    },
    {
      item_name: "Silver iPhone 13",
      author: userTable[1]._id,
      category: "Electronics",
      description: "Phone with cracked screen and red case",
      created_at: new Date("2025-04-20T14:45:00Z"),
      location: getLocationId("Liverpool"),
      colour: "Silver",
      size: "Medium",
      brand: getBrandId("Apple"),
      material: "Metal/Glass",
      img_url:
        "https://cdn.pixabay.com/photo/2021/09/25/17/43/iphone-13-6655520_1280.jpg",
      resolved: true,
      found: true,
      lost: false,
    },
    {
      item_name: "Blue Umbrella",
      author: userTable[2]._id,
      category: "Accessories",
      description: "Compact foldable umbrella with floral pattern",
      created_at: new Date("2025-03-28T09:15:00Z"),
      location: getLocationId("Leeds"),
      colour: "Blue",
      size: "Medium",
      brand: getBrandId("Totes"),
      material: "Nylon",
      img_url:
        "https://cdn.pixabay.com/photo/2018/01/16/23/10/umbrella-3087101_1280.jpg",
      resolved: false,
      found: true,
      lost: false,
    },
    {
      item_name: "Red Backpack",
      author: userTable[3]._id,
      category: "Bags",
      description: "Red Nike backpack with gym clothes and water bottle",
      created_at: new Date("2025-05-15T08:00:00Z"),
      location: getLocationId("Sheffield"),
      colour: "Red",
      size: "Large",
      brand: getBrandId("Nike"),
      material: "Polyester",
      img_url:
        "https://cdn.pixabay.com/photo/2015/08/10/20/14/handbag-883110_1280.jpg",
      resolved: false,
      found: false,
      lost: true,
    },
    {
      item_name: "Gold Ring",
      author: userTable[0]._id,
      category: "Jewelry",
      description: "Simple gold band with initials engraved inside",
      created_at: new Date("2025-04-01T13:20:00Z"),
      location: getLocationId("Birmingham"),
      colour: "Gold",
      size: "Small",
      brand: getBrandId("Unknown"),
      material: "Gold",
      img_url:
        "https://cdn.pixabay.com/photo/2018/04/04/18/28/golden-3290604_640.jpg",
      resolved: true,
      found: true,
      lost: false,
    },
    {
      item_name: "Grey Hoodie",
      author: userTable[4]._id,
      category: "Clothing",
      description: "Grey zip-up hoodie left on lecture hall seat",
      created_at: new Date("2025-04-28T12:00:00Z"),
      location: getLocationId("Newcastle"),
      colour: "Grey",
      size: "Medium",
      brand: getBrandId("H&M"),
      material: "Cotton",
      img_url:
        "https://cdn.pixabay.com/photo/2018/04/04/18/28/golden-3290604_640.jpg",
      resolved: false,
      found: true,
      lost: false,
    },
    {
      item_name: "Wireless Earbuds",
      author: userTable[5]._id,
      category: "Electronics",
      description: "Black case containing wireless earbuds",
      created_at: new Date("2025-04-30T09:30:00Z"),
      location: getLocationId("Bristol"),
      colour: "Black",
      size: "Small",
      brand: getBrandId("Samsung"),
      material: "Plastic",
      img_url:
        "https://cdn.pixabay.com/photo/2016/03/19/23/03/handsfree-1267605_640.jpg",
      resolved: false,
      found: false,
      lost: true,
    },
    {
      item_name: "Brown Scarf",
      author: userTable[6]._id,
      category: "Clothing",
      description: "Knitted wool scarf with tassels",
      created_at: new Date("2025-05-02T17:00:00Z"),
      location: getLocationId("Nottingham"),
      colour: "Brown",
      size: "One Size",
      brand: getBrandId("Uniqlo"),
      material: "Wool",
      img_url:
        "https://cdn.pixabay.com/photo/2016/01/04/21/12/dog-1121623_640.jpg",
      resolved: true,
      found: true,
      lost: false,
    },
    {
      item_name: "Reusable Water Bottle",
      author: userTable[7]._id,
      category: "Accessories",
      description: "Blue metal bottle with 'Team NC' sticker",
      created_at: new Date("2025-04-18T08:50:00Z"),
      location: getLocationId("Coventry"),
      colour: "Blue",
      size: "Large",
      brand: getBrandId("Hydro Flask"),
      material: "Metal",
      img_url:
        "https://cdn.pixabay.com/photo/2015/08/21/00/18/water-bottle-898332_640.jpg",
      resolved: false,
      found: true,
      lost: false,
    },
    {
      item_name: "Set of Keys",
      author: userTable[8]._id,
      category: "Other",
      description: "Set of 3 keys with Manchester City keychain",
      created_at: new Date("2025-04-25T13:10:00Z"),
      location: getLocationId("York"),
      colour: "Silver",
      size: "Small",
      brand: getBrandId("Yale"),
      material: "Metal",
      img_url:
        "https://cdn.pixabay.com/photo/2017/03/16/08/35/key-2148476_640.jpg",
      resolved: false,
      found: false,
      lost: true,
    },
  ];
};

module.exports = generateDevItems;
