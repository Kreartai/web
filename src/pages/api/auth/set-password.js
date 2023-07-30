import UserModel from "@/models/UserModel";
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
export default async function setpassword(req, res){
  if(req.method == 'POST'){
    try{
      const {email, password, dob, securityKey} = req.body
      const user = await UserModel.findOne({email})
      const hashedPass = bcrypt.hashSync(password, salt);
      user.password = hashedPass
      const mydob = new Date(dob).toDateString()
      const userdob = new Date(user.dob).toDateString()
      if(user.email==email && mydob==userdob && user.securityKey == securityKey){
        user.save()
        .then(saved=>{
          res.send({status:'ok', set:true})
        })
        .catch(err=>{
          res.send({status:'error', set:false})
        })
      }else{
        res.send({status:'Something wrong', set:false})
      }
      
      
    }catch(err){
      console.log(err);
    }
  }
}