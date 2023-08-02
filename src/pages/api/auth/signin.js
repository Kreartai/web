import dbConnect from "@/libs/dbConnect";
import {createJwtToken} from "@/libs/jwt";
import UserModel from "@/models/UserModel";
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


export default async function signin(req, res){
  try{
    if(req.method=='POST'){
      await dbConnect()
      const {email, password} = req.body
      const user = await UserModel.findOne({email})
      const hash = user.password
      const isMatched = bcrypt.compareSync(password, hash);
      if(isMatched){
        const jwtToken = createJwtToken({name:user.name, uid: user.uid})
        res.send({status:'ok', verified:true, token: jwtToken, name:user.name, uid:user.uid, _id:user._id})
      }else{
        res.send({status:'Password not matched', verified:false})
      }
      
      
    }
  }catch(err){
    console.log(err);
  }
}