let song = document.getElementById('song');
let songProgress = document.getElementById('song-progress');
let start = document.getElementById('start');
let playControl = document.getElementById('play-control');
let fastForward = document.querySelector('.bx-fast-forward');
let rewind = document.querySelector('.bx-rewind');

song.onloadedmetadata = function(){
    songProgress.max = song.duration;
    songProgress.value = song.currentTime;
}

//playPause funtion handler
function playPause(){
    if(playControl.classList.contains('bx-pause')){
        song.pause();
        playControl.classList.remove('bx-pause');
        playControl.classList.add('bx-play');
    }
    else{
        song.play();
        playControl.classList.remove('bx-play');
        playControl.classList.add('bx-pause');
    }
}

// slider progess when playing
if(song.play()){
    setInterval(()=>{
        songProgress.value = song.currentTime;
    }, 500);
}

// slider progress when skipped
songProgress.onchange = function(){
    song.play();
    song.currentTime = songProgress.value;
    playControl.classList.remove('bx-play');
    playControl.classList.add('bx-pause');
}


//start duration countdown         
song.onloadedmetadata = function(){
    songProgress.max = song.duration;
    start.textContent = formatTime(0); // Update initial time display
};

song.ontimeupdate = function() {
    songProgress.value = song.currentTime;
    start.textContent = formatTime(song.currentTime); // Update time display during playback
};

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// fastforward function handler
function skipForward() {
    song.currentTime += 10; // Fast forward by 10 seconds
}

// rewind function handler
function skipBackward() {
    song.currentTime -= 10; // Rewind by 10 seconds
}

// event listeners to the fast forward and rewind buttons/icons
fastForward.addEventListener('click', skipForward);
rewind.addEventListener('click', skipBackward);

