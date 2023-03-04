const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
    hospitalName: {
      type: String,
      // required:true
    },
    patients: {
      type: ["String"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
