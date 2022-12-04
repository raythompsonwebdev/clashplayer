const videoControls = document.getElementById("video-controls");

// Stop if HTML5 video isn't supported
if (!document.createElement("video").canPlayType) {
	videoControls.style.display = "none";
}

const video = document.querySelector("video");

// Play/Pause ============================//

const playToggle = document.querySelector("#play-toggle");

playToggle.addEventListener("click", (e) => {
	if (video.paused) {
		video.play();
		video.preload = "metadata";

		e.target.innerHTML =
			'<i class="fa fa-pause" aria-hidden="true" title="Pause"></i>';
	} else {
		video.pause();

		e.target.innerHTML =
			'<i class="fa fa-play" aria-hidden="true" title="Play"></i>';
	}
});

// Rewind ============================//
const rewindBtn = document.getElementById("rewind");

rewindBtn.addEventListener("click", (e) => {
	e.target.innerHTML =
		'<i class="fa fa-backward" aria-hidden="true" title="Backward"></i>';
	video.currentTime -= 10.0;
});

// Forward ============================//
const forwardBtn = document.getElementById("forward");

forwardBtn.addEventListener("click", (e) => {
	e.target.innerHTML =
		'<i class="fa fa-forward" aria-hidden="true" title="Forward"></i>';
	video.currentTime += 10.0;
});

// Play Progress ============================//
const playProgress = document.getElementById("play_progress");

video.addEventListener("timeupdate", (e) => {
	const timePercent = (e.target.currentTime / e.target.duration) * 100;
	playProgress.style.width = `${timePercent}%`;
});

// Load Progress ============================//

const loadProgress = document.getElementById("load-progress");

function updateLoadProgress() {
	if (video.buffered.length > 0) {
		const percent = (video.buffered.end(0) / video.duration) * 100;
		loadProgress.style.width = `${percent}%`;
	}
}

video.addEventListener("progress", () => {
	updateLoadProgress();
});
video.addEventListener("loadeddata", () => {
	updateLoadProgress();
});
video.addEventListener("canplaythrough", () => {
	updateLoadProgress();
});
video.addEventListener("playing", () => {
	updateLoadProgress();
});

// Time Display =============================//

const durationtime = document.getElementById("duration-time");
const currenttime = document.getElementById("current-time");

function formatTime(seconds) {
	// eslint-disable-next-line no-var, no-redeclare
	var seconds = Math.round(seconds);
	let minutes = Math.floor(seconds / 60);
	// Remaining seconds
	// eslint-disable-next-line no-param-reassign
	seconds = Math.floor(seconds % 60);
	// Add leading Zeros
	minutes = minutes >= 10 ? minutes : `0${minutes}`;
	// eslint-disable-next-line no-param-reassign
	seconds = seconds >= 10 ? seconds : `0${seconds}`;
	return `${minutes}:${seconds}`;
}

video.addEventListener("timeupdate", () => {
	// eslint-disable-next-line no-invalid-this
	currenttime.innerHTML = formatTime(this.currentTime);
});

video.addEventListener("durationchange", () => {
	// eslint-disable-next-line no-invalid-this
	durationtime.innerHTML = formatTime(this.duration);
});

// volume =============================//
const volume = document.getElementById("volume");
volume.addEventListener("change", (event) => {
	video.volume = event.target.value;
});

// seeker =============================//
const seek = document.getElementById("seek");
const playback = document.getElementById("playback");

// update seeker =============================//
function updateseekmax(event) {
	if (event.target.duration) {
		seek.max = event.target.duration;
	}
}

// update playback =============================//
function updateplaybackmax(event) {
	if (event.target.duration) {
		playback.max = event.target.duration;
	}
}

video.addEventListener("durationchange", updateseekmax);
video.addEventListener("durationchange", updateplaybackmax);

// seeker hander =============================//
function seekhandler(event) {
	video.currentTime = event.target.value;
	playback.value = event.target.value;
}

seek.addEventListener("change", seekhandler);
