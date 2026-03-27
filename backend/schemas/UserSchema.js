const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "your username is required"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);