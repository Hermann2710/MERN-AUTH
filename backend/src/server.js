require("dotenv").config();
const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/User");
const connectDB = require("./config/db");

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Log informations to the console
app.use((req, res, next) => {
  console.log(req.method, req.url);
  console.log(req.body);
  next();
});

// routes
app.use("/api", UserRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
