const express = require("express");
const router = express.Router();
const { register_Admin,addPatient } = require("../controllers/admin");

router.post("/register", register_Admin);

router.get("/add_patient/:phone_no/:adminId", addPatient);

module.exports = router;
