import MicRecorder from 'mic-recorder-to-mp3'
const recorder = new MicRecorder({
  bitRate: 128
});

export const startRecord = () =>{
 
  recorder.start().then(() => {
    // something else
    console.log('Record Started');
  }).catch((e) => {
    console.error(e);
  });
}
export const stopRecord = () =>{
  return new Promise((resolve, reject)=>{
    recorder.context &&  recorder.stop().getMp3().then(([buffer, blob])=>{
      const file = new File(buffer, 'audio.mp3', {
        type: blob.type,
        lastModified: Date.now()
      })
      // const player = new Audio(URL.createObjectURL(file));
      // player.play();
      resolve(file)
    })
  })
}