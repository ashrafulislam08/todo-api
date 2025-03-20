const express = require("express");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET all the todos
router.get("/", checkLogin, async (req, res) => {
  const todo = await Todo.find({});
  res.send(todo);
});

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
      res.status(201).send(req.body);
    })
    .catch((error) => {
      console.log(error);
    });
});

// post multiple todo
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// put todo
router.put("/:id", async (req, res) => {
  const updatedTodo = req.body;
  await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: updatedTodo,
    }
  );

  res.send(updatedTodo);
});
// delete todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
});

module.exports = router;
