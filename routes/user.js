const express = require("express")
const router = express.Router()
const {addMedicine,register,is_User_Exists}  =  require("../controllers/user")

router.post("/register",register)
router.get("/isExisting/:userId",is_User_Exists)

router.get("/add_medicine/:userId",addMedicine)

module.exports = router