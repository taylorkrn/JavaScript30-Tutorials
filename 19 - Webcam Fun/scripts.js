const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error('You Refused request to your webcame!', err);
        });
}

function paintToCanvas(){
    // const width = video.naturalWidth;
    // const height = video.naturalHeight;
    // console.log(width, height);
    canvas.width = 200;
    canvas.height = 150;

    return setInterval(() =>{
        ctx.drawImage(video, 0, 0, 200, 150);
        // take pixels out
        let pixels = ctx.getImageData(0,0,200,150);
        // mess with pixels
        pixels = rgbSplit(pixels);
        ctx.globalAlpha=0.1; //Ghosting effect
        // put pixels back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto(){
    //play the sound
    snap.currentTime = 0;
    snap.play();

    //take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt = "Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i] = pixels.data[i] + 100//red
        pixels.data[i+1] = pixels.data[i+1] - 50 //green
        pixels.data[i+2] = pixels.data[i+2] * 0.5 //blue
    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i - 100] = pixels.data[i]//red
        pixels.data[i + 500] = pixels.data[i+1] //green
        pixels.data[i - 550] = pixels.data[i+2] //blue
    }
    return pixels;
}

getVideo()

video.addEventListener('canplay', paintToCanvas);
