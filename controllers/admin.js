const admin_Collection = require("../models/admin.js");
const user_Collection = require("../models/user");

const register_Admin = async (req, res) => {
  console.log("admin Register route called");
  console.log(req.body);
  try {
    const user = await admin_Collection.findOne({
      phone_no: req.body.phone_no,
    });
    if (user != null) {
      const { firebase_token, updatedAt, createdAt, __v, ...otherDetails } =
        user._doc;
      console.log("admin already exists so logged in");
      return res.status(200).send(otherDetails);
    }
    const newuser = await admin_Collection.create({
      phone_no: req.body.phone_no,
      username: req.body.username,
      firebase_token: req.body.firebase_token,

      //medicine_timings: req.body.medicine_timings,
    });
    const { firebase_token, updatedAt, createdAt, __v, ...otherDetails } =
      newuser._doc;

    return res.status(201).send(otherDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: `${err}` });
  }
};

const addPatient = async (req, res) => {
  try {
    const phone_no = req.params.phone_no;
    const adminId = req.params.adminId;
    const user = await user_Collection.findOne({ phone_no: phone_no });
    if (user === null) {
      return res.status(400).send("User does not exist with given phone no");
    }
    const adminDetails = await admin_Collection.findOne({ _id: adminId });
    if (adminDetails === null) {
      return res.status(400).send("admin does not exist with given phone no");
    }
    let patients = adminDetails.patients;
    if (!patients.includes(user._id)) patients.push(user._id);
    const updated = await admin_Collection.findOneAndUpdate(
      { _id: adminId },
      {
        $set: {
          patients: patients,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        findAndModify: false,
      }
    );
    const { firebase_token, updatedAt, createdAt, __v, ...otherDetails } =
      user._doc;
    res.status(200).send(otherDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send(`${error}`);
  }
};
module.exports = { register_Admin, addPatient };
