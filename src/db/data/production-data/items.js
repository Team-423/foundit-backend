const createGetBrandId = require("../utils/createGetBrandId");
const createGetLocationId = require("../utils/createGetLocationId");
const createGetColourId = require("../utils/createGetColourId");
const createGetCategoryId = require("../utils/createGetCategoryId");

const generateProdItems = (
  userTable,
  brandTable,
  locationTable,
  colourTable,
  categoryTable
) => {
  const getBrandId = createGetBrandId(brandTable);
  const getLocationId = createGetLocationId(locationTable);
  const getColourId = createGetColourId(colourTable);
  const getCategoryId = createGetCategoryId(categoryTable);

  return [
    {
      item_name: "Wallet",
      author: userTable[0]._id,
      category: getCategoryId("Accessories"),
      description: "Leather wallet containing ID and credit cards",
      created_at: new Date("2025-05-01T10:30:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Black"),
      size: "Small",
      brand: getBrandId("Calvin Klein"),
      material: "Leather",
      img_url:
        "https://images1.vinted.net/t/02_01cb3_dsJDwvbYXiwLZfynAK43wUxK/f800/1749636963.jpeg?s=a4384c7d32fa7d2afa262d2ee9df37df237fda1d",
      resolved: true,
      found: false,
      lost: true,
      address: "Piccadilly Gardens, Manchester M1 1RG, UK",
      coordinates: { lat: 53.4808, lng: -2.2426 },
      questions: [
        "Id name?",
        "Are there any cards inside?",
        "Where exactly was it found?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "iPhone 13",
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
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRVTs21Rew8E44UatqrYdkxcI7bLHEq9sS06zwuI_z3yGbjfbCrKYNX4FfN4hXpckgs8zwSrAOu",
      resolved: true,
      found: true,
      lost: false,
      address: "Liverpool ONE, 5 Wall St, Liverpool L1 8JQ, UK",
      coordinates: { lat: 53.4045, lng: -2.9856 },
      questions: [
        "What color is the case?",
        "Is the phone locked?",
        "What's the condition of the screen?",
      ],
      answers: ["Red", "Yes", "Cracked"],
    },
    {
      item_name: "Umbrella",
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
        "https://images1.vinted.net/t/04_012a3_jdWJTrHzUVrSALUCb4mhmoxs/f800/1748971129.jpeg?s=9e623efd1b43f17f7229d54cd790baebd52737db",
      resolved: false,
      found: true,
      lost: false,
      address: "Trinity Leeds, Albion St, Leeds LS1 5AT, UK",
      coordinates: { lat: 53.7965, lng: -1.5478 },
      questions: [
        "What pattern is on the umbrella?",
        "Is it automatic or manual?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Backpack",
      author: userTable[3]._id,
      category: getCategoryId("Bags"),
      description: "Red backpack with gym clothes and water bottle",
      created_at: new Date("2025-05-15T08:00:00Z"),
      location: getLocationId("Sheffield"),
      colour: getColourId("Red"),
      size: "Large",
      brand: getBrandId("Berghaus"),
      material: "Polyester",
      img_url:
        "https://images1.vinted.net/t/02_020ec_iuHViPDB8wmn18NoKq5CUyZf/f800/1749634481.jpeg?s=c6298e106c8bb01f26119b8df85f2cc9b18c9a26",
      resolved: false,
      found: false,
      lost: true,
      address: "Meadowhall, Sheffield S9 1EP, UK",
      coordinates: { lat: 53.4125, lng: -1.4346 },
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
        "https://images1.vinted.net/t/04_00b74_KQHEovBgNcmaS8ymDUTTPdZ5/f800/1749622824.jpeg?s=cafed0fb33e775e3b91b4e8b70fc5f5b3090b582",
      resolved: true,
      found: true,
      lost: false,
      address: "Bullring Shopping Centre, Birmingham B5 4BU, UK",
      coordinates: { lat: 52.478, lng: -1.8946 },
      questions: [
        "What are the initials?",
        "What's the size?",
        "Is it real gold?",
      ],
      answers: ["J.S.", "Size 6", "Yes, 14k"],
    },
    {
      item_name: "Hoodie",
      author: userTable[4]._id,
      category: getCategoryId("Clothing"),
      description: "Grey string hoodie left on lecture hall seat",
      created_at: new Date("2025-04-28T12:00:00Z"),
      location: getLocationId("Newcastle upon Tyne"),
      colour: getColourId("Grey"),
      size: "Medium",
      brand: getBrandId("H&M"),
      material: "Cotton",
      img_url:
        "https://images1.vinted.net/t/04_01c4e_spngoitCP6SwsqBAasjGrnfh/f800/1749569811.jpeg?s=7b06b70bedf3d056c55d6655b0a1459a7ef4963b",
      resolved: true,
      found: true,
      lost: false,
      address: "Northumbria University, Newcastle upon Tyne NE1 8ST, UK",
      coordinates: { lat: 54.9778, lng: -1.6129 },
      questions: ["What size is it?", "Is it clean?", "Which lecture hall?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Earbuds",
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
        "https://images1.vinted.net/t/02_01857_4nDUgE25MJQ5d4fenKzkYJ5X/f800/1749637418.jpeg?s=186fc3378cbd7fa5729fa9c2bf2f9ff0a19720cd",
      resolved: false,
      found: false,
      lost: true,
      address: "Cabot Circus, Bristol BS1 3BX, UK",
      coordinates: { lat: 51.4596, lng: -2.5841 },
      questions: [
        "What brand are they?",
        "Do they work?",
        "Is the case included?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Scarf",
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
        "https://images1.vinted.net/t/03_022a0_BfmUTWX8RZVtssiG4SpDvuRK/f800/1749384980.jpeg?s=3f04eb918af25bc7f59969bafd168ab4f0d9ff6d",
      resolved: true,
      found: true,
      lost: false,
      address: "Victoria Centre, Nottingham NG1 3QN, UK",
      coordinates: { lat: 52.9556, lng: -1.146 },
      questions: [
        "What's the length?",
        "Is it clean?",
        "What's the condition?",
      ],
      answers: ["180cm", "Yes", "Like new"],
    },
    {
      item_name: "Water Bottle",
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
        "https://images1.vinted.net/t/03_013b1_v4Pai3f2cGjNiDWjrfeN4V5v/f800/1749583988.jpeg?s=2adebb6b1ac1a2417e23e81a23f8e510a342a95f",
      resolved: true,
      found: true,
      lost: false,
      address: "Broadgate, Coventry CV1 1NF, UK",
      coordinates: { lat: 52.4081, lng: -1.5106 },
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
      img_url: "https://www.lakelandlocks.co.uk/images/lost-keys.jpg",
      resolved: false,
      found: false,
      lost: true,
      address: "York Railway Station, Station Rd, York YO24 1AB, UK",
      coordinates: { lat: 53.9576, lng: -1.093 },
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
        "https://images1.vinted.net/t/03_02645_bBLqbdZnh8SPJvvuwESp3BPe/f800/1749328516.jpeg?s=1edd32e561bee8c81fe7e794e06270a482761028",
      resolved: true,
      found: true,
      lost: false,
      address: "Manchester Arndale, Manchester M4 3AQ, UK",
      coordinates: { lat: 53.485, lng: -2.24 },
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
        "https://images1.vinted.net/t/04_00a06_Y7TdHWePWoPD6cEDor57Br4X/f800/1749589817.jpeg?s=0cd9169aea44aebe0037b8a6ba44689b7c0f5823",
      resolved: false,
      found: true,
      lost: false,
      address: "Leeds Kirkgate Market, Vicar Ln, Leeds LS2 7HY, UK",
      coordinates: { lat: 53.7972, lng: -1.5395 },
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
        "Adjustable cap with a faded brown colour and an unreadable logo on the front.",
      created_at: new Date("2025-05-14T09:10:00Z"),
      location: getLocationId("Liverpool"),
      colour: getColourId("Brown"),
      size: "Medium",
      brand: getBrandId("Other/Unknown"),
      material: "Cotton",
      img_url:
        "https://images1.vinted.net/t/02_014e3_G7r1t4CbT1JhJTrsqSNENBjL/f800/1749639271.jpeg?s=25e29f8b58a9c1a01a2c441436e5ab91242e36d2",
      resolved: true,
      found: false,
      lost: true,
      address: "Albert Dock, Liverpool L3 4AF, UK",
      coordinates: { lat: 53.4001, lng: -2.9935 },
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
        "https://images1.vinted.net/t/01_01b55_232gg9sdkhDVtMDKKk7APyEH/f800/1746284689.jpeg?s=555870e313443ade961b557f3fb917269af33369",
      resolved: false,
      found: false,
      lost: true,
      address: "Friars Walk, Newport NP20 1EA, UK",
      coordinates: { lat: 51.5851, lng: -2.9977 },
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
        "https://images1.vinted.net/t/02_01a5f_eQQkCLgLjgo2t9HtQj7PfWrv/f800/1749482230.jpeg?s=ce90b6318173ece12aafdca69ed2a359b4035630",
      resolved: true,
      found: true,
      lost: false,
      address: "The Broadway, Bradford BD1 1JR, UK",
      coordinates: { lat: 53.792, lng: -1.75 },
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
      brand: getBrandId("Nike"),
      material: "Silicone",
      img_url:
        "https://images1.vinted.net/t/01_0103a_v2LNLtFseG1WjtptoRodPQgc/f800/1747926657.jpeg?s=210eb25655bbba235fd78e3915d4556c47cb2768",
      resolved: false,
      found: true,
      lost: false,
      address: "Midsummer Place, Central Milton Keynes MK9 3GB, UK",
      coordinates: { lat: 52.0435, lng: -0.7605 },
      questions: ["What size is it?", "Is it clean?", "What's the condition?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Teddy Bear",
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
        "https://images1.vinted.net/t/02_01bc6_Ua8p8fjTusr5amiLiQhJwG24/f800/1749588845.jpeg?s=5922537db93d3a8f283a0927c79a4b38fc2d7974",
      resolved: true,
      found: false,
      lost: true,
      address: "Coventry Transport Museum, Coventry CV1 1JD, UK",
      coordinates: { lat: 52.4106, lng: -1.51 },
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
        "https://images1.vinted.net/t/04_010a7_rjX8d3fehttAFcPMrNnLrXSh/f800/1749642709.jpeg?s=68c3efa7c0589cfe1e39350cbf59c5f746605a8b",
      resolved: false,
      found: true,
      lost: false,
      address: "Commercial Rd, Portsmouth PO1 1HG, UK",
      coordinates: { lat: 50.7982, lng: -1.0913 },
      questions: [
        "What's the title?",
        "Is it damaged?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "ID Card Case",
      author: userTable[23]._id,
      category: getCategoryId("Documents & IDs"),
      description: "Photo of a woman'.",
      created_at: new Date("2025-05-20T12:15:00Z"),
      location: getLocationId("Glasgow"),
      colour: getColourId("Black"),
      size: "Small",
      brand: getBrandId("Other/Unknown"),
      material: "Plastic",
      img_url:
        "https://images1.vinted.net/t/04_021cf_mazSaG9wEqVJhBMSr1atBSek/f800/1748952125.jpeg?s=256914eadb77b43b38e77c84766ffdb6046961fa",
      resolved: true,
      found: true,
      lost: false,
      address: "Buchanan Galleries, Glasgow G1 2FF, UK",
      coordinates: { lat: 55.8627, lng: -4.2521 },
      questions: [
        "What's the name on the card?",
        "Is it valid?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Keys",
      author: userTable[14]._id,
      category: getCategoryId("Keys"),
      description:
        "A single, small brass key with a worn head. No discernible markings.",
      created_at: new Date("2025-05-21T15:00:00Z"),
      location: getLocationId("Leicester"),
      colour: getColourId("Silver"),
      size: "Small",
      brand: getBrandId("Yale"),
      material: "Metal",
      img_url:
        "https://thelockspecialist.co.uk/wp-content/uploads/2025/01/lost-keys-1024x683.jpg",
      resolved: false,
      found: false,
      lost: true,
      address: "Highcross Leicester, Leicester LE1 4AN, UK",
      coordinates: { lat: 52.6376, lng: -1.1398 },
      questions: [
        "What type of key is it?",
        "Is it clean?",
        "What's the condition?",
      ],
      answers: ["", "", ""],
    },
    //below is the example for manchester, clothing, coat & hoodie, Calvin Klein&Columbia,&H&M, beige&Camo&Cream&green, all found items.
    {
      item_name: "Coat",
      author: userTable[10]._id,
      category: getCategoryId("Clothing"),
      description: "Classic beige trench coat, double-breasted, size M.",
      created_at: new Date("2025-05-22T09:00:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Beige"),
      size: "Medium",
      brand: getBrandId("Calvin Klein"),
      material: "Cotton",
      img_url:
        "https://images1.vinted.net/t/03_01922_wVe8DB6565V52VKi3is3rvqX/f800/1734791989.jpeg?s=776e5680308cf7c27611e1ddfb4c929a6b5a17f7",
      resolved: true,
      found: true,
      lost: false,
      address: "Manchester Piccadilly, Manchester M1 2BN, UK",
      coordinates: { lat: 53.4774, lng: -2.2304 },
      questions: ["What size is it?", "Is it waterproof?", "Any stains?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Coat",
      author: userTable[11]._id,
      category: getCategoryId("Clothing"),
      description: "Green camo Coat, drawstring hood",
      created_at: new Date("2025-05-23T10:30:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Camo"),
      size: "Large",
      brand: getBrandId("Columbia"),
      material: "Polyester",
      img_url:
        "https://images1.vinted.net/t/03_005cc_Kb6UanEnzPSNkQBrT3SfMxvu/f800/1749298979.jpeg?s=ae817215cae84f5557fef20f8b344917804a08d2",
      resolved: false,
      found: true,
      lost: false,
      address: "Market Street, Manchester M1 1WR, UK",
      coordinates: { lat: 53.4821, lng: -2.2362 },
      questions: ["Is the hood attached?", "Any rips?", "What size?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Coat",
      author: userTable[12]._id,
      category: getCategoryId("Clothing"),
      description: "Soft cream cardigan Coat",
      created_at: new Date("2025-05-24T11:15:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Cream"),
      size: "Small",
      brand: getBrandId("H&M"),
      material: "Wool",
      img_url:
        "https://images1.vinted.net/t/01_00163_fXo8GDN1X4NkrWr3XF1VnUmJ/f800/1749549379.jpeg?s=3b33b4a49e2df1d5a17232c96449562617d00984",
      resolved: true,
      found: true,
      lost: false,
      address: "Deansgate, Manchester M3 2BW, UK",
      coordinates: { lat: 53.4801, lng: -2.2505 },
      questions: ["What material?", "Is it warm?", "Any buttons missing?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Coat",
      author: userTable[13]._id,
      category: getCategoryId("Clothing"),
      description: "Beige puffer Coat, zip-up.",
      created_at: new Date("2025-05-25T12:00:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Beige"),
      size: "XL",
      brand: getBrandId("Columbia"),
      material: "Polyester",
      img_url:
        "https://images1.vinted.net/t/03_024c9_uUCG3fVigTbSStrekRnkKbGp/f800/1749143230.jpeg?s=8c3527db883be9cfec87a35dec7a841a1e7dea7a",
      resolved: false,
      found: true,
      lost: false,
      address: "Oxford Road, Manchester M13 9PL, UK",
      coordinates: { lat: 53.4668, lng: -2.2339 },
      questions: ["Is it insulated?", "What size?", "Any tears?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Hoodie",
      author: userTable[14]._id,
      category: getCategoryId("Clothing"),
      description: "Grey striped graphic hoodie",
      created_at: new Date("2025-05-26T13:30:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Camo"),
      size: "Medium",
      brand: getBrandId("H&M"),
      material: "Cotton",
      img_url:
        "https://images1.vinted.net/t/02_0052b_X88LTZprvK9jE1ipMjxNCUQH/f800/1749641996.jpeg?s=b695a6f8b394ca2f215889bb9f7882a547029056",
      resolved: true,
      found: true,
      lost: false,
      address: "St Ann's Square, Manchester M2 7HQ, UK",
      coordinates: { lat: 53.4826, lng: -2.2451 },
      questions: ["How many pockets?", "Is it adjustable?", "What size?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Hoodie",
      author: userTable[15]._id,
      category: getCategoryId("Clothing"),
      description: "Cream knit Hoodie, round neck",
      created_at: new Date("2025-05-27T14:45:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Cream"),
      size: "Large",
      brand: getBrandId("Calvin Klein"),
      material: "Wool",
      img_url:
        "https://images1.vinted.net/t/03_01160_WodnveUCHzM7meDzbvAqbUH4/f800/1749599133.jpeg?s=fd0b04dfce04ce771b39d46a2595fe09c4311661",
      resolved: false,
      found: true,
      lost: false,
      address: "Spinningfields, Manchester M3 3EB, UK",
      coordinates: { lat: 53.4806, lng: -2.2556 },
      questions: ["Is it machine washable?", "What size?", "Any stains?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Hoodie",
      author: userTable[16]._id,
      category: getCategoryId("Clothing"),
      description: "Beige Hoodie, single-breasted",
      created_at: new Date("2025-05-28T15:20:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Beige"),
      size: "Small",
      brand: getBrandId("H&M"),
      material: "Linen",
      img_url:
        "https://images1.vinted.net/t/04_0102e_gGMuU78NuwhL4Xqfx6MqeXVn/f800/1749631605.jpeg?s=8242d84f54f643643988a67d4b260520515165b1",
      resolved: true,
      found: true,
      lost: false,
      address: "King Street, Manchester M2 4LQ, UK",
      coordinates: { lat: 53.4822, lng: -2.2447 },
      questions: ["Is it lined?", "What size?", "Any buttons missing?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Hoodie",
      author: userTable[17]._id,
      category: getCategoryId("Clothing"),
      description: "Camo windbreaker hoodie, lightweight, size M.",
      created_at: new Date("2025-05-29T16:10:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Camo"),
      size: "Medium",
      brand: getBrandId("Columbia"),
      material: "Polyester",
      img_url:
        "https://images1.vinted.net/t/01_00bc6_3kUiSS1KoKvmXXo3we1UPFz3/f800/1749634511.jpeg?s=2423e58ebae6aa6656621e8e5732ad7fc8e9af56",
      resolved: false,
      found: true,
      lost: false,
      address: "Northern Quarter, Manchester M1 1JN, UK",
      coordinates: { lat: 53.4841, lng: -2.2366 },
      questions: ["Is it waterproof?", "What size?", "Any rips?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Hoodie",
      author: userTable[18]._id,
      category: getCategoryId("Clothing"),
      description: "very nice hoodie but old",
      created_at: new Date("2025-05-30T17:05:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Green"),
      size: "Medium",
      brand: getBrandId("Calvin Klein"),
      material: "Cotton",
      img_url:
        "https://images1.vinted.net/t/04_0116f_LD7DfeJzc4JiGkvr3e8jaWew/f800/1749565959.jpeg?s=11f7201095ab692818d6380b2b0e5cb6aae00966",
      resolved: true,
      found: true,
      lost: false,
      address: "Arndale Centre, Manchester M4 3AQ, UK",
      coordinates: { lat: 53.485, lng: -2.24 },
      questions: ["Is it stretchy?", "What size?", "Any holes?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Hoodie",
      author: userTable[19]._id,
      category: getCategoryId("Clothing"),
      description: "Nice hoodie with hood.",
      created_at: new Date("2025-05-31T18:00:00Z"),
      location: getLocationId("Manchester"),
      colour: getColourId("Green"),
      size: "Large",
      brand: getBrandId("H&M"),
      material: "Cotton",
      img_url:
        "https://images1.vinted.net/t/04_004ba_DReCjiMRjQfQXLvNGTcPApAd/f800/1749582357.jpeg?s=d05bf77f760af9f0b4e5b21ec9de0eb7ad70fb98",
      resolved: false,
      found: true,
      lost: false,
      address: "Great Ancoats St, Manchester M4 6DE, UK",
      coordinates: { lat: 53.4855, lng: -2.2232 },
      questions: ["Are they adjustable?", "What size?", "Any stains?"],
      answers: ["", "", ""],
    },
    {
      item_name: "Water Bottle",
      author: userTable[30]._id,
      category: getCategoryId("Accessories"),
      description:
        "Green reusable metal bottle, slightly dented at the bottom.",
      created_at: new Date("2025-06-01T09:15:00Z"),
      location: getLocationId("Leeds"),
      colour: getColourId("Green"),
      size: "Medium",
      brand: getBrandId("Hydro Flask"),
      material: "Metal",
      img_url:
        "https://images1.vinted.net/t/02_012bd_5uuqUroqaLJcchaD9FG9e4rq/f800/1749630877.jpeg?s=7acc1b59fa556370ee122ad7ec3e43527b0dac95",
      resolved: true,
      found: true,
      lost: false,
      address: "City Square, Leeds LS1 2ES, UK",
      coordinates: { lat: 53.7962, lng: -1.5486 },
      questions: [
        "Does it have a logo?",
        "Is the lid secure?",
        "Any scratches?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Wireless Earbuds",
      author: userTable[31]._id,
      category: getCategoryId("Electronics"),
      description: "White airpods in a charging case.",
      created_at: new Date("2025-06-02T14:45:00Z"),
      location: getLocationId("London"),
      colour: getColourId("White"),
      size: "Small",
      brand: getBrandId("Apple"),
      material: "Plastic",
      img_url:
        "https://images1.vinted.net/t/02_00265_oM5yDjJ4JE5cJ4GYup9GfNY5/f800/1749570515.jpeg?s=7f1711dc11246387d69f022a027f8583480298e6",
      resolved: false,
      found: true,
      lost: false,
      address: "Waterloo Station, London SE1 8SW, UK",
      coordinates: { lat: 51.5033, lng: -0.1147 },
      questions: [
        "Does the case still charge?",
        "Are both earbuds there?",
        "Any damage?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Canvas Tote Bag",
      author: userTable[30]._id,
      category: getCategoryId("Bags"),
      description: "Plain cream tote bag.",
      created_at: new Date("2025-05-29T17:30:00Z"),
      location: getLocationId("Liverpool"),
      colour: getColourId("Cream"),
      size: "Large",
      brand: getBrandId("Zara"),
      material: "Canvas",
      img_url:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      resolved: true,
      found: false,
      lost: true,
      address: "Church Street, Liverpool L1 1DA, UK",
      coordinates: { lat: 53.4057, lng: -2.9815 },
      questions: [
        "Are the straps intact?",
        "Any visible stains?",
        "Is it branded?",
      ],
      answers: ["", "", ""],
    },
    {
      item_name: "Camo Backpack",
      author: userTable[31]._id,
      category: getCategoryId("Accessories"),
      description:
        "Military-style camouflage backpack with multiple compartments. Difficult to find.",
      created_at: new Date("2025-06-02T15:45:00Z"),
      location: getLocationId("Birmingham"),
      colour: getColourId("Camo"),
      size: "Large",
      brand: getBrandId("Prada"),
      material: "Polyester",
      img_url:
        "https://images1.vinted.net/t/02_01385_FLCjBg6EFCYeJFw5nqS25Zf6/f800/1749394035.jpeg?s=4a974c6d79be53d21330aeb82e7ea740f54f54ff",
      resolved: false,
      found: false,
      lost: true,
      address: "New Street Station, Birmingham B2 4QA, UK",
      coordinates: { lat: 52.4776, lng: -1.8982 },
      questions: [
        "Was there a laptop inside?",
        "Any identifying patches?",
        "Zipper condition?",
      ],
      answers: ["", "", ""],
    },
  ];
};

module.exports = generateProdItems;
