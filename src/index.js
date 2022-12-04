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
import React from "react";
import { addFilter } from "@wordpress/hooks";
import { ReactComponent as Logo } from "./bv-logo.svg";

const replaceMediaUpload = () => MediaUpload;

addFilter(
	"editor.MediaUpload",
	"core/edit-post/components/media-upload/replace-media-upload",
	replaceMediaUpload
);

registerBlockType("clashplayer/media", {
	title: __("ClashPlayer", "clashplayer"),
	icon: { src: Logo },
	category: "media",
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
			selector: "source",
			attribute: "autoplay",
		},
		loop: {
			type: "boolean",
			source: "attribute",
			selector: "source",
			attribute: "loop",
		},
		preload: {
			type: "string",
			source: "attribute",
			selector: "source",
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

		const ALLOWED_MEDIA_TYPES = ["audio", "video"];

		function toggleAttribute(attribute) {
			return (newValue) => {
				setAttributes({ [attribute]: newValue });
			};
		}

		const onSelectURL = (newURL) => {
			setAttributes({ src: newURL, id: undefined });
		};

		const onUploadError = (message) => {
			noticeOperations.removeAllNotices();
			noticeOperations.createErrorNotice(message);
		};

		const getAutoplayHelp = (checked) =>
			checked
				? __(
						"Note: Autoplaying audio may cause usability issues for some visitors."
				  )
				: null;

		const onChangeTextField = (newValue) => {
			setAttributes({ src: newValue });
		};

		const onSelectAudio = (media) => {
			if (!media || !media.url) {
				setAttributes({ src: undefined, id: undefined });
				return;
			}
			setAttributes({ src: media.url, id: media.id });
		};

		function funny(t) {
			const o = (
				<audio
					id="result-player"
					preload={preload}
					loop={loop}
					autoPlay={autoplay}
				>
					<source src={src} type={types} />

					<track
						src="fgsubtitles_en.vtt"
						kind="captions"
						srcLang="en"
						label="English"
					/>
				</audio>
			);

			const p = (
				<video
					id="result-player"
					preload={preload}
					loop={loop}
					autoPlay={autoplay}
				>
					<source src={src} type={types} />

					<track
						src="fgsubtitles_en.vtt"
						kind="captions"
						srcLang="en"
						label="English"
					/>
				</video>
			);

			return t === "video/m4a" ? o : p;
		}

		return (
			<div className={`${className} clashplayer-block clashplayer-editable`}>
				<BlockControls>
					<Toolbar>
						<MediaReplaceFlow
							mediaId={id}
							mediaURL={src}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							accept="audio/*, video/*"
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
							label="Audio or Video URL"
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
								{ value: "audio/ogg", label: __("ogg") },
								{ value: "audio/m4a", label: __("m4a") },
								{ value: "video/mp4", label: __("mp4") },
								{ value: "video/webm", label: __("webm") },
							]}
						/>
					</PanelBody>
				</InspectorControls>

				<audio
					id="result-player"
					preload={preload}
					loop={loop}
					autoPlay={autoplay}
				>
					<source src={src} type={types} />

					<track
						src="fgsubtitles_en.vtt"
						kind="captions"
						srcLang="en"
						label="English"
					/>
				</audio>

				{funny(types)}
				<div id="audio-controls">
					<div id="btns-box">
						<button id="play-toggle" className="player-button" type="button">
							<i className="fa fa-play" aria-hidden="true" title="Play" />
						</button>
						<button id="rewind" className="player-button" type="button">
							<i
								className="fa fa-backward"
								aria-hidden="true"
								title="Backward"
							/>
						</button>
						<button id="forward" className="player-button" type="button">
							<i className="fa fa-forward" aria-hidden="true" title="Forward" />
						</button>
					</div>

					<div id="progress">
						<progress value="0" id="playback" />
						<span id="load-progress" />
						<span id="play-progress" />
					</div>

					<div id="time">
						<span>current time</span>
						<span id="current-time">00:00</span>
						<span>duration</span>
						<span id="duration-time">00:00</span>
					</div>

					<div id="video-volume">
						<label id="volume-bar" htmlFor="volume">
							<input
								type="range"
								id="volume"
								title="volume"
								min="0"
								max="1"
								step="0.1"
								value="1"
							/>
						</label>
					</div>

					<div id="video-seek">
						<label htmlFor="seek">
							<input
								type="range"
								id="seek"
								title="seek"
								min="0"
								value="0"
								max="0"
							/>
						</label>
					</div>
				</div>
			</div>
		);
	},
	save: (props) => {
		const {
			attributes: { src, preload, loop, autoplay, types },
			className,
		} = props;

		return (
			<div className={`${className} clashplayer-block clashplayer-static`}>
				<audio
					id="result-player"
					preload={preload}
					loop={loop}
					autoPlay={autoplay}
				>
					<source src={src} type={types} />
					<track
						src="fgsubtitles_en.vtt"
						kind="captions"
						srcLang="en"
						label="English"
					/>
				</audio>

				<div id="audio-controls">
					<div id="btns-box">
						<button id="play-toggle" className="player-button" type="button">
							<i className="fa fa-play" aria-hidden="true" title="Play" />
						</button>
						<button id="rewind" className="player-button" type="button">
							<i
								className="fa fa-backward"
								aria-hidden="true"
								title="Backward"
							/>
						</button>
						<button id="forward" className="player-button" type="button">
							<i className="fa fa-forward" aria-hidden="true" title="Forward" />
						</button>
					</div>

					<div id="progress">
						<progress value="0" id="playback" />
						<span id="load-progress" />
						<span id="play-progress" />
					</div>

					<div id="time">
						<span>Current Time</span>
						<span id="current-time">00:00</span>
						<span>Duration</span>
						<span id="duration-time">00:00</span>
					</div>

					<div id="video-volume">
						<label id="volume-bar" htmlFor="volume">
							<input
								type="range"
								id="volume"
								title="volume"
								min="0"
								max="1"
								step="0.1"
								value="1"
							/>
						</label>
					</div>

					<div id="video-seek">
						<label htmlFor="seek">
							<input
								type="range"
								id="seek"
								title="seek"
								min="0"
								value="0"
								max="0"
							/>
						</label>
					</div>
				</div>
			</div>
		);
	},
});
