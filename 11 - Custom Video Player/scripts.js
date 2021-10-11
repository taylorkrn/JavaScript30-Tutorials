/*Get our Elements*/

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.player__button[id="FS"]');



/*Build up functions*/
function togglePlay(){
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
}

function updateButton(){
    if (video.paused){
        toggle.textContent = '►';
    } else{
        toggle.textContent = '❚ ❚';
    }
}


function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

let isClicked = false;

function handleRangeUpdate(){
    if (!isClicked) return;
    video[this.name] = this.value;
}

let mouseDown = false;

function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/*Hook up event listners*/
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);

skipButtons.forEach(skipButton =>{
    skipButton.addEventListener('click', skip)
});

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

ranges.forEach(range => {range.addEventListener('mousedown', () => {isClicked = true;})});
ranges.forEach(range => {range.addEventListener('mouseup', () => {isClicked = false;})});
ranges.forEach(range => {range.addEventListener('mouseout', () => {isClicked = false;})});

video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreen.addEventListener('click', () =>{
    if (video.fullscreenElement){
        video.exitFullscreen();
    } else{
        video.requestFullscreen();
    }
});
