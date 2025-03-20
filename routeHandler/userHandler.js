const express = require("express");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.find({ username: req.body.username });

  if (user && user.length > 0) {
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user[0]?.password
    );

    if (isValidPassword) {
      // generate jwt token
      const token = jwt.sign(
        { username: user[0].username },
        process.env.JWT_SECRET,
        {
          expiresIn: "5hr",
        }
      );

      res.status(200).json({
        access_token: token,
        message: "login successful!",
      });
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } else {
    res.status(401).json({
      error: "Authentication failed",
    });
  }
});

module.exports = router;
