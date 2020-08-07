function crop(url, aspectRatio) {
  // we return a Promise that gets resolved with our canvas element
  return new Promise((resolve) => {
    // this image will hold our source image data
    const inputImage = new Image();
    //loading imgage input
    inputImage.src = url;
    // we want to wait for our image to load
    inputImage.onload = () => {
      // let's store the width and height of our image
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;
      // get the aspect ratio of the input image
      const inputImageAspectRatio = inputWidth / inputHeight;
      // if it's bigger than our target aspect ratio
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }
      // calculate the position to draw the image at
      const outputX = (outputWidth - inputWidth) * 0.5;
      const outputY = (outputHeight - inputHeight) * 0.5;
      // create a canvas that will present the output image
      const outputImage = document.createElement("canvas");
      // set it to the same size as the image
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;
      // draw our image at position 0, 0 on the canvas
      const ctx = outputImage.getContext("2d");
      console.log(ctx);
      ctx.drawImage(inputImage, outputX, outputY);
      //   ctx.drawImage(inputImage, 33, 71, 104, 124, 21, 120, 104, 124);
      document.body.appendChild(inputImage);
      resolve(outputImage);
    };
  });
}
function loadFile(event) {
  const image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);

  crop(image.src, 1).then((canvas) => {
    console.log(canvas.getContext);
    document.body.appendChild(canvas);
  });
}
