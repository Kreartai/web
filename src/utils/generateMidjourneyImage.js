import checkMidjourneyImage from "./checkMidjourneyImage"

const generateMidjourneyImage = (formData, prompt) => {
  return new Promise((resolve, reject)=>{
    fetch('/api/generate-midjourney-image', {
      method: 'POST', 
      body: formData
    })
    .then(res=>res.json())
    .then(res=>{
      console.log('mj generate started');
      resolve(res)
      
    })
  })
}


export default generateMidjourneyImage