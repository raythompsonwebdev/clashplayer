const audioControls = document.querySelector(".audio-controls");

// Stop if HTML5 video isn't supported
if (!document.createElement("audio").canPlayType) {
	audioControls.style.display = "none";
}

const audio = document.querySelector("audio");

// Play/Pause //
const playToggle = document.querySelector(".audio-toggle");

if (playToggle) {
	playToggle.addEventListener("click", (e) => {
		// eslint-disable-next-line no-console
		console.log(e);
		const isPlaying =
			audio.currentTime > 0 &&
			!audio.paused &&
			!audio.ended &&
			audio.readyState > 2;

		if (!isPlaying) {
			audio.play();
			audio.preload = "metadata";
			e.target.classList.remove("dashicons-controls-play");
			e.target.classList.add("dashicons-controls-pause");
		} else {
			audio.pause();
			e.target.classList.add("dashicons-controls-play");
			e.target.classList.remove("dashicons-controls-pause");
		}
	});
}

// Rewind //
const rewindBtn = document.querySelector(".audio-rewind");

if (rewindBtn) {
	rewindBtn.addEventListener("click", () => {
		audio.currentTime -= 10.0;
	});
}
// Forward //
const forwardBtn = document.querySelector(".audio-forward");

if (forwardBtn) {
	forwardBtn.addEventListener("click", () => {
		audio.currentTime += 10.0;
	});
}

// Play Progress //
const playProgress = document.querySelector(".audio-play-progress");

if (playProgress) {
	audio.addEventListener("timeupdate", (e) => {
		const timePercent = (e.target.currentTime / e.target.duration) * 100;
		playProgress.style.width = `${timePercent}%`;
	});
}

// Load Progress //
const loadProgress = document.querySelector(".audio-load-progress");

function updateLoadProgress() {
	if (audio.buffered.length > 0) {
		const percent = (audio.buffered.end(0) / audio.duration) * 100;
		loadProgress.style.width = `${percent}%`;
	}
}

if (playProgress) {
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
}
// Time Display //
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

if (currenttime) {
	audio.addEventListener("timeupdate", (e) => {
		// eslint-disable-next-line no-invalid-this
		currenttime.innerHTML = formatTime(e.target.currentTime);
	});

	audio.addEventListener("durationchange", (e) => {
		// eslint-disable-next-line no-invalid-this
		durationtime.innerHTML = formatTime(e.target.duration);
	});
}

// volume //
const volume = document.querySelector(".audio-volume");

if (volume) {
	volume.addEventListener("change", (event) => {
		audio.volume = event.target.value;
	});
}

// seeker //
const seek = document.querySelector(".audio-seek");
const playback = document.querySelector(".audio-playback");

// update seeker //
function updateseekmax(event) {
	if (event.target.duration) {
		seek.max = event.target.duration;
	}
}

// update playback //
function updateplaybackmax(event) {
	if (event.target.duration) {
		playback.max = event.target.duration;
	}
}

if (seek) {
	audio.addEventListener("durationchange", updateseekmax);
}

if (playback) {
	audio.addEventListener("durationchange", updateplaybackmax);
}

// seeker hander //
function seekhandler(event) {
	audio.currentTime = event.target.value;
	playback.value = event.target.value;
}
if (playback && seek) {
	seek.addEventListener("change", seekhandler);
}

const muteBtn = document.querySelector("#mute-volume");

if (seek) {
	muteBtn.addEventListener("click", (e) => {
		e.preventDefault();

		audio.muted = !audio.muted;

		if (audio.muted) {
			e.target.classList.remove("dashicons-controls-volumeon");
			e.target.classList.add("dashicons-controls-volumeoff");
			audio.mute = true;
		} else {
			e.target.classList.add("dashicons-controls-volumeon");
			e.target.classList.remove("dashicons-controls-volumeoff");
			audio.mute = false;
		}
	});
}
