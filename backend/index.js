const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Kết nối MongoDB
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
