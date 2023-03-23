const express = require("express");
const router = express.Router();
const {
  register_Admin,
  addPatient,
  Add_Admin_Details,
  is_Admin_Exists,
  patientslist,
} = require("../controllers/admin");

router.post("/register", register_Admin);
router.post("/addDetails/:adminId", Add_Admin_Details);
router.get("/isAdminExists/:adminId", is_Admin_Exists);
router.get("/patientslist/:adminId", patientslist);

router.get("/add_patient/:phone_no/:adminId", addPatient);

module.exports = router;
