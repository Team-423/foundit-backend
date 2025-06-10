const generateTestItems = (
  userTable,
  brandTable,
  locationTable,
  colourTable,
  categoryTable
) => {
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

  const getColourId = (colourName) => {
    const colourDoc = colourTable.find(
      (colour) => colour.colour === colourName
    );
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
      item_name: "TEST_ITEM_1_WALLET",
      author: userTable[0]._id,
      category: getCategoryId("Test_category_1"),
      description: "Test description for item 1",
      created_at: new Date("2025-01-01T10:00:00Z"),
      location: getLocationId("TEST_LOCATION_1"),
      colour: getColourId("Test_colour_1"),
      size: "TestSmall",
      brand: getBrandId("Test_Brand_1"),
      material: "TestMaterial1",
      img_url: "test_item_img_url1",
      resolved: false,
      found: false,
      lost: true,
      address: "1 Test Street, London",
      coordinates: { lat: 51.5074, lng: -0.1278 },
      questions: ["question1", "question2", "question3"],
      answers: ["", "", ""],
    },
    {
      item_name: "TEST_ITEM_2_PHONE",
      author: userTable[1]._id,
      category: getCategoryId("Test_category_2"),
      description: "Test description for item 2",
      created_at: new Date("2025-01-02T10:00:00Z"),
      location: getLocationId("TEST_LOCATION_2"),
      colour: getColourId("Test_colour_2"),
      size: "TestMedium",
      brand: getBrandId("Test_Brand_2"),
      material: "TestMaterial2",
      img_url: "test_item_img_url2",
      resolved: true,
      found: true,
      lost: false,
      address: "2 Test Street, Birmingham",
      coordinates: { lat: 52.4862, lng: -1.8904 },
      questions: ["question1", "question2", "question3"],
      answers: ["answer1", "answer2", "answer3"],
    },
    {
      item_name: "TEST_ITEM_3_UMBRELLA",
      author: userTable[2]._id,
      category: getCategoryId("Test_category_3"),
      description: "Test description for item 3",
      created_at: new Date("2025-01-03T10:00:00Z"),
      location: getLocationId("TEST_LOCATION_3"),
      colour: getColourId("Test_colour_3"),
      size: "TestMedium",
      brand: getBrandId("Test_Brand_3"),
      material: "TestMaterial3",
      img_url: "test_item_img_url3",
      resolved: false,
      found: true,
      lost: false,
      address: "3 Test Street, Manchester",
      coordinates: { lat: 53.4808, lng: -2.2426 },
      questions: ["question1", "question2", "question3"],
      answers: ["", "", ""],
    },
    {
      item_name: "TEST_ITEM_4_BACKPACK",
      author: userTable[3]._id,
      category: getCategoryId("Test_category_4"),
      description: "Test description for item 4",
      created_at: new Date("2025-01-04T10:00:00Z"),
      location: getLocationId("TEST_LOCATION_4"),
      colour: getColourId("Test_colour_4"),
      size: "TestLarge",
      brand: getBrandId("Test_Brand_4"),
      material: "TestMaterial4",
      img_url: "test_item_img_url4",
      resolved: false,
      found: false,
      lost: true,
      address: "4 Test Street, Glasgow",
      coordinates: { lat: 55.8642, lng: -4.2518 },
      questions: ["question1", "question2", "question3"],
      answers: ["", "", ""],
    },
    {
      item_name: "TEST_ITEM_5_RING",
      author: userTable[0]._id,
      category: getCategoryId("Test_category_5"),
      description: "Test description for item 5",
      created_at: new Date("2025-01-05T10:00:00Z"),
      location: getLocationId("TEST_LOCATION_5"),
      colour: getColourId("Test_colour_5"),
      size: "TestTiny",
      brand: getBrandId("Test_Brand_5"),
      material: "TestMaterial5",
      img_url: "test_item_img_url5",
      resolved: true,
      found: true,
      lost: false,
      address: "5 Test Street, Coventry",
      coordinates: { lat: 52.4068, lng: -1.5197 },
      questions: ["question1", "question2", "question3"],
      answers: ["answer1", "answer2", "answer3"],
    },
    {
      item_name: "TEST_ITEM_6_RING",
      author: userTable[0]._id,
      category: getCategoryId("Test_category_5"),
      description: "Test description for item 6",
      created_at: new Date("2025-01-05T10:00:00Z"),
      location: getLocationId("TEST_LOCATION_5"),
      colour: getColourId("Test_colour_5"),
      size: "TestTiny",
      brand: getBrandId("Test_Brand_2"),
      material: "TestMaterial1",
      img_url: "test_item_img_url5",
      resolved: true,
      found: true,
      lost: false,
      address: "6 Test Street, Southampton",
      coordinates: { lat: 52.4068, lng: -1.5197 },
      questions: ["question1", "question2", "question3"],
      answers: ["answer1", "answer2", "answer3"],
    },
  ];
};

module.exports = generateTestItems;
