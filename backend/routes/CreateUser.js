
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const { check, validationResult } = require("express-validator"); // Import Express Validator
const bcrypt = require("bcrypt");

const  jwtsecret = "thisismyfirstmernproject";
const jwt = require("jsonwebtoken");

// Define the route for creating a user
router.post(
  "/createuser",
  [
    // Validation checks
    check("name").isString().withMessage("Name must be a string"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("email").isEmail().withMessage("Invalid email"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    //encrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    let secpaswd = await bcrypt.hash(req.body.password,salt)


    try {
      //  accessing the correct properties from `req.body`
      const { name, email, password, location, role } = req.body;

      // Create a new user with the provided data
      await User.create({
        name: name, 
        email: email,
        password: secpaswd,
        location: location,
        role: role || "user", 
      });

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

//define routr for validating login
router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt with email:", email);

    // Check if the user exists
    const userdata = await User.findOne({ email });
    if (!userdata) {
      console.log("User not found");
      return res.status(400).json({ success: false, error: "Invalid email or password" });
    }

    // Verify the password
    const pwdcmp = await bcrypt.compare(password, userdata.password);
    console.log("Password comparison result:", pwdcmp);

    if (!pwdcmp) {
      return res.status(400).json({ success: false, error: "Invalid email or password" });
    }

    // Generate JWT token
    const data = { user: { id: userdata.id } };
    const authtoken = jwt.sign(data, jwtsecret);
    console.log("Generated Auth Token:", authtoken);

    res.json({ success: true, message: "Login successful", authtoken,  role: userdata.role, });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});




module.exports = router;
