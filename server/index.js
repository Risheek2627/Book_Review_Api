const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/authRoute");
connectDB();
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
