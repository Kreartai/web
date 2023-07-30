import dbConnect from "@/libs/dbConnect"
import UserModel from "@/models/UserModel"

export default async function handler(req, res) {
  if(req.method=="GET"){
   try{
    await dbConnect()
    const uid = req.cookies.uid
    const user = await UserModel.findOne({uid}).select({_id:0, password:0, securityKey:0})
    res.send({status:'ok', user})
   }catch(err){
    console.log(err);
   }
  }
} 