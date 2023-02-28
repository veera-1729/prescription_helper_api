const express = require("express")
const router = express.Router()
const {push_notifications} = require("../controllers/notifications")

router.get("/push_notifications/:userId",push_notifications)

module.exports = router