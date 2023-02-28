const user_Collection = require("../models/user.js")

const register = async (req, res) => {
    try{
        const user = await user_Collection.findOne({phone_no:req.body.phone_no})
        if(user != null)
        {
           return res.status(400).json({message:"User with given phone no already exists"})
        }
        const newuser = await user_Collection.create(req.body)
        return res.status(201).json({Message:newuser})

    }
    catch(err){
        return res.status(500).json({Error:`${err}`})
    }
}

const addMedicine = async (req,res) => {

}

module.exports = {addMedicine,register}