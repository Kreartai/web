// import useDownloader from "react-use-downloader";
// const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();
// download(sImage, "image.png");

const downloadCanvas = function (dataurl) {
  var link = document.createElement("a");
  link.download = "filename.png";
  // link.href = document.getElementById('canvas').toDataURL()
  link.href = dataurl;
  link.click();
};

const downloadImage = (sImage) => {
  
  toast("Downloading..");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const originalImage = new Image();
  originalImage.crossOrigin = "anonymous";
  originalImage.src = sImage;
  originalImage.onload = async function () {
    const canvasWidth = originalImage.width || 1920;
    const canvasHeight = originalImage.height || 1080;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.drawImage(originalImage, 0, 0);
    downloadCanvas(canvas.toDataURL());
  }
};

export default downloadImage