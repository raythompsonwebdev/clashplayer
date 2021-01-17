let videoControls = document.getElementById('video_controls')

//Stop if HTML5 video isn't supported
if (! document.createElement('video').canPlayType) {
	videoControls.style.display = 'none'
}

let video = document.querySelector( 'video' );


// Play/Pause ============================//

let playToggle = document.querySelector( '#play_toggle' )

playToggle.addEventListener( 'click', function () {
	if (video.paused) {
		video.play()
		video.preload = 'metadata'
		this.innerHTML =
			'<i class="fa fa-pause" aria-hidden="true" title="Pause"></i>'
	} else {
		video.pause()
		this.innerHTML = '<i class="fa fa-play" aria-hidden="true" title="Play"></i>'
	}
})

// Rewind ============================//
var rewindBtn = document.getElementById('rewind')

rewindBtn.addEventListener('click', function () {
	this.innerHTML =
		'<i class="fa fa-backward" aria-hidden="true" title="Backward"></i>'
	video.currentTime -= 10.0
})

// Forward ============================//
var forwardBtn = document.getElementById('forward')

forwardBtn.addEventListener('click', function () {
	this.innerHTML =
		'<i class="fa fa-forward" aria-hidden="true" title="Forward"></i>'
	video.currentTime += 10.0
})

// Play Progress ============================//
var playProgress = document.getElementById('play_progress')

video.addEventListener('timeupdate', function () {
	var timePercent = (this.currentTime / this.duration) * 100
	playProgress.style.width = timePercent + '%'
})

// Load Progress ============================//

var loadProgress = document.getElementById('load_progress')

function updateLoadProgress() {
	if (video.buffered.length > 0) {
		var percent = (video.buffered.end(0) / video.duration) * 100
		loadProgress.style.width = percent + '%'
	}
}

video.addEventListener('progress', function () {
	updateLoadProgress()
})
video.addEventListener('loadeddata', function () {
	updateLoadProgress()
})
video.addEventListener('canplaythrough', function () {
	updateLoadProgress()
})
video.addEventListener('playing', function () {
	updateLoadProgress()
})

// Time Display =============================//

var durationtime = document.getElementById('duration_time')
var currenttime = document.getElementById('current_time')

function formatTime(seconds) {
	var seconds = Math.round(seconds)
	var minutes = Math.floor(seconds / 60)
	// Remaining seconds
	seconds = Math.floor(seconds % 60)
	// Add leading Zeros
	minutes = minutes >= 10 ? minutes : '0' + minutes
	seconds = seconds >= 10 ? seconds : '0' + seconds
	return minutes + ':' + seconds
}

video.addEventListener('timeupdate', function () {
	currenttime.innerHTML = formatTime(this.currentTime)
})

video.addEventListener('durationchange', function () {
	durationtime.innerHTML = formatTime(this.duration)
})

//volume =============================//
var volume = document.getElementById('volume')
volume.addEventListener('change', function (event) {
	video.volume = event.target.value
})

//seeker =============================//
var seek = document.getElementById('seek'),
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

video.addEventListener('durationchange', updateseekmax)
video.addEventListener('durationchange', updateplaybackmax)

//seeker hander =============================//
function seekhandler(event) {
	video.currentTime = event.target.value
	playback.value = event.target.value
}

seek.addEventListener('change', seekhandler)
