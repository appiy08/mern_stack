require('dotenv').config();

const express = require("express");
const workoutsRoutes = require("./router/workouts");


// express app
const app = express();

const port = process.env.PORT;

// middleware 
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes 
app.use('/api/workouts', workoutsRoutes)

// listen for request 
app.listen(port, () => {
  console.log("Listing on Port",port);
});
