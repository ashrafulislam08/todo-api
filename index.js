const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

// express app initialization
const app = express();
app.use(express.json());

// mongoose connection with mongodb
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.z03zt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`
  )
  .then(() => {
    console.log("Mongoose connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
// application routes

app.use("/todo", todoHandler);

app.get("/", (req, res) => {
  res.send("Server is on for todo app");
});

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }

  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
