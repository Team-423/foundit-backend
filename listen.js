const app = require("./src/app.js");
const connectDB = require("./src/db/connection.js");

const { PORT = 9090 } = process.env;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Listening on ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("❌ Server startup failed due to DB connection issue:", err);
  });
