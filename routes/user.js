const express = require("express");
const router = express.Router();
const {
  addMedicine,
  register,
  is_User_Exists,
  register_Admin,
} = require("../controllers/user");

router.post("/register", register);
router.post("/admin/register", register_Admin);
router.get("/isExisting/:userId", is_User_Exists);

router.get("/add_medicine/:userId", addMedicine);

module.exports = router;
