const musicPlayer = document.getElementById('music');
const songListContainer = document.getElementById('songListContainer');
const progressBar = document.getElementById('myProgressBar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

var songs = [
  { title: 'Shiv sama', src: 'song1.mp3' },
  { title: 'Namo namo', src: 'song2.mp3' },
  { title: 'Mera Bhola', src: 'song3.mp3' },
  { title: 'Amritwani', src: 'song4.mp3' },
  { title: 'Har har shambhu', src: 'song5.mp3' },
  { title: 'Chathi Maiya', src: 'song6.mp3' },
  { title: 'Bam bholle', src: 'song7.mp3' },
  { title: 'Ram Siya Ram', src: 'song8.mp3' }
];

let currentSongIndex = -1;

function showSongList() {
  songListContainer.innerHTML = '';
  for (let i = 0; i < songs.length; i++) {
    const songItem = document.createElement('div');
    songItem.textContent = songs[i].title;
    songItem.addEventListener('click', function() {
      loadSong(i);
      play();
    });
    songListContainer.appendChild(songItem);
  }
}

function loadSong(index) {
  currentSongIndex = index;
  const selectedSong = songs[index];
  musicPlayer.src = selectedSong.src;
  musicPlayer.load();

  musicPlayer.addEventListener('loadedmetadata', function() {
    durationDisplay.textContent = formatTime(musicPlayer.duration);
    progressBar.max = musicPlayer.duration;
  });

  // Update track display
  const trackDisplay = document.getElementById('track-display');
  trackDisplay.textContent = selectedSong.title;
}

function play() {
  if (currentSongIndex === -1) {
    currentSongIndex = 0;
    loadSong(currentSongIndex);
  }
  musicPlayer.play();
}

function togglePlay() {
  if (musicPlayer.paused) {
    play();
  } else {
    musicPlayer.pause();
  }
}

function previous() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  play();
}

function next() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  play();
}

function setVolume(value) {
  musicPlayer.volume = value;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateProgressBar() {
  progressBar.value = musicPlayer.currentTime;
  currentTimeDisplay.textContent = formatTime(musicPlayer.currentTime);
}

function seekTo(value) {
  const seekPercentage = value / 100;
  const seekTime = seekPercentage * musicPlayer.duration;
  musicPlayer.currentTime = seekTime;
}

progressBar.addEventListener('click', function(event) {
  const seekPosition = event.offsetX;
  const progressBarWidth = progressBar.offsetWidth;
  const seekPercentage = seekPosition / progressBarWidth;
  const seekTime = seekPercentage * musicPlayer.duration;
  musicPlayer.currentTime = seekTime;
});

musicPlayer.addEventListener('timeupdate', updateProgressBar);
musicPlayer.addEventListener('ended', next);
