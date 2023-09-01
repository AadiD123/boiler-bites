require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ratingRoutes = require("./routes/ratings");
const dishRoutes = require("./routes/dishes");
const timingRoutes = require("./routes/timings");

// creates express app
const app = express();

// middleware

// attaches request body to request handler
app.use(express.json());
app.use(cors());
//(logs the request)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/ratings", ratingRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/timings", timingRoutes);

// connect to db
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     // listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log("connected to db and listening on port", process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const con = mysql.createConnection({
  host: "boilerbites-1.cjmepwltgjhe.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "purduepete"
});

con.connect(function(err) {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");

  app.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
  });
});