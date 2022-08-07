const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  FirstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  imag:{type:String},
  wihslist: [{ type: String }],
  likes: [{ type: Number }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);

});

module.exports = mongoose.model("user", userSchema);
