const rateLimit = require("express-rate-limit");

const searchLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    msg: "Too many searches (Max 5), please try again in an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { searchLimiter };
