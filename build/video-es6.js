const videoControls = document.querySelector(".video-controls");

// Stop if HTML5 video isn't supported
if (!document.createElement("video").canPlayType) {
	videoControls.style.display = "none";
}

const video = document.querySelector("video");

// Play/Pause ============================//

const playToggleVid = document.querySelector(".video-toggle");

playToggleVid.addEventListener("click", (e) => {
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
const rewindBtnVid = document.querySelector(".video-rewind");

rewindBtnVid.addEventListener("click", (e) => {
	e.target.innerHTML =
		'<i class="fa fa-backward" aria-hidden="true" title="Backward"></i>';
	video.currentTime -= 10.0;
});

// Forward ============================//
const forwardBtnVid = document.querySelector(".video-forward");

forwardBtnVid.addEventListener("click", (e) => {
	e.target.innerHTML =
		'<i class="fa fa-forward" aria-hidden="true" title="Forward"></i>';
	video.currentTime += 10.0;
});

// Play Progress ============================//
const playProgressVid = document.querySelector(".video-play-progress");

video.addEventListener("timeupdate", (e) => {
	const timePercentVid = (e.target.currentTime / e.target.duration) * 100;
	playProgressVid.style.width = `${timePercentVid}%`;
});

// Load Progress ============================//
const loadProgressVid = document.querySelector(".video-load-progress");

function updateLoadProgressVid() {
	if (video.buffered.length > 0) {
		const percentVid = (video.buffered.end(0) / video.duration) * 100;
		loadProgressVid.style.width = `${percentVid}%`;
	}
}

video.addEventListener("progress", () => {
	updateLoadProgressVid();
});
video.addEventListener("loadeddata", () => {
	updateLoadProgressVid();
});
video.addEventListener("canplaythrough", () => {
	updateLoadProgressVid();
});
video.addEventListener("playing", () => {
	updateLoadProgressVid();
});

// Time Display =============================//
const durationtimeVid = document.querySelector(".video-duration");
const currenttimeVid = document.querySelector(".video-current");

function formatTimeVid(seconds) {
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
	currenttimeVid.innerHTML = formatTimeVid(this.currentTime);
});

video.addEventListener("durationchange", () => {
	// eslint-disable-next-line no-invalid-this
	durationtimeVid.innerHTML = formatTimeVid(this.duration);
});

// volume =============================//
const volumeVid = document.querySelector(".video-volume");
volumeVid.addEventListener("change", (event) => {
	video.volume = event.target.value;
});

// seeker =============================//
const seekVid = document.querySelector(".video-seek");
const playbackVid = document.querySelector(".video-playback");

// update seeker =============================//
function updateseekmaxVid(event) {
	if (event.target.duration) {
		seekVid.max = event.target.duration;
	}
}

// update playback =============================//
function updateplaybackmaxVid(event) {
	if (event.target.duration) {
		playbackVid.max = event.target.duration;
	}
}

video.addEventListener("durationchange", updateseekmaxVid);
video.addEventListener("durationchange", updateplaybackmaxVid);

// seeker hander =============================//
function seekhandlerVid(event) {
	video.currentTime = event.target.value;
	playbackVid.value = event.target.value;
}

seekVid.addEventListener("change", seekhandlerVid);
