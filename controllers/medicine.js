const user_Collection = require("../models/user");
const add_Medicine = async (req, res) => {

    console.log("Add medicine route called")
  try {
    const userId = req.params.userId;
    let user = await user_Collection.findOne({ _id: userId });
    if (user == null) {
      return res.status(500).send("User dont exist in database");
    }
    let m = {};
    m["img"] = req.body.imageUrl;
    m["qty"] = req.body.qty;
    let newMed = {};
    let time = req.body.time;
    newMed[`${time}`] = m;
    console.log(newMed);

    let prev = user.medicine_timings;
    prev.push(newMed);

    const updated = await user_Collection.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          medicine_timings: prev,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        findAndModify: false,
      }
    );
    res.status(201).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { add_Medicine };
