const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/authRoute");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dotenv = require("dotenv");
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

//Routes
app.use("/user", userRoutes);
app.use(bookRoutes);
app.use(reviewRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:3000`);
});
