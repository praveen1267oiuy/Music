var musicPlayer = document.getElementById("music");
var currentTimeSpan = document.getElementById("current-time");
    var durationSpan = document.getElementById("duration");
    var seekbarProgress = document.getElementById("myProgressBar")

function play() {
  musicPlayer.play();
  updateTime();
}

function forward() {
  musicPlayer.pause();
}

function backward() {
  musicPlayer.pause();
  musicPlayer.currentTime = 0;
}
function setVolume(volume) {
  musicPlayer.volume = volume;
}

function updateTime() {
  currentTimeSpan.textContent = formatTime(musicPlayer.currentTime);
  durationSpan.textContent = formatTime(musicPlayer.duration);
  setTimeout(updateTime, 500);
  seekbarProgress.style.width = (musicPlayer.currentTime / musicPlayer.duration) * 100 + "%";

}
function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}
