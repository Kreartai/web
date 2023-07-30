import dbConnect from "@/libs/dbConnect";
import { createJwtToken } from "@/libs/jwt";
import UserModel from "@/models/UserModel";
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const {v4} = require('uuid')

export default async function signup(req, res){
  try{
    if(req.method=='POST'){
      await dbConnect()
      const {name, email, password, uid, dob, securityKey} = req.body

      if(uid){
        console.log('has  uid');
        const user = await UserModel.findOne({uid})
        if(user){
          console.log('is  user');
          const hash = user.password
          const isMatched = bcrypt.compareSync("pass"+uid, hash);
          if(isMatched){
            console.log('is matched pass');
            const jwtToken = createJwtToken({email, name:user.name, id: user._id})
            res.send({status:'ok', token: jwtToken, name:user.name, email:user.email, uid: user.uid})
          }else{
            res.status(500).json({error:'Password not matched'})
          }
        }else{
          console.log('not user');
          const hashedPass = bcrypt.hashSync("pass"+uid, salt);
          const user = new UserModel({
            name, email, password:hashedPass,
            uid
          })
          user.save()
          .then(()=>{
            const jwtToken = createJwtToken({email, name:name, uid})
            res.send({status:'ok', token: jwtToken, name, uid, email})
          })
          .catch(err=>{
            res.status(500).json({status:'error'})
          })
        }
      }else{
        const hashedPass = bcrypt.hashSync(password, salt);
        const user = new UserModel({
          name, email, password:hashedPass, dob, uid: v4(), securityKey
        })
        user.save()
        .then(()=>{
          res.send({status:'ok'})
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({status:'error'})
        })
      }
      

      
    }
  }catch(err){
    console.log(err);
  }
}