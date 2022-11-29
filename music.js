 const image = document.getElementById('img');
 const title = document.getElementById('title');
 const artist = document.getElementById('artist');
 const music = document.querySelector('audio');
 const progressContainer = document.getElementById('progress-container');
 const durationEl = document.getElementById('duration');
 const currentTimeEl = document.getElementById('current-time');
 const progress = document.getElementById('progress');
 const prevBtn = document.getElementById('prev');
 const playBtn = document.getElementById('play');
 const nextBtn = document.getElementById('next');


 //music
 const songs = [{
    name: 'Don Moen-1',
    displayName: 'Amazing Love',
    artist: `Don Moen`
 },
 {
    name: 'Don Moen-2',
    displayName: 'Be Magnified',
    artist: `Don Moen`
    },
    {
    name: 'Don Moen-3',
    displayName: 'Be It Unto Me',
    artist: `Don Moen`
    },
    {
    name: 'Don Moen-4',
    displayName: 'Blessed Be the Name',
    artist: `Don Moen`
    },
    {
    name: 'Don Moen-5',
    displayName: 'Unto your',
    artist: `Don Moen`
    }
    ,
    {
    name: 'Don Moen-6',
    displayName: 'Deeper In love',
    artist: `Don Moen`
    }
    ,
    {
    name: 'Don Moen-7',
    displayName: 'Blessed be',
    artist: `Don Moen`
    }
    

 ];

 //check iif is playing
 let isPlaying = false;

 // play
 function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play()
 }
// pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
}
// Play or Pause Event listener
playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong())); 

// Update DOM

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `images/${song.name}.jpg`;
    
}
// Current song 
let songIndex = 0;


// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }
  
  // Next Song
  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }
  
  // On Load - Select First Song
  loadSong(songs[songIndex]);


// update progress bar and time
function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        // Update progress bar 
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;

          // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
    }

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
  }
  
  // Event Listeners
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  music.addEventListener('ended', nextSong);
  music.addEventListener('timeupdate', updateProgressBar);
  progressContainer.addEventListener('click', setProgressBar);