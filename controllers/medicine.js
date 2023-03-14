const user_Collection = require("../models/user");
const add_Medicine = async (req, res) => {
  console.log("Add medicine route called");
  try {
    const userId = req.body.userId;

    let user = await user_Collection.findOne({ _id: userId });
    console.log(user);
    if (user == null) {
      return res.status(500).send("User dont exist in database");
    }
    let m = [];
    m.push(req.body.time);
    m.push(req.body.qty);
    m.push(req.body.imageUrl);
    let prev = user.medicine_timings;
    prev.push(m); 

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
