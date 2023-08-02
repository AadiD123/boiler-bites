require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const ratingRoutes = require("./routes/ratings");

// creates express app
const app = express();

// middleware

// attaches request body to request handler
app.use(express.json());

//(logs the request)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/ratings", ratingRoutes);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
