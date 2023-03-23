const express = require("express");
const router = express.Router();
const { push_notifications } = require("../api/notifications");

router.get("/push_notifications/:userId", push_notifications);

module.exports = router;
