import React from 'react'
import MicRecorder from 'mic-recorder-to-mp3'

function AudioRecorder() {
  const recorder = new MicRecorder({
    bitRate: 128
  });

  const startRecord = () =>{
    recorder.start().then(() => {
      // something else
      console.log('Record Started');
    }).catch((e) => {
      console.error(e);
    });
  }
 const stopRecord = () =>{
    recorder
    .stop()
    .getMp3().then(([buffer, blob])=>{
      const file = new File(buffer, 'audio.mp3', {
        type: blob.type,
        lastModified: Date.now()
      })
      const player = new Audio(URL.createObjectURL(file));
      player.play();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('text', "hello world");
      fetch('/api/test', {
        method:"POST",
        body: formData
      })
      .then(res=>res.json())
      .then(f=>{
        console.log(f, 'form');
      })
    })
  }



  return (
    <div>
      <button onClick={startRecord}>Start</button>
      <button onClick={stopRecord}>Stop</button>
    </div>
  )
}

export default AudioRecorder