import {v2 as cloudinary} from 'cloudinary';
require('dotenv').config()         



let isConnected = false;
async function cloudinaryConnect () {
  return new Promise((resolve, reject)=>{
    if(!isConnected){
      console.log('connecting cloudinary');
       cloudinary.config({ 
        cloud_name: 'dlwfpkwwp', 
        api_key: '634977678565211', 
        api_secret:  process.env.CLOUDINARY_SECRET
      });
      isConnected = true
      resolve('Connected')
    }else{
      console.log('already connected cloudinary');
      resolve('Connected')
    }
  })
}

export default cloudinaryConnect