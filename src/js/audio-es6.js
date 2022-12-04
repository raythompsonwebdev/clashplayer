const audioControls = document.querySelector(".audio-controls");

// Stop if HTML5 video isn't supported
if (!document.createElement("audio").canPlayType) {
	audioControls.style.display = "none";
}

const audio = document.querySelector("audio");

// Play/Pause ============================//
const playToggle = document.querySelector(".audio-toggle");

playToggle.addEventListener("click", (e) => {
	const isPlaying =
		audio.currentTime > 0 &&
		!audio.paused &&
		!audio.ended &&
		audio.readyState > 2;

	if (!isPlaying) {
		audio.play();
		audio.preload = "metadata";
		e.target.innerHTML =
			'<i class="fa fa-pause" aria-hidden="true" title="Pause"></i>';
	} else {
		audio.pause();
		e.target.innerHTML =
			'<i class="fa fa-play" aria-hidden="true" title="Play"></i>';
	}
});

// Rewind ============================//
const rewindBtn = document.querySelector(".audio-rewind");

rewindBtn.addEventListener("click", (e) => {
	// eslint-disable-next-line no-invalid-this
	e.target.innerHTML =
		'<i class="fa fa-backward" aria-hidden="true" title="Backward"></i>';
	audio.currentTime -= 10.0;
});

// Forward ============================//
const forwardBtn = document.querySelector(".audio-forward");

forwardBtn.addEventListener("click", (e) => {
	// eslint-disable-next-line no-invalid-this
	e.target.innerHTML =
		'<i class="fa fa-forward" aria-hidden="true" title="Forward"></i>';
	audio.currentTime += 10.0;
});

// Play Progress ============================//
const playProgress = document.querySelector(".audio-play-progress");

audio.addEventListener("timeupdate", (e) => {
	// eslint-disable-next-line no-invalid-this
	const timePercent = (e.target.currentTime / e.target.duration) * 100;
	playProgress.style.width = `${timePercent}%`;
});

// Load Progress ============================//

const loadProgress = document.querySelector(".audio-load-progress");

function updateLoadProgress() {
	if (audio.buffered.length > 0) {
		const percent = (audio.buffered.end(0) / audio.duration) * 100;
		loadProgress.style.width = `${percent}%`;
	}
}

audio.addEventListener("progress", () => {
	updateLoadProgress();
});
audio.addEventListener("loadeddata", () => {
	updateLoadProgress();
});
audio.addEventListener("canplaythrough", () => {
	updateLoadProgress();
});
audio.addEventListener("playing", () => {
	updateLoadProgress();
});

// Time Display =============================//

const durationtime = document.querySelector(".audio-duration");
const currenttime = document.querySelector(".audio-current");

function formatTime(seconds) {
	// eslint-disable-next-line no-param-reassign
	seconds = Math.round(seconds);
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

audio.addEventListener("timeupdate", (e) => {
	// eslint-disable-next-line no-invalid-this
	currenttime.innerHTML = formatTime(e.target.currentTime);
});

audio.addEventListener("durationchange", (e) => {
	// eslint-disable-next-line no-invalid-this
	durationtime.innerHTML = formatTime(e.target.duration);
});

// volume =============================//
const volume = document.querySelector(".audio-volume");

volume.addEventListener("change", (event) => {
	audio.volume = event.target.value;
});

// seeker =============================//
const seek = document.querySelector(".audio-seek");
const playback = document.querySelector(".audio-playback");

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

audio.addEventListener("durationchange", updateseekmax);
audio.addEventListener("durationchange", updateplaybackmax);

// seeker hander =============================//
function seekhandler(event) {
	audio.currentTime = event.target.value;
	playback.value = event.target.value;
}

seek.addEventListener("change", seekhandler);
