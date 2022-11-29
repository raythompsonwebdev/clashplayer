var audioControls = document.getElementById("audio-controls");

//Stop if HTML5 video isn't supported
if (!document.createElement("audio").canPlayType) {
	audioControls.style.display = "none";
}

var audio = document.querySelector("audio");

// Play/Pause ============================//

var playToggle = document.querySelector("#play-toggle");

playToggle.addEventListener("click", function () {
	var isPlaying =
		audio.currentTime > 0 &&
		!audio.paused &&
		!audio.ended &&
		audio.readyState > 2;

	if (!isPlaying) {
		audio.play();
		audio.preload = "metadata";
		this.innerHTML =
			'<i class="fa fa-pause" aria-hidden="true" title="Pause"></i>';
	} else {
		audio.pause();
		this.innerHTML =
			'<i class="fa fa-play" aria-hidden="true" title="Play"></i>';
	}
});

// Rewind ============================//
var rewindBtn = document.getElementById("rewind");

rewindBtn.addEventListener("click", function () {
	this.innerHTML =
		'<i class="fa fa-backward" aria-hidden="true" title="Backward"></i>';
	audio.currentTime -= 10.0;
});

// Forward ============================//
var forwardBtn = document.getElementById("forward");

forwardBtn.addEventListener("click", function () {
	this.innerHTML =
		'<i class="fa fa-forward" aria-hidden="true" title="Forward"></i>';
	audio.currentTime += 10.0;
});

// Play Progress ============================//
var playProgress = document.getElementById("play-progress");

audio.addEventListener("timeupdate", function () {
	var timePercent = (this.currentTime / this.duration) * 100;
	playProgress.style.width = timePercent + "%";
});

// Load Progress ============================//

var loadProgress = document.getElementById("load-progress");

function updateLoadProgress() {
	if (audio.buffered.length > 0) {
		var percent = (audio.buffered.end(0) / audio.duration) * 100;
		loadProgress.style.width = percent + "%";
	}
}

audio.addEventListener("progress", function () {
	updateLoadProgress();
});
audio.addEventListener("loadeddata", function () {
	updateLoadProgress();
});
audio.addEventListener("canplaythrough", function () {
	updateLoadProgress();
});
audio.addEventListener("playing", function () {
	updateLoadProgress();
});

// Time Display =============================//

var durationtime = document.getElementById("duration-time");
var currenttime = document.getElementById("current-time");

function formatTime(seconds) {
	var seconds = Math.round(seconds);
	var minutes = Math.floor(seconds / 60);
	// Remaining seconds
	seconds = Math.floor(seconds % 60);
	// Add leading Zeros
	minutes = minutes >= 10 ? minutes : "0" + minutes;
	seconds = seconds >= 10 ? seconds : "0" + seconds;
	return minutes + ":" + seconds;
}

audio.addEventListener("timeupdate", function () {
	currenttime.innerHTML = formatTime(this.currentTime);
});

audio.addEventListener("durationchange", function () {
	durationtime.innerHTML = formatTime(this.duration);
});

//volume =============================//
var volume = document.getElementById("volume");

volume.addEventListener("change", function (event) {
	audio.volume = event.target.value;
});

//seeker =============================//
var seek = document.getElementById("seek"),
	playback = document.getElementById("playback");

//update seeker =============================//
function updateseekmax(event) {
	if (event.target.duration) {
		seek.max = event.target.duration;
	}
}

//update playback =============================//
function updateplaybackmax(event) {
	if (event.target.duration) {
		playback.max = event.target.duration;
	}
}

audio.addEventListener("durationchange", updateseekmax);
audio.addEventListener("durationchange", updateplaybackmax);

//seeker hander =============================//
function seekhandler(event) {
	audio.currentTime = event.target.value;
	playback.value = event.target.value;
}

seek.addEventListener("change", seekhandler);
