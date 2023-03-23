const router = require("express").Router();
const { add_Medicine, getMedicines } = require("../api/medicine");

router.post("/addMedicine", add_Medicine);
router.get("/getMedicines/:userId", getMedicines);

module.exports = router;