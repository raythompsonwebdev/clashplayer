!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}var t,a=window.wp.element,l=window.wp.i18n,o=window.wp.blocks,r=window.wp.blockEditor,n=window.wp.components,i=window.React;function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},c.apply(this,arguments)}(0,window.wp.hooks.addFilter)("editor.MediaUpload","core/edit-post/components/media-upload/replace-media-upload",(function(){return r.MediaUpload})),(0,o.registerBlockType)("clashplayer/media",{title:(0,l.__)("ClashPlayer","clashplayer"),icon:{src:function(e){return i.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 72 72",style:{enableBackground:"new 0 0 72 72"},xmlSpace:"preserve"},e),t||(t=i.createElement("path",{d:"M42.9 38.3V38c2.9-.6 4.3-2.2 4.3-4.8V21.6c0-5.4-2.7-8.2-8-8.2H23.3c-.2-.6-.7-1-1.4-1-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4c.7 0 1.2-.4 1.4-1H29v22.1h-5.7c-.2-.6-.7-1-1.4-1-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4c.7 0 1.2-.4 1.4-1H29v20.7h-5.6c-.2-.6-.7-1-1.4-1-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.7 0 1.2-.4 1.4-1H41c4.6 0 6.8-2.2 6.8-6.7v-8.4c.1-2.6-1.6-4.3-4.9-5.2zm-8-19.4h3.6c1.8 0 2.7 1.1 2.7 3.3v9.9c0 2.2-1.2 3.3-3.4 3.3H35V18.9zm6.9 32.2c0 1.3-.8 1.9-2.4 1.9h-4.5V40.8h3.3c2.4 0 3.6 1.1 3.6 3.2v7.1z"})))}},category:"media",attributes:{src:{type:"string",source:"attribute",selector:"source",attribute:"src"},types:{type:"string",source:"attribute",selector:"source",attribute:"type"},id:{type:"number"},autoplay:{type:"boolean",source:"attribute",selector:"source",attribute:"autoplay"},loop:{type:"boolean",source:"attribute",selector:"source",attribute:"loop"},preload:{type:"string",source:"attribute",selector:"source",attribute:"preload"}},supports:{align:["wide","full","none"]},edit:function(t){var o=t.attributes,i=o.id,c=o.autoplay,s=o.loop,d=o.preload,u=o.src,m=o.types,p=t.setAttributes,v=t.className,b=t.noticeOperations,y=["audio","video"];function E(t){return function(a){var l,o,r;p((l={},r=a,(o=function(t){var a=function(t,a){if("object"!==e(t)||null===t)return t;var l=t[Symbol.toPrimitive];if(void 0!==l){var o=l.call(t,a);if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"===e(a)?a:String(a)}(o=t))in l?Object.defineProperty(l,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):l[o]=r,l))}}var g=function(e){e&&e.url?p({src:e.url,id:e.id}):p({src:void 0,id:void 0})},f=(0,a.createElement)("audio",{id:"clashaudio-player",preload:d,loop:s,autoPlay:c},(0,a.createElement)("source",{src:u,type:m}),(0,a.createElement)("track",{src:"fgsubtitles_en.vtt",kind:"captions",srcLang:"en",label:"English"})),w=(0,a.createElement)("video",{id:"clashvideo-player",preload:d,loop:s,autoPlay:c},(0,a.createElement)("source",{src:u,type:m}),(0,a.createElement)("track",{src:"fgsubtitles_en.vtt",kind:"captions",srcLang:"en",label:"English"}));console.log(m);var h=function(){return m.includes("video")?w:f};return console.log(h),(0,a.createElement)("div",{className:"".concat(v," clashplayer-block clashplayer-editable")},(0,a.createElement)(r.BlockControls,null,(0,a.createElement)(n.Toolbar,null,(0,a.createElement)(r.MediaReplaceFlow,{mediaId:i,mediaURL:u,allowedTypes:y,accept:"audio/*, video/*",onSelect:g,onSelectURL:function(e){p({src:e,id:void 0})},onError:function(e){b.removeAllNotices(),b.createErrorNotice(e)}}))),(0,a.createElement)(r.InspectorControls,null,(0,a.createElement)(r.MediaUploadCheck,null,(0,a.createElement)(r.MediaUpload,{onSelect:g,allowedTypes:y,value:i,render:function(e){var t=e.open;return(0,a.createElement)(n.Button,{onClick:t},"Open Media Library")}})),(0,a.createElement)(n.PanelBody,{title:(0,l.__)("Audio settings")},(0,a.createElement)(n.TextControl,{label:"Audio or Video URL",help:"type audio url into this field",value:u,onChange:function(e){p({src:e})}}),(0,a.createElement)(n.ToggleControl,{label:(0,l.__)("Autoplay"),onChange:E("autoplay"),checked:c,help:function(e){return e?(0,l.__)("Note: Autoplaying audio may cause usability issues for some visitors."):null}}),(0,a.createElement)(n.ToggleControl,{label:(0,l.__)("Loop"),onChange:E("loop"),checked:s}),(0,a.createElement)(n.SelectControl,{label:(0,l.__)("Preload"),value:d||"",onChange:function(e){return p({preload:e||void 0})},options:[{value:"",label:(0,l.__)("Browser default")},{value:"auto",label:(0,l.__)("Auto")},{value:"metadata",label:(0,l.__)("Metadata")},{value:"none",label:(0,l.__)("None")}]}),(0,a.createElement)(n.SelectControl,{label:(0,l.__)("Format"),value:m||"",onChange:function(e){return p({types:e||void 0})},options:[{value:"audio/mpeg",label:(0,l.__)("Browser default")},{value:"audio/ogg",label:(0,l.__)("ogg")},{value:"audio/m4a",label:(0,l.__)("m4a")},{value:"video/mp4",label:(0,l.__)("mp4")},{value:"video/webm",label:(0,l.__)("webm")}]}))),h(),(0,a.createElement)("div",{className:"audio-controls video-controls"},(0,a.createElement)("div",{id:"btns-box"},(0,a.createElement)("button",{id:"play-toggle",className:"player-button audio-toggle video-toggle",type:"button"},(0,a.createElement)("i",{className:"fa fa-play","aria-hidden":"true",title:"Play"})),(0,a.createElement)("button",{id:"rewind",className:"player-button audio-rewind video-rewind",type:"button"},(0,a.createElement)("i",{className:"fa fa-backward","aria-hidden":"true",title:"Backward"})),(0,a.createElement)("button",{id:"forward",className:"player-button audio-forward video-forward",type:"button"},(0,a.createElement)("i",{className:"fa fa-forward","aria-hidden":"true",title:"Forward"}))),(0,a.createElement)("div",{id:"progress"},(0,a.createElement)("progress",{value:"0",id:"playback",className:"audio-playback video-playback"}),(0,a.createElement)("span",{id:"load-progress",className:"audio-load-progress video-load-progress"}),(0,a.createElement)("span",{id:"play-progress",className:"audio-play-progress video-play-progress"})),(0,a.createElement)("div",{className:"video-seek audio-seek"},(0,a.createElement)("label",{htmlFor:"seek"},(0,a.createElement)("input",{type:"range",id:"seek",title:"seek",min:"0",value:"0",max:"0"}))),(0,a.createElement)("div",{id:"time",className:"audio-time video-time"},(0,a.createElement)("span",null,"current time"),(0,a.createElement)("span",{id:"current-time",className:"audio-current video-current"},"00:00"),(0,a.createElement)("span",null,"duration"),(0,a.createElement)("span",{id:"duration-time",className:"audio-duration video-duration"},"00:00")),(0,a.createElement)("div",{className:"video-volume audio-volume"},(0,a.createElement)("label",{id:"volume-bar",htmlFor:"volume"},(0,a.createElement)("input",{type:"range",className:"audio-volume video-volume",id:"volume",title:"volume",min:"0",max:"1",step:"0.1",value:"1"})))))},save:function(e){var t=e.attributes,l=t.src,o=t.preload,r=t.loop,n=t.autoplay,i=t.types,c=e.className,s=(0,a.createElement)("audio",{id:"clashaudio-player",preload:o,loop:r,autoPlay:n},(0,a.createElement)("source",{src:l,type:i}),(0,a.createElement)("track",{src:"fgsubtitles_en.vtt",kind:"captions",srcLang:"en",label:"English"})),d=(0,a.createElement)("video",{id:"clashvideo-player",preload:o,loop:r,autoPlay:n},(0,a.createElement)("source",{src:l,type:i}),(0,a.createElement)("track",{src:"fgsubtitles_en.vtt",kind:"captions",srcLang:"en",label:"English"}));console.log(i);var u=function(){return i.includes("video")?d:s};return console.log(u),(0,a.createElement)("div",{className:"".concat(c," clashplayer-block clashplayer-static")},u(),(0,a.createElement)("div",{className:"audio-controls video-controls"},(0,a.createElement)("div",{id:"btns-box"},(0,a.createElement)("button",{id:"play-toggle",className:"player-button audio-toggle video-toggle",type:"button"},(0,a.createElement)("i",{className:"fa fa-play","aria-hidden":"true",title:"Play"})),(0,a.createElement)("button",{id:"rewind",className:"player-button audio-rewind video-rewind",type:"button"},(0,a.createElement)("i",{className:"fa fa-backward","aria-hidden":"true",title:"Backward"})),(0,a.createElement)("button",{id:"forward",className:"player-button audio-forward video-forward",type:"button"},(0,a.createElement)("i",{className:"fa fa-forward","aria-hidden":"true",title:"Forward"}))),(0,a.createElement)("div",{id:"progress"},(0,a.createElement)("progress",{value:"0",id:"playback",className:"audio-playback video-playback"}),(0,a.createElement)("span",{id:"load-progress",className:"audio-load-progress video-load-progress"}),(0,a.createElement)("span",{id:"play-progress",className:"audio-play-progress video-play-progress"})),(0,a.createElement)("div",{className:"video-seek audio-seek"},(0,a.createElement)("label",{htmlFor:"seek"},(0,a.createElement)("input",{type:"range",id:"seek",title:"seek",min:"0",value:"0",max:"0"}))),(0,a.createElement)("div",{id:"time",className:"audio-time video-time"},(0,a.createElement)("span",null,"current time"),(0,a.createElement)("span",{id:"current-time",className:"audio-current video-current"},"00:00"),(0,a.createElement)("span",null,"duration"),(0,a.createElement)("span",{id:"duration-time",className:"audio-duration video-duration"},"00:00")),(0,a.createElement)("div",{className:"video-volume audio-volume"},(0,a.createElement)("label",{id:"volume-bar",htmlFor:"volume"},(0,a.createElement)("input",{type:"range",className:"audio-volume video-volume",id:"volume",title:"volume",min:"0",max:"1",step:"0.1",value:"1"})))))}})}();