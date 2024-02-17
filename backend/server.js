require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const middlewares = require("./middlewares");

const workoutsRoutes = require("./routes/workouts");

// express app
const app = express();

const port = process.env.PORT;

// middleware
app.use(middlewares);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutsRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((result) => {
    // listen for request
    app.listen(port, () => {
      console.log("Connected to DB & Listing on Port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
