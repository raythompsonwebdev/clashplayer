import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import {
	BlockControls,
	InspectorControls,
	MediaReplaceFlow,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	Toolbar,
} from "@wordpress/components";
import React from "react";
import { addFilter } from "@wordpress/hooks";

const replaceMediaUpload = () => MediaUpload;

addFilter(
	"editor.MediaUpload",
	"core/edit-post/components/media-upload/replace-media-upload",
	replaceMediaUpload
);

registerBlockType("clashplayer/audio", {
	title: __("ClashPlayer Audio", "clashplayer"),
	icon: { src: "format-audio" },
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
		ariaLabel: true,
		color: true,
	},

	edit: (props) => {
		const {
			attributes: { id, autoplay, loop, preload, src, types },
			setAttributes,
			className,
			noticeOperations,
		} = props;

		const ALLOWED_MEDIA_TYPES = ["audio"];

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

		return [
			<InspectorControls>
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
							{ value: "audio/mpeg", label: __("Browser default (mpeg)") },
							{ value: "audio/ogg", label: __("ogg") },
							{ value: "audio/m4a", label: __("m4a") },
						]}
					/>
				</PanelBody>
			</InspectorControls>,
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

				<audio
					id="clashaudio-player"
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

				<div className="audio-controls video-controls">
					<div id="btns-box">
						<button
							id="play-toggle"
							className="player-button audio-toggle"
							type="button"
						>
							<span className="dashicons dashicons-controls-play" />
						</button>
						<button
							id="rewind"
							className="player-button audio-rewind"
							type="button"
						>
							<span className="dashicons dashicons-controls-back" />
						</button>
						<button
							id="forward"
							className="player-button audio-forward"
							type="button"
						>
							<span className="dashicons dashicons-controls-forward" />
						</button>
					</div>

					<div id="progress">
						<progress value="0" id="playback" className="audio-playback" />
						<span id="load-progress" className="audio-load-progress" />
						<span id="play-progress" className="audio-play-progress" />
					</div>
					<div className="audio-seek">
						<label htmlFor="seek">
							<input
								type="range"
								id="seek"
								title="seek"
								min="0"
								value="0"
								max="100"
							/>
						</label>
					</div>

					<div id="time" className="audio-time">
						<span>Time</span>
						<span id="current-time" className="audio-current">
							00:00
						</span>
						<span>Duration</span>
						<span id="duration-time" className="audio-duration">
							00:00
						</span>
					</div>

					<div className="audio-volume">
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
						<button
							type="button"
							title="mute volume"
							id="mute-volume"
							className="dashicons dashicons-controls-volumeon"
						/>
					</div>
				</div>
			</div>,
		];
	},
	save: (props) => {
		const {
			attributes: { src, preload, loop, autoplay, types },
			className,
		} = props;

		return (
			<div className={`${className} clashplayer-block clashplayer-static`}>
				<audio
					id="clashaudio-player"
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
				<div className="audio-controls">
					<div id="btns-box">
						<button
							id="play-toggle"
							className="player-button audio-toggle"
							type="button"
						>
							<span className="dashicons dashicons-controls-play" />
						</button>
						<button
							id="rewind"
							className="player-button audio-rewind"
							type="button"
						>
							<span className="dashicons dashicons-controls-back" />
						</button>
						<button
							id="forward"
							className="player-button audio-forward"
							type="button"
						>
							<span className="dashicons dashicons-controls-forward" />
						</button>
					</div>

					<div id="progress">
						<progress value="0" id="playback" className="audio-playback" />
						<span id="load-progress" className="audio-load-progress" />
						<span id="play-progress" className="audio-play-progress" />
					</div>
					<div className="audio-seek">
						<label htmlFor="seek">
							<input
								type="range"
								id="seek"
								title="seek"
								min="0"
								value="0"
								max="100"
							/>
						</label>
					</div>

					<div id="time" className="audio-time">
						<span>Time</span>
						<span id="current-time" className="audio-current">
							00:00
						</span>
						<span>Duration</span>
						<span id="duration-time" className="audio-duration">
							00:00
						</span>
					</div>

					<div className="audio-volume">
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
						<button
							type="button"
							title="mute volume"
							id="mute-volume"
							className="dashicons dashicons-controls-volumeon"
						/>
					</div>
				</div>
			</div>
		);
	},
});
