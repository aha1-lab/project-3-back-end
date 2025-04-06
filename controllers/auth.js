const User = require("../models/User");
const Person = require("../models/person");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verify-token");

router.post("/sign-up", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });

    if (foundUser) {
      return res.status(409).json({ err: "username already taken" });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).json({ err: "password are not matching" });
    }
    console.log(req.body);
    const createdUser = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, 12),
      email: req.body.email,
      userType: req.body.userType,
    });
    console.log(createdUser);

    const convertedObject = createdUser.toObject();
    delete convertedObject.hashedPassword;
    res.json(convertedObject);
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ err: "Invalid credentials." });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: "Invalid credentials." });
    }

    const payload = {
      username: user.username,
      _id: user._id,
      userType: user.userType,
    };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      user: {
        username: user.username,
        userType: user.userType,
      },
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/verify", verifyToken, (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;
