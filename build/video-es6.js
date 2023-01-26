const videoControls = document.querySelector(".video-controls");

// Stop if HTML5 video isn't supported
if (!document.createElement("video").canPlayType) {
	videoControls.style.display = "none";
}

const video = document.querySelector("video");

// Play/Pause //

const playToggleVid = document.querySelector(".video-toggle");

if (playToggleVid) {
	playToggleVid.addEventListener("click", (e) => {
		if (video.paused) {
			video.play();
			video.preload = "metadata";

			e.target.classList.remove("dashicons-controls-play");
			e.target.classList.add("dashicons-controls-pause");
		} else {
			video.pause();

			e.target.classList.add("dashicons-controls-play");
			e.target.classList.remove("dashicons-controls-pause");
		}
	});
}

// Rewind //
const rewindBtnVid = document.querySelector(".video-rewind");

if (rewindBtnVid) {
	rewindBtnVid.addEventListener("click", () => {
		video.currentTime -= 10.0;
	});
}

// Forward //
const forwardBtnVid = document.querySelector(".video-forward");
if (forwardBtnVid) {
	forwardBtnVid.addEventListener("click", () => {
		video.currentTime += 10.0;
	});
}

// Play Progress //
const playProgressVid = document.querySelector(".video-play-progress");

if (playProgressVid) {
	video.addEventListener("timeupdate", (e) => {
		const timePercentVid = (e.target.currentTime / e.target.duration) * 100;
		playProgressVid.style.width = `${timePercentVid}%`;
	});
}

// Load Progress //
const loadProgressVid = document.querySelector(".video-load-progress");

function updateLoadProgressVid() {
	if (video.buffered.length > 0) {
		const percentVid = (video.buffered.end(0) / video.duration) * 100;

		loadProgressVid.style.width = `${percentVid}%`;
	}
}
if (playProgressVid) {
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
}
// Time Display //
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

if (currenttimeVid) {
	video.addEventListener("timeupdate", (e) => {
		// eslint-disable-next-line no-invalid-this
		currenttimeVid.innerHTML = formatTimeVid(e.target.currentTime);
	});
}

if (durationtimeVid) {
	video.addEventListener("durationchange", (e) => {
		// eslint-disable-next-line no-invalid-this
		durationtimeVid.innerHTML = formatTimeVid(e.target.duration);
	});
}
// volume //
const volumeVid = document.querySelector(".video-volume");
if (volumeVid) {
	volumeVid.addEventListener("change", (event) => {
		video.volume = event.target.value;
	});
}

// seeker //
const seekVid = document.querySelector(".video-seek");
const playbackVid = document.querySelector(".video-playback");

// update seeker //
function updateseekmaxVid(event) {
	if (event.target.duration) {
		seekVid.max = event.target.duration;
	}
}

// update playback //
function updateplaybackmaxVid(event) {
	if (event.target.duration) {
		playbackVid.max = event.target.duration;
	}
}

if (seekVid) {
	video.addEventListener("durationchange", updateseekmaxVid);
}

if (playbackVid) {
	video.addEventListener("durationchange", updateplaybackmaxVid);
}
// seeker hander //
function seekhandlerVid(event) {
	video.currentTime = event.target.value;
	playbackVid.value = event.target.value;
}

if (playbackVid && seekVid) {
	seekVid.addEventListener("change", seekhandlerVid);
}

const muteBtn = document.querySelector("#mute-volume");

if (muteBtn) {
	muteBtn.addEventListener("click", (e) => {
		e.preventDefault();

		video.muted = !video.muted;

		if (video.muted) {
			e.target.classList.remove("dashicons-controls-volumeon");
			e.target.classList.add("dashicons-controls-volumeoff");
			video.mute = true;
		} else {
			e.target.classList.add("dashicons-controls-volumeon");
			e.target.classList.remove("dashicons-controls-volumeoff");
			video.mute = false;
		}
	});
}
