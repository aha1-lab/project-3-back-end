const User = require("../models/User");

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
    const createdUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mode: req.body.mode,
      hashedPassword: bcrypt.hashSync(req.body.password, 12),
    });
    // console.log(createdUser);

    const convertedObject = createdUser.toObject();
    delete convertedObject.hashedPassword;
    res.json(convertedObject);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
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
        mode: user.mode,
      };
  
      const token = jwt.sign({ payload }, process.env.JWT_SECRET);
  
      res.status(200).json({
        token,
        user: {
          username: user.username,
          mode: user.mode,
        },
      });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

router.get("/verify", verifyToken, (req, res) => {
  // console.log(req.user);
  res.json(req.user);
});

module.exports = router;
