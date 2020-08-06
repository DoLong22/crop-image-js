var loadFile = function (event) {
    const windowCropping = document.getElementById('window-cropping');
    const image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    if (windowCropping.className.indexOf('croppie-container') > -1) {
        const divCropping = document.getElementById('window-cropping');
        divCropping.removeAttribute('class');
        while (divCropping.firstChild) {
            divCropping.removeChild(divCropping.firstChild);
        }
    }
    const resize = new Croppie(windowCropping, {
        viewport: {
            width: 100,
            height: 100,
            // type: 'square',
            type: 'circle',
        },
        boundary: {
            width: 300,
            height: 300,
        },
        enableOrientation: true,
        showZoomer: false,
        mouseWheelZoom: true
    });
    resize.bind({
        url: image.src,
    });
    const cropImage = () => {
        resize.result({
            type: 'rawcanvas',
            format: 'png',
        }).then(function (canvas) {
            document.getElementById('image-cropped').src = canvas.toDataURL();
        });
    }
    document.getElementById('result').addEventListener('click', cropImage);
};