const createGetBrandId = (brandTable) => {
  return function getBrandId(brandName) {
    const brand = brandTable.find((b) => b.brand_name === brandName);
    return brand ? brand._id : null;
  };
};

module.exports = createGetBrandId;
