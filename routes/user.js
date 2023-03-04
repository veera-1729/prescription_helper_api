const express = require("express");
const router = express.Router();
const { register, is_User_Exists } = require("../controllers/user");

router.post("/register", register);
router.get("/isExisting/:userId", is_User_Exists);

module.exports = router;
