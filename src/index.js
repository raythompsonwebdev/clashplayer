// const { __ } = wp.i18n;
// const { //InspectorControls, registerBlockType } = wp.blocks;
// const { TextControl } = wp.components;

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";

import { ReactComponent as Logo } from "../src/bv-logo.svg";
//import {useEffect } from 'react';
//import from "../src/js/audio-es6";

registerBlockType("clashplayer/media", {
  title: __("ClashPlayer", "clashplayer"),
  icon: { src: Logo },
  category: "clashplayer",
  attributes: {
    urlaudio: {
      type: "string",
      source: "html",
      selector: "source",
      attribute: "src",
    },
    urlvideo: {
      type: "string",
      source: "html",
      selector: "source",
      attribute: "src",
    },
  },

  edit: (props) => {
    console.log(props);

    // Lift info from props and populate various constants.
    const {
      attributes: { urlaudio },
      setAttributes,
      className,
    } = props;

    function onChangeTextField(newValue) {
      setAttributes({ urlaudio: newValue });
    }

    return (
      <div className={`${className} clashplayer-block clashplayer-editable`}>
        <InspectorControls>
          <TextControl
            label="Audio URL"
            help="type audio url into this field"
            value={urlaudio}
            onChange={onChangeTextField}
          />
        </InspectorControls>

        <audio id="result_player">
          <source src={urlaudio} preload="metadata" type="audio/mpeg" />
          <source src={urlaudio} preload="metadata" type="audio/ogg" />
          <source src={urlaudio} preload="metadata" type="audio/mp4" />
          <p></p>
        </audio>

        <div id="audio_controls">
          <div id="btns_box">
            <button id="play_toggle" className="player-button">
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
    console.log(props);

    const {
      attributes: { urlaudio },
      className,
    } = props;

    return (
      <div className={`${className} clashplayer-block clashplayer-static`}>
        <audio id="result_player">
          <source src={urlaudio} preload="metadata" type="audio/mpeg" />
          <source src={urlaudio} preload="metadata" type="audio/ogg" />
          <source src={urlaudio} preload="metadata" type="audio/mp4" />
          <p></p>
        </audio>

        <div id="audio_controls">
          <div id="btns_box">
            <button id="play_toggle" className="player-button">
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
