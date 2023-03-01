const user_Collection = require("../models/user.js");

const register = async (req, res) => {
  try {
    const user = await user_Collection.findOne({ phone_no: req.body.phone_no });
    if (user != null) {
      return res
        .status(400)
        .json({ message: "User with given phone no already exists" });
    }
    const newuser = await user_Collection.create(req.body);
    return res.status(201).json({ Message: newuser });
  } catch (err) {
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

module.exports = { addMedicine, register, is_User_Exists };
