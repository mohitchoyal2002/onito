import userModel from '../models/user.js'

export const getUsers = async(req, res)=>{
  try{
    const users = await userModel.find()
    res.json(users)
  }
  catch(err){
    res.status(500).json("Something Went Wrong!!")
  }
}

export const saveUser = async(req, res)=>{
  const data = req.body
  try{
    const user = new userModel(data);
    await user.save()
    res.json("User Saved")
  }
  catch(err){
    res.status(500).json("Something went Wrong")
  }
}