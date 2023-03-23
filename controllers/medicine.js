const user_Collection = require("../models/user");
const add_Medicine = async (req, res) => {
  console.log("Add medicine route called");
  console.log(req.body);
  try {
    const userId = req.body.userId;

    let user = await user_Collection.findOne({ _id: userId });
    console.log(user);
    if (user == null) {
      return res.status(500).send("User dont exist in database");
    }

    let updated;
    let prev = user.medicine_timings;

    for (let t of req.body.timings) {
      let m = [];
      m.push(t);
      m.push(req.body.tabletName)
      m.push(req.body.qty);
      for (let image of req.body.imageurls) {
        m.push(image);
      }
      prev.push(m);
    }
    updated = await user_Collection.findOneAndUpdate(
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
    // m.push(req.body.time);
    // m.push(req.body.qty);
    // m.push(req.body.imageUrl);

    res.status(201).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//write a function named getMedicines to get all medicines of user with userId
const getMedicines = async (req, res) => {
  try {
    const userId = req.params.userId;
    let user = await user_Collection.findOne({ _id: userId });
    if (user == null) {
      return res.status(500).send("User dont exist in database");
    }
    res.status(200).json(user.medicine_timings);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
module.exports = { add_Medicine ,getMedicines};
