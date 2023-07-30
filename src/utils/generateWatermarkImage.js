const downloadCanvas = function (dataurl, filename) {
  var link = document.createElement("a");
  link.download = filename+".png";
  // link.href = document.getElementById('canvas').toDataURL()
  link.href = dataurl;
  link.click();
};

const generateWatermarkImage = (sImage, prompt) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const originalImage = new Image();
  originalImage.crossOrigin = "anonymous";
  originalImage.src = sImage
  originalImage.onload = async function () {
    const canvasWidth = originalImage.width || 1920;
    const canvasHeight = originalImage.height || 1080;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    await context.drawImage(originalImage, 0, 0);

    
    // initializing the canvas with the original image
    context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

    // adding a blue watermark text in the bottom right corner
    
    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.font = "12px serif";
    context.fillText(
      "Kreart.Ai",
      canvasWidth - 50,
      canvasHeight - 10
    );
    downloadCanvas(canvas.toDataURL(), prompt);
  };
};

export default generateWatermarkImage