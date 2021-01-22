import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	MediaUpload,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor'
import {
	Disabled,
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	Toolbar,
	IconButton,
} from '@wordpress/components'
import { ReactComponent as Logo } from '../src/bv-logo.svg'
import { useEffect } from 'react'
//import { useSelect } from '@wordpress/data'
import { createBlock } from '@wordpress/blocks'
import { get } from 'lodash'
import { audio as icon } from '@wordpress/icons'

//console.info(wp.components)

registerBlockType('clashplayer/media', {
	title: __('ClashPlayer', 'clashplayer'),
	icon: { src: Logo },
	category: 'clashplayer',
	attributes: {
		src: {
			type: 'string',
			source: 'attribute',
			selector: 'source',
			attribute: 'src',
		},
		imgUrl: {
			type: 'string',
		},
		caption: {
			type: 'string',
			source: 'html',
			selector: 'figcaption',
		},
		id: {
			type: 'number',
		},
		autoplay: {
			type: 'boolean',
			source: 'attribute',
			selector: 'audio',
			attribute: 'autoplay',
		},
		loop: {
			type: 'boolean',
			source: 'attribute',
			selector: 'audio',
			attribute: 'loop',
		},
		preload: {
			type: 'string',
			source: 'attribute',
			selector: 'audio',
			attribute: 'preload',
		},
	},
	supports: {
		align: ['wide', 'full'],
	},

	edit: (props) => {
		console.log(props)

		const {
			attributes: { id, autoplay, loop, preload, src, caption, imgUrl },
			setAttributes,
			className,
			noticeOperations,
			noticeUI,
			insertBlocksAfter,
			onReplace,
			isSelected,
		} = props

		const ALLOWED_MEDIA_TYPES = ['audio']

		const blockProps = useBlockProps()

		useEffect(() => {
			let audioControls = document.getElementById('audio_controls')

			//Stop if HTML5 video isn't supported
			if (!document.createElement('audio').canPlayType) {
				audioControls.style.display = 'none'
			}

			let audio = document.querySelector('audio')
			let playToggle = document.getElementById('play_toggle')

			playToggle.addEventListener('click', function () {
				var isPlaying =
					audio.currentTime > 0 &&
					!audio.paused &&
					!audio.ended &&
					audio.readyState > 2

				if (!isPlaying) {
					audio.play()
					audio.preload = 'metadata'
					this.innerHTML =
						'<i class="fa fa-pause" aria-hidden="true" title="Pause"></i>'
				} else {
					audio.pause()
					this.innerHTML =
						'<i class="fa fa-play" aria-hidden="true" title="Play"></i>'
				}
			})
			// Rewind ============================//
			let rewindBtn = document.getElementById('rewind')

			rewindBtn.addEventListener('click', function () {
				this.innerHTML =
					'<i class="fa fa-backward" aria-hidden="true" title="Backward"></i>'
				audio.currentTime -= 10.0
			})

			// Forward ============================//
			let forwardBtn = document.getElementById('forward')

			forwardBtn.addEventListener('click', function () {
				this.innerHTML =
					'<i class="fa fa-forward" aria-hidden="true" title="Forward"></i>'
				audio.currentTime += 10.0
			})

			// Play Progress ============================//
			let playProgress = document.getElementById('play_progress')

			audio.addEventListener('timeupdate', function () {
				let timePercent = (this.currentTime / this.duration) * 100
				playProgress.style.width = timePercent + '%'
			})

			// Load Progress ============================//

			let loadProgress = document.getElementById('load_progress')

			function updateLoadProgress() {
				if (audio.buffered.length > 0) {
					let percent = (audio.buffered.end(0) / audio.duration) * 100
					loadProgress.style.width = percent + '%'
				}
			}

			audio.addEventListener('progress', function () {
				updateLoadProgress()
			})
			audio.addEventListener('loadeddata', function () {
				updateLoadProgress()
			})
			audio.addEventListener('canplaythrough', function () {
				updateLoadProgress()
			})
			audio.addEventListener('playing', function () {
				updateLoadProgress()
			})

			// Time Display =============================//

			let durationtime = document.getElementById('duration_time')
			let currenttime = document.getElementById('current_time')

			function formatTime(seconds) {
				seconds = Math.round(seconds)
				let minutes = Math.floor(seconds / 60)
				// Remaining seconds
				seconds = Math.floor(seconds % 60)
				// Add leading Zeros
				minutes = minutes >= 10 ? minutes : '0' + minutes
				seconds = seconds >= 10 ? seconds : '0' + seconds
				return minutes + ':' + seconds
			}

			audio.addEventListener('timeupdate', function () {
				currenttime.innerHTML = formatTime(this.currentTime)
			})

			audio.addEventListener('durationchange', function () {
				durationtime.innerHTML = formatTime(this.duration)
			})

			//volume =============================//
			let volume = document.getElementById('volume')

			volume.addEventListener('change', function (event) {
				audio.volume = event.target.value
			})

			//seeker =============================//
			let seek = document.getElementById('seek'),
				playback = document.getElementById('playback')

			//update seeker =============================//
			function updateseekmax(event) {
				if (event.target.duration) {
					seek.max = event.target.duration
				}
			}

			//update playback =============================//
			function updateplaybackmax(event) {
				if (event.target.duration) {
					playback.max = event.target.duration
				}
			}

			audio.addEventListener('durationchange', updateseekmax)
			audio.addEventListener('durationchange', updateplaybackmax)

			//seeker hander =============================//
			function seekhandler(event) {
				audio.currentTime = event.target.value
				playback.value = event.target.value
			}

			seek.addEventListener('change', seekhandler)
		}, [])

		function toggleAttribute(attribute) {
			return (newValue) => {
				setAttributes({ [attribute]: newValue })
			}
		}

		function onSelectURL(newSrc) {
			// Set the block's src from the edit component's state, and switch off
			// the editing UI.
			if (newSrc !== src) {
				// Check if there's an embed block that handles this URL.
				const embedBlock = createUpgradedEmbedBlock({
					attributes: { url: newSrc },
				})
				if (undefined !== embedBlock) {
					onReplace(embedBlock)
					return
				}
				setAttributes({ src: newSrc, id: undefined })
			}
		}

		function onUploadError(message) {
			noticeOperations.removeAllNotices()
			noticeOperations.createErrorNotice(message)
		}

		function getAutoplayHelp(checked) {
			return checked
				? __(
						'Note: Autoplaying audio may cause usability issues for some visitors.'
				  )
				: null
		}

		function onChangeTextField(newValue) {
			setAttributes({ imgUrl: newValue })
		}

		const onSelectMedia = (media) => {
			// Try the "large" size URL, falling back to the "full" size URL below.
			let src =
				get(media, ['sizes', 'large', 'url']) ||
				get(media, ['media_details', 'sizes', 'large', 'source_url'])

			setAttributes({
				imgUrl: src || media.url,
			})
		}

		// const { setAttributes, isSelected, noticeUI } = this.props;
		function onSelectAudio(media) {
			if (!media || !media.url) {
				setAttributes({ src: undefined, id: undefined })
				return
			}
			setAttributes({ src: media.url, id: media.id })
		}

		if (!src) {
			return (
				<MediaPlaceholder
					icon={<BlockIcon icon={icon} />}
					labels={{
						title: __('Media area'),
					}}
					className="block-image"
					onSelect={onSelectAudio}
					onSelectURL={onSelectURL}
					accept="audio/*"
					allowedTypes={ALLOWED_MEDIA_TYPES}
					value={attributes}
					notices={noticeUI}
					onError={onUploadError}
				/>
			)
		}

		return (
			<div className={`${className} clashplayer-block clashplayer-editable`}>
				{imgUrl ? (
					<div
						className="clashplayer-logo"
						style={{
							backgroundImage: `url(${imgUrl})`,
						}}
					></div>
				) : (
					<MediaPlaceholder
						icon="format-image"
						labels={{
							title: __('Media area'),
						}}
						className="block-image"
						onSelect={onSelectMedia}
						accept="image/*"
						allowedTypes={['image']}
					/>
				)}
				<BlockControls>
					<MediaReplaceFlow
						mediaId={id}
						mediaURL={src}
						allowedTypes={ALLOWED_MEDIA_TYPES}
						accept="audio/*"
						onSelect={onSelectAudio}
						onSelectURL={onSelectURL}
						onError={onUploadError}
					/>
					{/* <MediaUpload
							onSelect={onSelectMedia}
							allowedTypes={['image']}
							value={mediaUrl}
							render={({ open }) => (
								<IconButton
									className="components-toolbar__control"
									label={__('Edit media')}
									icon="edit"
									onClick={open}
								/>
							)}
						/> */}
					<Toolbar>
						<MediaUpload
							onSelect={onSelectMedia}
							allowedTypes={['image']}
							value={imgUrl}
							render={({ open }) => (
								<IconButton
									className="components-toolbar__control"
									label={__('Edit media')}
									icon="edit"
									onClick={open}
								/>
							)}
						/>
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					<PanelBody title={__('Audio settings')}>
						<TextControl
							label="Image URL"
							help="type audio url into this field"
							value={imgUrl}
							onChange={onChangeTextField}
						/>
						<ToggleControl
							label={__('Autoplay')}
							onChange={toggleAttribute('autoplay')}
							checked={autoplay}
							help={getAutoplayHelp}
						/>
						<ToggleControl
							label={__('Loop')}
							onChange={toggleAttribute('loop')}
							checked={loop}
						/>
						<SelectControl
							label={__('Preload')}
							value={preload || ''}
							// `undefined` is required for the preload attribute to be unset.
							onChange={(value) =>
								setAttributes({
									preload: value || undefined,
								})
							}
							options={[
								{ value: '', label: __('Browser default') },
								{ value: 'auto', label: __('Auto') },
								{ value: 'metadata', label: __('Metadata') },
								{ value: 'none', label: __('None') },
							]}
						/>
					</PanelBody>
				</InspectorControls>
				<figure {...blockProps}>
					{/*
					Disable the audio tag so the user clicking on it won't play the
					file or change the position slider when the controls are enabled.
				*/}
					<Disabled>
						<audio src={src} />
					</Disabled>
					{(!RichText.isEmpty(caption) || isSelected) && (
						<RichText
							tagName="figcaption"
							aria-label={__('Audio caption text')}
							placeholder={__('Write caption…')}
							value={caption}
							onChange={(value) => setAttributes({ caption: value })}
							inlineToolbar
							__unstableOnSplitAtEnd={() =>
								insertBlocksAfter(createBlock('core/paragraph'))
							}
						/>
					)}
				</figure>

				<audio id="result_player">
					<source src={src} preload="metadata" type="audio/mpeg" />
					<source src={src} preload="metadata" type="audio/ogg" />
					<source src={src} preload="metadata" type="audio/mp4" />
					<p></p>
				</audio>

				<div id="audio_controls">
					<div id="btns_box">
						<button id="play_toggle" className="player-button">
							<i className="fa fa-play" aria-hidden="true" title="Play"></i>
						</button>
						<button id="rewind" className="player-button">
							<i className="fa fa-backward" aria-hidden="true" title="Backward"></i>
						</button>
						<button id="forward" className="player-button">
							<i className="fa fa-forward" aria-hidden="true" title="Forward"></i>
						</button>
					</div>

					<div id="progress">
						<progress value="0" id="playback"></progress>
						<span id="load_progress"></span>
						<span id="play_progress"></span>
					</div>

					<div id="time">
						<span>current time</span>
						<span id="current_time">00:00</span>
						<span>duration</span>
						<span id="duration_time">00:00</span>
					</div>

					<div id="video_volume">
						<label id="volume_bar" htmlFor="volume"></label>
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

					<div id="video_seek">
						<label htmlFor="seek"></label>
						<input type="range" id="seek" title="seek" min="0" value="0" max="0" />
					</div>
				</div>
			</div>
		)
	},
	save: (props) => {
		const {
			attributes: { src },
			className,
		} = props

		return (
			<div className={`${className} clashplayer-block clashplayer-static`}>
				<audio id="result_player">
					<source src={src} preload="metadata" type="audio/mpeg" />
					<source src={src} preload="metadata" type="audio/ogg" />
					<source src={src} preload="metadata" type="audio/mp4" />
					<p></p>
				</audio>

				<div id="audio_controls">
					<div id="btns_box">
						<button id="play_toggle" className="player-button">
							<i className="fa fa-play" aria-hidden="true" title="Play"></i>
						</button>
						<button id="rewind" className="player-button">
							<i className="fa fa-backward" aria-hidden="true" title="Backward"></i>
						</button>
						<button id="forward" className="player-button">
							<i className="fa fa-forward" aria-hidden="true" title="Forward"></i>
						</button>
					</div>

					<div id="progress">
						<progress value="0" id="playback"></progress>
						<span id="load_progress"></span>
						<span id="play_progress"></span>
					</div>

					<div id="time">
						<span>Current Time</span>
						<span id="current_time">00:00</span>
						<span>Duration</span>
						<span id="duration_time">00:00</span>
					</div>

					<div id="video_volume">
						<label id="volume_bar" htmlFor="volume"></label>
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

					<div id="video_seek">
						<label htmlFor="seek"></label>
						<input type="range" id="seek" title="seek" min="0" value="0" max="0" />
					</div>
				</div>
			</div>
		)
	},
})
