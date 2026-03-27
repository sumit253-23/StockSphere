const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserModel } = require("../Model/UserModel");
const authMiddleware = require("../Middleware/authMiddleware");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// ✅ Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const normalizedEmail = email?.trim();
    const normalizedUsername = username?.trim();

    if (!normalizedEmail || !normalizedUsername || !password) {
      return res.status(400).json({
        message: "please fill all the fields",
      });
    }

    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
      });
    }

    const newUser = new UserModel({
      email: normalizedEmail,
      username: normalizedUsername,
      password, // 🔥 hashing schema me ho raha hai
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "user created successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });

  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

/// login route
router.post("/login",async(req,res)=>{
  try {
    const {email,password}=req.body;
    const normalizedEmail = email?.trim();

    if(!normalizedEmail || !password){
      return res.status(400).json({
        message:"Email and password required",
      });
    }

    // check user 
    const user= await UserModel.findOne({email: normalizedEmail});
    if(!user){
      return res.status(400).json({
        message:"User not found"
      });
    }
    // check password
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({
        message:"Invalid password"
      });
    }
    // generate token
   const token = jwt.sign(
  { id: user._id },
  JWT_SECRET, 
  { expiresIn: "1d" }
);
    res.json({
      message:"Login succesful",
      token,
      user:{
        id:user._id,
        email: user.email,
        username:user.username,
      },
    });
    
  }
  catch(error){
    console.error(error);
    res.status(500).json({
      message:"Server error"
    });

  }
  
});

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected route",
    user: req.user,
  });
});


module.exports = router;
