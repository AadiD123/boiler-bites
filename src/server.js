require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const reviewRoutes = require("./routes/reviews");

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
app.use("/api/reviews", reviewRoutes);

// connect to db
mongoose
  .connect("mongodb+srv://admin:purduepete@cluster0.dlmhec4.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", 4000);
    });
  })
  .catch((error) => {
    console.log(error);
  });
