const user_Collection = require("../models/user.js");
const admin_Collection = require("../models/admin.js");

const register = async (req, res) => {
  console.log("Register route called");
  console.log(req.body);
  try {
    const user = await user_Collection.findOne({ phone_no: req.body.phone_no });
    if (user != null) {
      const {
        medicine_timings,
        firebase_token,
        updatedAt,
        createdAt,
        __v,
        ...otherDetails
      } = user._doc;
      console.log("User already exists so logged in");
      return res.status(200).send(otherDetails);
    }
    const newuser = await user_Collection.create({
      phone_no: req.body.phone_no,
      username: req.body.username,
      firebase_token: req.body.firebase_token,
      isAdmin: req.body.isAdmin,
      //medicine_timings: req.body.medicine_timings,
    });
    const {
      medicine_timings,
      firebase_token,
      updatedAt,
      createdAt,
      __v,
      ...otherDetails
    } = newuser._doc;

    return res.status(201).json({
      details: otherDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: `${err}` });
  }
};

const is_User_Exists = async (req, res) => {
  try {
    const userId = req.params.userId;
    const isExisting = await user_Collection.findOne({ _id: userId });
    if (isExisting) {
      return res.status(200).json({ message: true });
    } else {
      return res.status(200).json({ message: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const addMedicine = async (req, res) => {};

const register_Admin = async (req, res) => {
  console.log("Admin register route called..");
  try {
    const newAdmin = await admin_Collection.create(req.body);
    res
      .status(201)
      .json({ message: "Admin registered successfully", userId: newAdmin._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while registering admin" });
  }
};

module.exports = { addMedicine, register, is_User_Exists, register_Admin };
