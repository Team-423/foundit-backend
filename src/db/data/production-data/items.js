const generateProdItems = (
  userTable,
  brandTable,
  locationTable,
  colourTable,
  categoryTable
) => {
  const getBrandId = (brandName) => {
    const brandDoc = brandTable.find((brand) => {
      return brand.brand_name === brandName;
    });
    return brandDoc ? brandDoc._id : null;
  };

  const getLocationId = (locationName) => {
    const locationDoc = locationTable.find((location) => {
      return location.location_name === locationName;
    });
    return locationDoc ? locationDoc._id : null;
  };

  const getColourId = (colourName) => {
    const colourDoc = colourTable.find((colour) => {
      return colour.colour === colourName;
    });
    return colourDoc ? colourDoc._id : null;
  };

  const getCategoryId = (categoryName) => {
    const categoryDoc = categoryTable.find((category) => {
      return category.category_name === categoryName;
    });
    return categoryDoc ? categoryDoc._id : null;
  };

  return [
    {
      item_name: "Black Wallet",
      author: userTable[0]._id,
      category: getCategoryId("Accessories"),
      description: "Leather wallet containing ID and credit cards",
      created_at: new Date("2025-05-01T10:30:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Black"),
      size: "Small",
      brand: getBrandId("Fossil"),
      material: "Leather",
      img_url:
        "https://cdn.pixabay.com/photo/2020/03/28/13/26/wallet-4977021_1280.jpg",
      resolved: false,
      found: false,
      lost: true,
      questions: [
        "What color is the wallet?",
        "Are there any cards inside?",
        "Where exactly was it found?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Silver iPhone 13",
      author: userTable[1]._id,
      category: getCategoryId("Electronics"),
      description: "Phone with cracked screen and red case",
      created_at: new Date("2025-04-20T14:45:00Z"),
      location: getLocationId("Liverpool"),
      colour: getColourId("Silver"),
      size: "Medium",
      brand: getBrandId("Apple"),
      material: "Metal/Glass",
      img_url:
        "https://cdn.pixabay.com/photo/2021/09/25/17/43/iphone-13-6655520_1280.jpg",
      resolved: true,
      found: true,
      lost: false,
      questions: [
        "What color is the case?",
        "Is the phone locked?",
        "What's the condition of the screen?",
      ],
      answers: ["Red", "Yes", "Cracked"],
    },
    {
      item_name: "Blue Umbrella",
      author: userTable[2]._id,
      category: getCategoryId("Accessories"),
      description: "Compact foldable umbrella with floral pattern",
      created_at: new Date("2025-03-28T09:15:00Z"),
      location: getLocationId("Leeds"),
      colour: getColourId("Blue"),
      size: "Medium",
      brand: getBrandId("Totes"),
      material: "Nylon",
      img_url:
        "https://cdn.pixabay.com/photo/2018/01/16/23/10/umbrella-3087101_1280.jpg",
      resolved: false,
      found: true,
      lost: false,
      questions: [
        "What pattern is on the umbrella?",
        "Is it automatic or manual?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Red Backpack",
      author: userTable[3]._id,
      category: getCategoryId("Bags"),
      description: "Red Nike backpack with gym clothes and water bottle",
      created_at: new Date("2025-05-15T08:00:00Z"),
      location: getLocationId("Sheffield"),
      colour: getColourId("Red"),
      size: "Large",
      brand: getBrandId("Nike"),
      material: "Polyester",
      img_url:
        "https://cdn.pixabay.com/photo/2015/08/10/20/14/handbag-883110_1280.jpg",
      resolved: false,
      found: false,
      lost: true,
      questions: [
        "What's inside the backpack?",
        "Is there a laptop?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Gold Ring",
      author: userTable[0]._id,
      category: getCategoryId("Jewelry"),
      description: "Simple gold band with initials engraved inside",
      created_at: new Date("2025-04-01T13:20:00Z"),
      location: getLocationId("Birmingham"),
      colour: getColourId("Gold"),
      size: "Small",
      brand: getBrandId("Other/Unknown"),
      material: "Gold",
      img_url:
        "https://cdn.pixabay.com/photo/2018/04/04/18/28/golden-3290604_640.jpg",
      resolved: true,
      found: true,
      lost: false,
      questions: [
        "What are the initials?",
        "What's the size?",
        "Is it real gold?",
      ],
      answers: ["J.S.", "Size 6", "Yes, 14k"],
    },
    {
      item_name: "Grey Hoodie",
      author: userTable[4]._id,
      category: getCategoryId("Clothing"),
      description: "Grey zip-up hoodie left on lecture hall seat",
      created_at: new Date("2025-04-28T12:00:00Z"),
      location: getLocationId("Newcastle upon Tyne"),
      colour: getColourId("Grey"),
      size: "Medium",
      brand: getBrandId("H&M"),
      material: "Cotton",
      img_url:
        "https://cdn.pixabay.com/photo/2018/04/04/18/28/golden-3290604_640.jpg",
      resolved: false,
      found: true,
      lost: false,
      questions: ["What size is it?", "Is it clean?", "Which lecture hall?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Wireless Earbuds",
      author: userTable[5]._id,
      category: getCategoryId("Electronics"),
      description: "Black case containing wireless earbuds",
      created_at: new Date("2025-04-30T09:30:00Z"),
      location: getLocationId("Bristol"),
      colour: getColourId("Black"),
      size: "Small",
      brand: getBrandId("Samsung"),
      material: "Plastic",
      img_url:
        "https://cdn.pixabay.com/photo/2016/03/19/23/03/handsfree-1267605_640.jpg",
      resolved: false,
      found: false,
      lost: true,
      questions: [
        "What brand are they?",
        "Do they work?",
        "Is the case included?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Brown Scarf",
      author: userTable[6]._id,
      category: getCategoryId("Clothing"),
      description: "Knitted wool scarf with tassels",
      created_at: new Date("2025-05-02T17:00:00Z"),
      location: getLocationId("Nottingham"),
      colour: getColourId("Brown"),
      size: "One Size",
      brand: getBrandId("Uniqlo"),
      material: "Wool",
      img_url:
        "https://cdn.pixabay.com/photo/2016/01/04/21/12/dog-1121623_640.jpg",
      resolved: true,
      found: true,
      lost: false,
      questions: [
        "What's the length?",
        "Is it clean?",
        "What's the condition?",
      ],
      answers: ["180cm", "Yes", "Like new"],
    },
    {
      item_name: "Reusable Water Bottle",
      author: userTable[7]._id,
      category: getCategoryId("Accessories"),
      description: "Blue metal bottle with 'Team NC' sticker",
      created_at: new Date("2025-04-18T08:50:00Z"),
      location: getLocationId("Coventry"),
      colour: getColourId("Blue"),
      size: "Large",
      brand: getBrandId("Hydro Flask"),
      material: "Metal",
      img_url:
        "https://cdn.pixabay.com/photo/2015/08/21/00/18/water-bottle-898332_640.jpg",
      resolved: false,
      found: true,
      lost: false,
      questions: [
        "What's the capacity?",
        "Is it clean?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Set of Keys",
      author: userTable[8]._id,
      category: getCategoryId("Other"),
      description: "Set of 3 keys with Manchester City keychain",
      created_at: new Date("2025-04-25T13:10:00Z"),
      location: getLocationId("York"),
      colour: getColourId("Silver"),
      size: "Small",
      brand: getBrandId("Yale"),
      material: "Metal",
      img_url:
        "https://cdn.pixabay.com/photo/2017/03/16/08/35/key-2148476_640.jpg",
      resolved: false,
      found: false,
      lost: true,
      questions: [
        "How many keys?",
        "What's on the keychain?",
        "Where exactly was it found?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Sunglasses Case",
      author: userTable[12]._id,
      category: getCategoryId("Eyewear"),
      description:
        "Hard shell case, black with a soft lining. No glasses inside.",
      created_at: new Date("2025-05-12T11:00:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Black"),
      size: "Small",
      brand: getBrandId("Oakley"),
      material: "Plastic",
      img_url:
        "https://cdn.pixabay.com/photo/2014/10/27/18/29/pencil-cases-505328_1280.jpg",
      resolved: false,
      found: true,
      lost: false,
      questions: ["What brand is it?", "Is it empty?", "What's the condition?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Charging Cable",
      author: userTable[6]._id,
      category: getCategoryId("Electronics"),
      description:
        "Long white charging cable, USB-A to Lightning. Looks slightly frayed near the connector.",
      created_at: new Date("2025-05-13T14:30:00Z"),
      location: getLocationId("Leeds"),
      colour: getColourId("White"),
      size: "Small",
      brand: getBrandId("Apple"),
      material: "Plastic",
      img_url:
        "https://cdn.pixabay.com/photo/2017/05/24/21/33/lightning-2341641_1280.jpg",
      resolved: false,
      found: true,
      lost: false,
      questions: [
        "What type of cable is it?",
        "Is it working?",
        "What's the length?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Baseball Cap",
      author: userTable[7]._id,
      category: getCategoryId("Clothing"),
      description:
        "Adjustable cap with a faded red colour and an unreadable logo on the front.",
      created_at: new Date("2025-05-14T09:10:00Z"),
      location: getLocationId("Liverpool"),
      colour: getColourId("Red"),
      size: "Medium",
      brand: getBrandId("Other/Unknown"),
      material: "Cotton",
      img_url:
        "https://cdn.pixabay.com/photo/2021/07/05/22/14/cap-6390191_1280.png",
      resolved: false,
      found: false,
      lost: true,
      questions: ["What's the size?", "Is it clean?", "What's the condition?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Denim Jacket",
      author: userTable[15]._id,
      category: getCategoryId("Clothing"),
      description:
        "Lightweight blue fleece jacket, size M. Has a small tear on the left sleeve.",
      created_at: new Date("2025-04-15T16:50:00Z"),
      location: getLocationId("Newport"),
      colour: getColourId("Blue"),
      size: "Large",
      brand: getBrandId("The North Face"),
      material: "Denim",
      img_url:
        "https://cdn.pixabay.com/photo/2017/08/01/15/00/blue-2566082_1280.jpg",
      resolved: false,
      found: false,
      lost: true,
      questions: ["What size is it?", "Is it clean?", "What's the condition?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Water Bottle",
      author: userTable[9]._id,
      category: getCategoryId("Outdoor Gear"),
      description:
        "Stainless steel insulated water bottle, black. Has a clip for attaching to a bag.",
      created_at: new Date("2025-05-16T10:20:00Z"),
      location: getLocationId("Bradford"),
      colour: getColourId("Black"),
      size: "Medium",
      brand: getBrandId("Hydro Flask"),
      material: "Metal",
      img_url:
        "https://m.media-amazon.com/images/W/MEDIAX_1215821-T1/images/I/614xBXi-8pL.__AC_SX300_SY300_QL70_ML2_.jpg",
      resolved: false,
      found: true,
      lost: false,
      questions: [
        "What's the capacity?",
        "Is it clean?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Wristband",
      author: userTable[17]._id,
      category: getCategoryId("Accessories"),
      description:
        "Simple silicone wristband, yellow, with no discernible text or logo.",
      created_at: new Date("2025-05-17T08:00:00Z"),
      location: getLocationId("Milton Keynes"),
      colour: getColourId("Yellow"),
      size: "Small",
      brand: getBrandId("Other/Unknown"),
      material: "Silicone",
      img_url:
        "https://schoolmeritstickers.com/wp-content/uploads/2022/04/1836.jpg.webp",
      resolved: false,
      found: true,
      lost: false,
      questions: ["What size is it?", "Is it clean?", "What's the condition?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Children's Teddy Bear",
      author: userTable[16]._id,
      category: getCategoryId("Toys & Games"),
      description:
        "Small brown teddy bear, missing one eye. Worn from much love.",
      created_at: new Date("2025-05-18T13:55:00Z"),
      location: getLocationId("Coventry"),
      colour: getColourId("Brown"),
      size: "Small",
      brand: getBrandId("Other/Unknown"),
      material: "Fabric",
      img_url:
        "https://m.media-amazon.com/images/W/MEDIAX_1215821-T1/images/I/71knW6nhbVL._AC_SL1166_.jpg",
      resolved: false,
      found: false,
      lost: true,
      questions: ["What size is it?", "Is it clean?", "What's the condition?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Paperback Novel",
      author: userTable[25]._id,
      category: getCategoryId("Books"),
      description:
        "Paperback copy of 'The Lord of the Rings: The Fellowship of the Ring'. Cover is bent.",
      created_at: new Date("2025-05-19T10:40:00Z"),
      location: getLocationId("Portsmouth"),
      colour: getColourId("Multicolour"),
      size: "Medium",
      brand: getBrandId("Other/Unknown"),
      material: "Paper",
      img_url:
        "https://s3-eu-west-1.amazonaws.com/files.mixam.com/blog/b0632f36-98aa-4752-8cf6-5421f33f9900.png",
      resolved: false,
      found: true,
      lost: false,
      questions: [
        "What's the title?",
        "Is it damaged?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Work ID Card",
      author: userTable[23]._id,
      category: getCategoryId("Documents & IDs"),
      description: "Photo of a woman named 'Sally Maine'.",
      created_at: new Date("2025-05-20T12:15:00Z"),
      location: getLocationId("Glasgow"),
      colour: getColourId("White"),
      size: "Small",
      brand: getBrandId("Other/Unknown"),
      material: "Plastic",
      img_url:
        "https://www.idcardsandaccessories.co.uk/wp-content/uploads/2017/01/ID-Super-Saver-Packs-Cards.png",
      resolved: false,
      found: true,
      lost: false,
      questions: [
        "What's the name on the card?",
        "Is it valid?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Small Key",
      author: userTable[14]._id,
      category: getCategoryId("Keys"),
      description:
        "A single, small brass key with a worn head. No discernible markings.",
      created_at: new Date("2025-05-21T15:00:00Z"),
      location: getLocationId("Leicester"),
      colour: getColourId("Gold"),
      size: "Small",
      brand: getBrandId("Yale"),
      material: "Metal",
      img_url:
        "https://media.kasperskydaily.com/wp-content/uploads/sites/92/2015/12/06023556/golden-key-featured.jpg",
      resolved: false,
      found: false,
      lost: true,
      questions: [
        "What type of key is it?",
        "Is it clean?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
  ];
};

module.exports = generateProdItems;
