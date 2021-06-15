import express from "express";
import { User } from "../models/user";
const router = express.Router();

// User sign up
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email
    });

    if (user) res.status(400).json({ msg: "User already exists" });

    user = new User({
      email,
      password
    });

    const response = await user.save();
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error saving user"
    });
  }
});

// User log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email
    });

    if (user && user.password == password) res.end();

    res.status(400).json({ msg: "Incorrect email or password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server error"
    });
  }
});

module.exports = router;
