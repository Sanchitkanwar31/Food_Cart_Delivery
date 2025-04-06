const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  location: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" }, // 👈 Updated field name
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
