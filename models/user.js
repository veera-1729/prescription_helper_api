const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    firebase_token: {
      type: String,
      required: true,
    },
    medicine_timings: {
      type: ["Mixed"],
      //["hour":{"img","qty"}]
    },
    status: {
      type: Boolean,
    },
    days_left: {
      type: Number,
    },
    no_days: {
      type: Number,
      //required:true
    },
    isAdmin: {
      type: String,
      default: "false",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
