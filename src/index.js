import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import {
	BlockControls,
	InspectorControls,
	MediaReplaceFlow,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	Toolbar,
	Button,
} from "@wordpress/components";
//import { useEffect } from "react";
import { addFilter } from "@wordpress/hooks";

const replaceMediaUpload = () => MediaUpload;

addFilter(
	"editor.MediaUpload",
	"core/edit-post/components/media-upload/replace-media-upload",
	replaceMediaUpload
);
import { ReactComponent as Logo } from "./bv-logo.svg";

registerBlockType("clashplayer/media", {
	title: __("ClashPlayer", "clashplayer"),
	icon: { src: Logo },
	category: "clashplayer",
	attributes: {
		src: {
			type: "string",
			source: "attribute",
			selector: "source",
			attribute: "src",
		},
		types: {
			type: "string",
			source: "attribute",
			selector: "source",
			attribute: "type",
		},
		id: {
			type: "number",
		},
		autoplay: {
			type: "boolean",
			source: "attribute",
			selector: "audio",
			attribute: "autoplay",
		},
		loop: {
			type: "boolean",
			source: "attribute",
			selector: "audio",
			attribute: "loop",
		},
		preload: {
			type: "string",
			source: "attribute",
			selector: "audio",
			attribute: "preload",
		},
	},
	supports: {
		align: ["wide", "full", "none"],
	},

	edit: (props) => {
		const {
			attributes: { id, autoplay, loop, preload, src, types },
			setAttributes,
			className,
			noticeOperations,
		} = props;

		const ALLOWED_MEDIA_TYPES = ["audio"];

		// useEffect(() => {
		// 	let audioControls = document.getElementById("audio-controls");

		// 	if (!document.createElement("audio").canPlayType) {
		// 		audioControls.style.display = "none";
		// 	}

		// 	let audio = document.querySelector("audio");
		// 	let playToggle = document.getElementById("play-toggle");

		// 	playToggle.addEventListener("click", function () {
		// 		var isPlaying =
		// 			audio.currentTime > 0 &&
		// 			!audio.paused &&
		// 			!audio.ended &&
		// 			audio.readyState > 2;

		// 		if (!isPlaying) {
		// 			audio.play();
		// 			audio.preload = "metadata";
		// 			this.innerHTML =
		// 				'<i class="fa fa-pause" aria-hidden="true" title="Pause"></i>';
		// 		} else {
		// 			audio.pause();
		// 			this.innerHTML =
		// 				'<i class="fa fa-play" aria-hidden="true" title="Play"></i>';
		// 		}
		// 	});
		// 	// Rewind ============================//
		// 	let rewindBtn = document.getElementById("rewind");

		// 	rewindBtn.addEventListener("click", function () {
		// 		this.innerHTML =
		// 			'<i class="fa fa-backward" aria-hidden="true" title="Backward"></i>';
		// 		audio.currentTime -= 10.0;
		// 	});

		// 	// Forward ============================//
		// 	let forwardBtn = document.getElementById("forward");

		// 	forwardBtn.addEventListener("click", function () {
		// 		this.innerHTML =
		// 			'<i class="fa fa-forward" aria-hidden="true" title="Forward"></i>';
		// 		audio.currentTime += 10.0;
		// 	});

		// 	// Play Progress ============================//
		// 	let playProgress = document.getElementById("play-progress");

		// 	audio.addEventListener("timeupdate", function () {
		// 		let timePercent = (this.currentTime / this.duration) * 100;
		// 		playProgress.style.width = timePercent + "%";
		// 	});

		// 	// Load Progress ============================//

		// 	let loadProgress = document.getElementById("load-progress");

		// 	function updateLoadProgress() {
		// 		if (audio.buffered.length > 0) {
		// 			let percent = (audio.buffered.end(0) / audio.duration) * 100;
		// 			loadProgress.style.width = percent + "%";
		// 		}
		// 	}

		// 	audio.addEventListener("progress", function () {
		// 		updateLoadProgress();
		// 	});
		// 	audio.addEventListener("loadeddata", function () {
		// 		updateLoadProgress();
		// 	});
		// 	audio.addEventListener("canplaythrough", function () {
		// 		updateLoadProgress();
		// 	});
		// 	audio.addEventListener("playing", function () {
		// 		updateLoadProgress();
		// 	});

		// 	// Time Display =============================//

		// 	let durationtime = document.getElementById("duration-time");
		// 	let currenttime = document.getElementById("current-time");

		// 	function formatTime(seconds) {
		// 		seconds = Math.round(seconds);
		// 		let minutes = Math.floor(seconds / 60);
		// 		// Remaining seconds
		// 		seconds = Math.floor(seconds % 60);
		// 		// Add leading Zeros
		// 		minutes = minutes >= 10 ? minutes : "0" + minutes;
		// 		seconds = seconds >= 10 ? seconds : "0" + seconds;
		// 		return minutes + ":" + seconds;
		// 	}

		// 	audio.addEventListener("timeupdate", function () {
		// 		currenttime.innerHTML = formatTime(this.currentTime);
		// 	});

		// 	audio.addEventListener("durationchange", function () {
		// 		durationtime.innerHTML = formatTime(this.duration);
		// 	});

		// 	// volume =============================//
		// 	let volume = document.getElementById("volume");

		// 	volume.addEventListener("change", function (event) {
		// 		audio.volume = event.target.value;
		// 	});

		// 	// seeker =============================
		// 	let seek = document.getElementById("seek"),
		// 		playback = document.getElementById("playback");

		// 	// update seeker =============================
		// 	function updateseekmax(event) {
		// 		if (event.target.duration) {
		// 			seek.max = event.target.duration;
		// 		}
		// 	}

		// 	// update playback =============================
		// 	function updateplaybackmax(event) {
		// 		if (event.target.duration) {
		// 			playback.max = event.target.duration;
		// 		}
		// 	}

		// 	audio.addEventListener("durationchange", updateseekmax);
		// 	audio.addEventListener("durationchange", updateplaybackmax);

		// 	// seeker hander =============================
		// 	function seekhandler(event) {
		// 		audio.currentTime = event.target.value;
		// 		playback.value = event.target.value;
		// 	}

		// 	seek.addEventListener("change", seekhandler);
		// });

		function toggleAttribute(attribute) {
			return (newValue) => {
				setAttributes({ [attribute]: newValue });
			};
		}

		function onSelectURL(newURL) {
			setAttributes({ src: newURL, id: undefined });
		}

		function onUploadError(message) {
			noticeOperations.removeAllNotices();
			noticeOperations.createErrorNotice(message);
		}

		function getAutoplayHelp(checked) {
			return checked
				? __(
						"Note: Autoplaying audio may cause usability issues for some visitors."
				  )
				: null;
		}

		function onChangeTextField(newValue) {
			setAttributes({ src: newValue });
		}

		function onSelectAudio(media) {
			if (!media || !media.url) {
				setAttributes({ src: undefined, id: undefined });
				return;
			}
			setAttributes({ src: media.url, id: media.id });
		}

		return (
			<div className={`${className} clashplayer-block clashplayer-editable`}>
				<BlockControls>
					<Toolbar>
						<MediaReplaceFlow
							mediaId={id}
							mediaURL={src}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							accept="audio/*"
							onSelect={onSelectAudio}
							onSelectURL={onSelectURL}
							onError={onUploadError}
						/>
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectAudio}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							value={id}
							render={({ open }) => (
								<Button onClick={open}>Open Media Library</Button>
							)}
						/>
					</MediaUploadCheck>
					<PanelBody title={__("Audio settings")}>
						<TextControl
							label="Audio URL"
							help="type audio url into this field"
							value={src}
							onChange={onChangeTextField}
						/>
						<ToggleControl
							label={__("Autoplay")}
							onChange={toggleAttribute("autoplay")}
							checked={autoplay}
							help={getAutoplayHelp}
						/>
						<ToggleControl
							label={__("Loop")}
							onChange={toggleAttribute("loop")}
							checked={loop}
						/>
						<SelectControl
							label={__("Preload")}
							value={preload || ""}
							// `undefined` is required for the preload attribute to be unset.
							onChange={(value) =>
								setAttributes({
									preload: value || undefined,
								})
							}
							options={[
								{ value: "", label: __("Browser default") },
								{ value: "auto", label: __("Auto") },
								{ value: "metadata", label: __("Metadata") },
								{ value: "none", label: __("None") },
							]}
						/>
						<SelectControl
							label={__("Format")}
							value={types || ""}
							// `undefined` is required for the types attribute to be unset.
							onChange={(value) =>
								setAttributes({
									types: value || undefined,
								})
							}
							options={[
								{ value: "audio/mpeg", label: __("Browser default") },
								{ value: "audio/mpeg", label: __("mp3") },
								{ value: "audio/ogg", label: __("ogg") },
								{ value: "audio/mp4", label: __("mp4") },
							]}
						/>
					</PanelBody>
				</InspectorControls>

				<audio id="result-player">
					<source
						src={src}
						preload={preload}
						loop={loop}
						autoplay={autoplay}
						type={types}
					/>
					{/*
					<source
						src={src}
						preload={preload}
						loop={loop}
						autoplay={autoplay}
						type="audio/ogg"
					/>
					<source
						src={src}
						preload={preload}
						loop={loop}
						autoplay={autoplay}
						type="audio/mp4"
					/>
					*/}
					<p></p>
				</audio>

				<div id="audio-controls">
					<div id="btns-box">
						<button id="play-toggle" className="player-button">
							<i className="fa fa-play" aria-hidden="true" title="Play"></i>
						</button>
						<button id="rewind" className="player-button">
							<i
								className="fa fa-backward"
								aria-hidden="true"
								title="Backward"
							></i>
						</button>
						<button id="forward" className="player-button">
							<i
								className="fa fa-forward"
								aria-hidden="true"
								title="Forward"
							></i>
						</button>
					</div>

					<div id="progress">
						<progress value="0" id="playback"></progress>
						<span id="load-progress"></span>
						<span id="play-progress"></span>
					</div>

					<div id="time">
						<span>current time</span>
						<span id="current-time">00:00</span>
						<span>duration</span>
						<span id="duration-time">00:00</span>
					</div>

					<div id="video-volume">
						<label id="volume-bar" htmlFor="volume"></label>
						<input
							type="range"
							id="volume"
							title="volume"
							min="0"
							max="1"
							step="0.1"
							value="1"
						/>
					</div>

					<div id="video-seek">
						<label htmlFor="seek"></label>
						<input
							type="range"
							id="seek"
							title="seek"
							min="0"
							value="0"
							max="0"
						/>
					</div>
				</div>
			</div>
		);
	},
	save: (props) => {
		const {
			attributes: { src, preload, loop, autoplay },
			className,
		} = props;

		return (
			<div className={`${className} clashplayer-block clashplayer-static`}>
				<audio id="result-player">
					<source
						src={src}
						preload={preload}
						loop={loop}
						autoplay={autoplay}
						type="audio/mpeg"
					/>
					<source
						src={src}
						preload={preload}
						loop={loop}
						autoplay={autoplay}
						type="audio/ogg"
					/>
					<source
						src={src}
						preload={preload}
						loop={loop}
						autoplay={autoplay}
						type="audio/mp4"
					/>
					<p></p>
				</audio>
				<div id="audio-controls">
					<div id="btns-box">
						<button id="play-toggle" className="player-button">
							<i className="fa fa-play" aria-hidden="true" title="Play"></i>
						</button>
						<button id="rewind" className="player-button">
							<i
								className="fa fa-backward"
								aria-hidden="true"
								title="Backward"
							></i>
						</button>
						<button id="forward" className="player-button">
							<i
								className="fa fa-forward"
								aria-hidden="true"
								title="Forward"
							></i>
						</button>
					</div>

					<div id="progress">
						<progress value="0" id="playback"></progress>
						<span id="load-progress"></span>
						<span id="play-progress"></span>
					</div>

					<div id="time">
						<span>Current Time</span>
						<span id="current-time">00:00</span>
						<span>Duration</span>
						<span id="duration-time">00:00</span>
					</div>

					<div id="video-volume">
						<label id="volume-bar" htmlFor="volume"></label>
						<input
							type="range"
							id="volume"
							title="volume"
							min="0"
							max="1"
							step="0.1"
							value="1"
						/>
					</div>

					<div id="video-seek">
						<label htmlFor="seek"></label>
						<input
							type="range"
							id="seek"
							title="seek"
							min="0"
							value="0"
							max="0"
						/>
					</div>
				</div>
			</div>
		);
	},
});
