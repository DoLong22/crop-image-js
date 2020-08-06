function crop(url, aspectRatio) {
    // we return a Promise that gets resolved with our canvas element
    return new Promise(resolve => {

        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {
            // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;
console.log("width="+inputWidth+" " +"height="+inputHeight);
            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;
console.log(inputImageAspectRatio);
            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
                outputWidth = inputHeight * aspectRatio;
            } else if (inputImageAspectRatio < aspectRatio) {
                outputHeight = inputWidth / aspectRatio;
            }
            console.log("outputwidth="+outputWidth+" " +"outputheight="+outputHeight);

            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * .5;
            const outputY = (outputHeight - inputHeight) * .5;

            console.log(outputX+" "+outputY)
            // create a canvas that will present the output image
            const outputImage = document.createElement('canvas');

            // set it to the same size as the image
            outputImage.width = 345;
            outputImage.height = 230;

            // draw our image at position 0, 0 on the canvas
            const ctx = outputImage.getContext('2d');
            //ctx.drawImage(inputImage, 0, 120);
            ctx.drawImage(inputImage, 33, 71, 104, 124, 21, 120, 104, 124);
            document.body.appendChild(inputImage);
            
            resolve(outputImage);
        };

        // start loading our image
        inputImage.src = url;
    })
    
}
crop('./22.png', 1).then(canvas => {
    document.body.appendChild(canvas);
  })
