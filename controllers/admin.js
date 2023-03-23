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
      ...req.body,
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

const Add_Admin_Details = async (req, res) => {
  try {
    console.log(req.body);
    const admin = await admin_Collection.findOne({ _id: req.params.adminId });
    if (admin === null) {
      return res.status(400).send("admin does not exist with given phone no");
    }
    let updated = await admin_Collection.findOneAndUpdate(
      { _id: req.params.adminId },
      {
        $set: {
          location: req.body.location,
          gender: req.body.gender === "male" ? "male" : "female",
          hospitalName: req.body.hospital_name,
          age: req.body.age,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );
    const { firebase_token, updatedAt, createdAt, __v, ...otherDetails } =
      updated._doc;
    res.status(200).send(otherDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send(`${error}`);
  }
};
const is_Admin_Exists = async (req, res) => {
  console.log("IS Existing route called");
  try {
    let details = await admin_Collection.findOne({ _id: req.params.adminId });
    console.log(details);
    if (details === null) {
      return res.status(400).send("Admin does not exist with given phone no");
    }
    if (details.hospitalName !== "" && details.location !== "") {
      console.log(true);
      return res.status(200).send("true");
    } else {
      console.log(false)
      return res.status(200).send("false");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`${error}`);
  }
};

const patientslist = async (req, res) => {
  try {
    let details = await admin_Collection.findOne({ _id: req.params.adminId });
    let patients = details.patients;
    //write method for populating all patients details from user collection
    let users = await user_Collection.find({ _id: { $in: patients } });
    let usersDetails = [];
    for (let user of users) {
      let {
        firebase_token,
        updatedAt,
        createdAt,
        __v,
        medicine_timings,
        ...otherDetails
      } = user._doc;
      usersDetails.push(otherDetails);
    }
    console.log(users);
    return res.status(200).send(usersDetails);
    // return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(`${err}`);
  }
};
module.exports = {
  register_Admin,
  addPatient,
  Add_Admin_Details,
  is_Admin_Exists,
  patientslist,
};
