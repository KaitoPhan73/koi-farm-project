const express = require("express");
const connectDB = require("./src/config/db");
const routes = require("./src/routes");
const app = express();

// Kết nối MongoDB
connectDB();

app.use(express.json());
app.use("/api", routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
