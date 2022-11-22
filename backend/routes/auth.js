const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "HerryIsGood";
var jsonparser = bodyParser.json();

// Router 1: Creating & registering a user
router.post(
  "/createUser",
  jsonparser,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      user = await User.findOne({ name: req.body.name });
      if (user) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      console.log(data);
      const authtoken = JWT.sign(data, JWT_SECRET);

      res.json({ authtoken });
    } catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error")
  }
  }
);
// Route 2: Authentication for user login
router.post(
  "/login",
  jsonparser,
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    try {
      let success = false
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "try with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({success, error: "try with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = JWT.sign(data, JWT_SECRET);
      success = true
      res.json({ success,authtoken });
      const name = user.name;
      console.log("Welcome back " + name + "!!!");
    } catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error")
  }
  }
);

//Router 3: Get user details
router.post(
  "/getUser",
  fetchUser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);

    } catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error")
  }
  }
);
module.exports = router;
