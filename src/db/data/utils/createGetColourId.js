const createGetColourId = (colourTable) => {
  return function getColourId(colourName) {
    const colour = colourTable.find((c) => c.colour === colourName);
    return colour ? colour._id : null;
  };
};

module.exports = createGetColourId;
