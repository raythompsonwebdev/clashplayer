window.document.addEventListener("DOMContentLoaded", () => {
	const audioControls = document.querySelector(".audio-controls");

	// Stop if HTML5 video isn't supported
	if (!document.createElement("audio").canPlayType) {
		audioControls.style.display = "none";
	}

	const audio = document.querySelector("#clashaudio-player");

	// Play/Pause ============================//
	const playToggle = document.querySelector(".audio-toggle");
	if (audio !== null) {
		audio.style = "pointer-events: none;";

		playToggle.addEventListener("click", (e) => {
			const isPlaying =
				audio.currentTime > 0 &&
				!audio.paused &&
				!audio.ended &&
				audio.readyState > 2;

			if (!isPlaying) {
				audio.play();
				e.target.classList.remove("dashicons-controls-play");
				e.target.classList.add("dashicons-controls-pause");
			} else {
				audio.pause();
				e.target.classList.add("dashicons-controls-play");
				e.target.classList.remove("dashicons-controls-pause");
			}
		});
	}
	// Rewind ============================//
	const rewindBtn = document.querySelector(".audio-rewind");
	if (audio !== null) {
		rewindBtn.addEventListener("click", (e) => {
			e.preventDefault();
			audio.currentTime -= 10.0;
		});
	}
	// Forward ============================//
	const forwardBtn = document.querySelector(".audio-forward");
	if (audio !== null) {
		forwardBtn.addEventListener("click", (e) => {
			// eslint-disable-next-line no-invalid-this
			e.preventDefault();

			audio.currentTime += 10.0;
		});
	}
	// Play Progress ============================//
	const playProgress = document.querySelector(".audio-play-progress");
	if (audio !== null) {
		audio.addEventListener("timeupdate", (e) => {
			// eslint-disable-next-line no-invalid-this
			const timePercent = (e.target.currentTime / e.target.duration) * 100;
			playProgress.style.width = `${timePercent}%`;
		});
	}
	// Load Progress ============================//

	const loadProgress = document.querySelector(".audio-load-progress");

	function updateLoadProgress() {
		if (audio.buffered.length > 0) {
			const percent = (audio.buffered.end(0) / audio.duration) * 100;
			loadProgress.style.width = `${percent}%`;
		}
	}
	if (audio !== null) {
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

	if (audio !== null) {
		if (audio.duration > audio.currentTime) {
			durationtime.textContent = formatTime(audio.duration);
		}

		audio.addEventListener("timeupdate", () => {
			// decrease duration.
			const time = audio.duration - audio.currentTime;
			durationtime.textContent = formatTime(time);
		});

		audio.addEventListener("timeupdate", () => {
			// increase current time
			currenttime.textContent = formatTime(audio.currentTime);
		});
	}
	// volume =============================//
	const volume = document.querySelector(".audio-volume");
	if (audio !== null) {
		volume.addEventListener("change", (e) => {
			audio.volume = e.target.value;
		});
	}
	// seeker =============================//
	const seek = document.querySelector(".audio-seek");
	const playback = document.querySelector(".audio-playback");

	// update seeker =============================//
	function updateseekmax(e) {
		if (e.target.duration) {
			seek.max = e.target.duration;
		}
	}

	// update playback =============================//
	function updateplaybackmax(e) {
		if (e.target.duration) {
			playback.max = e.target.duration;
		}
	}
	if (audio !== null) {
		audio.addEventListener("durationchange", updateseekmax);
		audio.addEventListener("durationchange", updateplaybackmax);
	}
	// seeker hander =============================//
	function seekhandler(e) {
		audio.currentTime = e.target.value;

		playback.value = e.target.value;
	}
	if (audio !== null) {
		seek.addEventListener("change", seekhandler);
	}
	const muteBtn = document.querySelector("#mute-volume");
	if (audio !== null) {
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
});
