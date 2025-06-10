const createGetLocationById = (locationTable) => {
  return function getLocationId(locationName) {
    const location = locationTable.find(
      (l) => l.location_name === locationName
    );
    return location ? location._id : null;
  };
};

module.exports = createGetLocationById;
