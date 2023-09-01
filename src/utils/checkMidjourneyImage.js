const checkMidjourneyImage = ({msgId}) => {
  return fetch('/api/check-midjourney-image?id='+msgId)
  .then(res=>res.json())
  .then(res=>{
    if(res.progress == 100){
      return {progress:res.progress, images: res.response.imageUrls}
    }else if(res.progress > 0){
        return {progress:res.progress, progressImage: res.progressImageUrl}
    }else{
      return { progress:res.progress}
    }
  })
}

export default checkMidjourneyImage