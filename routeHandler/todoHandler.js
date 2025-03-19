const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET all the todos
router.get("/", async (req, res) => {});

// get a todo by id
router.get("/:id", async (req, res) => {});

// post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  //   await newTodo.save((err) => {
  //     if (err) {
  //       res.status(500).json({
  //         error: "There was a server side error",
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: "Todo was inserted successfully!",
  //       });
  //     }
  //   });
  newTodo
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).send(req.body);
    })
    .catch((error) => {
      console.log(error);
    });
});

// post multiple todo
router.post("/all", async (req, res) => {});

// put todo
router.put("/:id", async (req, res) => {});
// delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
