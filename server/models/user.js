import mongoose from "mongoose";

const userModel = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  mobile:{
    type: String,
    required: true
  },
  id:{
    type: String,
    required: true
  },
  id_number: {
    type: String,
    required: true
  },
  gaurdType: {
    Type: String,
  },
  gaurdName:{
    type: String,
  },
  email:{
    type: String,
  },
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: null
  },
  nationality:{
    type: String,
    default: "India"
  }

})


export default mongoose.model('users', userModel)