const express = require("express");
const router = express.Router();
const { add_Medicine } = require("../controllers/medicine");

router.post("/addMedicine", add_Medicine);

module.exports = router;
