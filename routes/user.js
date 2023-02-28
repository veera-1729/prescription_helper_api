const express = require("express")
const router = express.Router()
const {addMedicine,register}  =  require("../controllers/user")

router.post("/register",register)
router.get("/add_medicine/:userId",addMedicine)

module.exports = router