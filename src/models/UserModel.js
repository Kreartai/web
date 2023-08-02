const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  name : String,
  email: {
    type: String,
    unique: true
  },
  uid: {
    type: String,
    unique: true, 
  },
  password: {
    type: String,
    required: true
  },
  credit: {
    type: Number,
    default: 10
  },
  dob: Date,
  securityKey: String,
  
})

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)
export default UserModel
