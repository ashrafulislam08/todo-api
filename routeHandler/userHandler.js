const express = require("express");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = new mongoose.model("User", userSchema);
const router = express.Router();

// SIGNUP USER
router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  });

  newUser
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
