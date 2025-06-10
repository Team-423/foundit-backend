const createGetCategoryId = (categoryTable) => {
  return function getCategoryId(categoryName) {
    const category = categoryTable.find(
      (c) => c.category_name === categoryName
    );
    return category ? category._id : null;
  };
};

module.exports = createGetCategoryId;
