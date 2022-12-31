!(function () {
	"use strict";
	function e(t) {
		return (
			(e =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e &&
								"function" == typeof Symbol &&
								e.constructor === Symbol &&
								e !== Symbol.prototype
								? "symbol"
								: typeof e;
					  }),
			e(t)
		);
	}
	var t = window.wp.element,
		a = window.wp.i18n,
		o = window.wp.blocks,
		l = window.wp.blockEditor,
		r = window.wp.components;
	window.React,
		(0, window.wp.hooks.addFilter)(
			"editor.MediaUpload",
			"core/edit-post/components/media-upload/replace-media-upload",
			function () {
				return l.MediaUpload;
			}
		),
		(0, o.registerBlockType)("clashplayer/media", {
			title: (0, a.__)("ClashPlayer", "clashplayer"),
			icon: { src: "hammer" },
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
				id: { type: "number" },
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
			supports: { align: ["wide", "full", "none"] },
			edit: function (o) {
				var n = o.attributes,
					i = n.id,
					s = n.autoplay,
					c = n.loop,
					d = n.preload,
					u = n.src,
					m = n.types,
					p = o.setAttributes,
					v = o.className,
					b = o.noticeOperations,
					y = ["audio", "video"];
				function E(t) {
					return function (a) {
						var o, l, r;
						p(
							((o = {}),
							(r = a),
							(l = (function (t) {
								var a = (function (t, a) {
									if ("object" !== e(t) || null === t) return t;
									var o = t[Symbol.toPrimitive];
									if (void 0 !== o) {
										var l = o.call(t, "string");
										if ("object" !== e(l)) return l;
										throw new TypeError(
											"@@toPrimitive must return a primitive value."
										);
									}
									return String(t);
								})(t);
								return "symbol" === e(a) ? a : String(a);
							})((l = t))) in o
								? Object.defineProperty(o, l, {
										value: r,
										enumerable: !0,
										configurable: !0,
										writable: !0,
								  })
								: (o[l] = r),
							o)
						);
					};
				}
				var g = function (e) {
					e && e.url
						? p({ src: e.url, id: e.id })
						: p({ src: void 0, id: void 0 });
				};
				return (
					(0, t.createElement)(
						"audio",
						{ id: "clashaudio-player", preload: d, loop: c, autoPlay: s },
						(0, t.createElement)("source", { src: u, type: m }),
						(0, t.createElement)("track", {
							src: "fgsubtitles_en.vtt",
							kind: "captions",
							srcLang: "en",
							label: "English",
						})
					),
					(0, t.createElement)(
						"video",
						{ id: "clashvideo-player", preload: d, loop: c, autoPlay: s },
						(0, t.createElement)("source", { src: u, type: m }),
						(0, t.createElement)("track", {
							src: "fgsubtitles_en.vtt",
							kind: "captions",
							srcLang: "en",
							label: "English",
						})
					),
					console.log(m),
					(0, t.createElement)(
						"div",
						{
							className: "".concat(
								v,
								" clashplayer-block clashplayer-editable"
							),
						},
						(0, t.createElement)(
							l.BlockControls,
							null,
							(0, t.createElement)(
								r.Toolbar,
								null,
								(0, t.createElement)(l.MediaReplaceFlow, {
									mediaId: i,
									mediaURL: u,
									allowedTypes: y,
									accept: "audio/*, video/*",
									onSelect: g,
									onSelectURL: function (e) {
										p({ src: e, id: void 0 });
									},
									onError: function (e) {
										b.removeAllNotices(), b.createErrorNotice(e);
									},
								}),
								(0, t.createElement)(
									l.MediaUploadCheck,
									null,
									(0, t.createElement)(l.MediaUpload, {
										onSelect: g,
										allowedTypes: y,
										value: i,
										render: function (e) {
											var a = e.open;
											return (0, t.createElement)(
												r.Button,
												{ onClick: a },
												"Open Media Library"
											);
										},
									})
								)
							)
						),
						(0, t.createElement)(
							l.InspectorControls,
							null,
							(0, t.createElement)(
								r.PanelBody,
								{ title: (0, a.__)("Audio settings") },
								(0, t.createElement)(r.TextControl, {
									label: "Audio or Video URL",
									help: "type audio url into this field",
									value: u,
									onChange: function (e) {
										p({ src: e });
									},
								}),
								(0, t.createElement)(r.ToggleControl, {
									label: (0, a.__)("Autoplay"),
									onChange: E("autoplay"),
									checked: s,
									help: function (e) {
										return e
											? (0, a.__)(
													"Note: Autoplaying audio may cause usability issues for some visitors."
											  )
											: null;
									},
								}),
								(0, t.createElement)(r.ToggleControl, {
									label: (0, a.__)("Loop"),
									onChange: E("loop"),
									checked: c,
								}),
								(0, t.createElement)(r.SelectControl, {
									label: (0, a.__)("Preload"),
									value: d || "",
									onChange: function (e) {
										return p({ preload: e || void 0 });
									},
									options: [
										{ value: "", label: (0, a.__)("Browser default") },
										{ value: "auto", label: (0, a.__)("Auto") },
										{ value: "metadata", label: (0, a.__)("Metadata") },
										{ value: "none", label: (0, a.__)("None") },
									],
								}),
								(0, t.createElement)(r.SelectControl, {
									label: (0, a.__)("Format"),
									value: m || "",
									onChange: function (e) {
										return p({ types: e || void 0 });
									},
									options: [
										{
											value: "audio/mpeg",
											label: (0, a.__)("Browser default"),
										},
										{ value: "audio/ogg", label: (0, a.__)("ogg") },
										{ value: "audio/m4a", label: (0, a.__)("m4a") },
										{ value: "video/mp4", label: (0, a.__)("mp4") },
										{ value: "video/webm", label: (0, a.__)("webm") },
									],
								})
							)
						),
						(0, t.createElement)(
							"div",
							{ className: "audio-controls video-controls" },
							(0, t.createElement)(
								"div",
								{ id: "btns-box" },
								(0, t.createElement)("button", {
									id: "play-toggle",
									className:
										"player-button audio-toggle video-toggle dashicons dashicons-controls-play",
									type: "button",
								}),
								(0, t.createElement)("button", {
									id: "rewind",
									className:
										"player-button audio-rewind video-rewind dashicons dashicons-controls-back",
									type: "button",
								}),
								(0, t.createElement)("button", {
									id: "forward",
									className:
										"player-button audio-forward video-forward dashicons dashicons-controls-forward",
									type: "button",
								})
							),
							(0, t.createElement)(
								"div",
								{ id: "progress" },
								(0, t.createElement)("progress", {
									value: "0",
									id: "playback",
									className: "audio-playback video-playback",
								}),
								(0, t.createElement)("span", {
									id: "load-progress",
									className: "audio-load-progress video-load-progress",
								}),
								(0, t.createElement)("span", {
									id: "play-progress",
									className: "audio-play-progress video-play-progress",
								})
							),
							(0, t.createElement)(
								"div",
								{ className: "video-seek audio-seek" },
								(0, t.createElement)(
									"label",
									{ htmlFor: "seek" },
									(0, t.createElement)("input", {
										type: "range",
										id: "seek",
										title: "seek",
										min: "0",
										value: "0",
										max: "0",
									})
								)
							),
							(0, t.createElement)(
								"div",
								{ id: "time", className: "audio-time video-time" },
								(0, t.createElement)("span", null, "current time"),
								(0, t.createElement)(
									"span",
									{
										id: "current-time",
										className: "audio-current video-current",
									},
									"00:00"
								),
								(0, t.createElement)("span", null, "duration"),
								(0, t.createElement)(
									"span",
									{
										id: "duration-time",
										className: "audio-duration video-duration",
									},
									"00:00"
								)
							),
							(0, t.createElement)(
								"div",
								{ className: "video-volume audio-volume" },
								(0, t.createElement)(
									"label",
									{ id: "volume-bar", htmlFor: "volume" },
									(0, t.createElement)("input", {
										type: "range",
										className: "audio-volume video-volume",
										id: "volume",
										title: "volume",
										min: "0",
										max: "1",
										step: "0.1",
										value: "1",
									})
								)
							)
						)
					)
				);
			},
			save: function (e) {
				var a = e.attributes,
					o = a.src,
					l = a.preload,
					r = a.loop,
					n = a.autoplay,
					i = a.types,
					s = e.className;
				return (
					(0, t.createElement)(
						"audio",
						{ id: "clashaudio-player", preload: l, loop: r, autoPlay: n },
						(0, t.createElement)("source", { src: o, type: i }),
						(0, t.createElement)("track", {
							src: "fgsubtitles_en.vtt",
							kind: "captions",
							srcLang: "en",
							label: "English",
						})
					),
					(0, t.createElement)(
						"video",
						{ id: "clashvideo-player", preload: l, loop: r, autoPlay: n },
						(0, t.createElement)("source", { src: o, type: i }),
						(0, t.createElement)("track", {
							src: "fgsubtitles_en.vtt",
							kind: "captions",
							srcLang: "en",
							label: "English",
						})
					),
					console.log(i),
					(0, t.createElement)(
						"div",
						{
							className: "".concat(s, " clashplayer-block clashplayer-static"),
						},
						(0, t.createElement)(
							"div",
							{ className: "audio-controls video-controls" },
							(0, t.createElement)(
								"div",
								{ id: "btns-box" },
								(0, t.createElement)(
									"button",
									{
										id: "play-toggle",
										className: "player-button audio-toggle video-toggle",
										type: "button",
									},
									(0, t.createElement)("i", {
										className: "fa fa-play",
										"aria-hidden": "true",
										title: "Play",
									})
								),
								(0, t.createElement)(
									"button",
									{
										id: "rewind",
										className: "player-button audio-rewind video-rewind",
										type: "button",
									},
									(0, t.createElement)("i", {
										className: "fa fa-backward",
										"aria-hidden": "true",
										title: "Backward",
									})
								),
								(0, t.createElement)(
									"button",
									{
										id: "forward",
										className: "player-button audio-forward video-forward",
										type: "button",
									},
									(0, t.createElement)("i", {
										className: "fa fa-forward",
										"aria-hidden": "true",
										title: "Forward",
									})
								)
							),
							(0, t.createElement)(
								"div",
								{ id: "progress" },
								(0, t.createElement)("progress", {
									value: "0",
									id: "playback",
									className: "audio-playback video-playback",
								}),
								(0, t.createElement)("span", {
									id: "load-progress",
									className: "audio-load-progress video-load-progress",
								}),
								(0, t.createElement)("span", {
									id: "play-progress",
									className: "audio-play-progress video-play-progress",
								})
							),
							(0, t.createElement)(
								"div",
								{ className: "video-seek audio-seek" },
								(0, t.createElement)(
									"label",
									{ htmlFor: "seek" },
									(0, t.createElement)("input", {
										type: "range",
										id: "seek",
										title: "seek",
										min: "0",
										value: "0",
										max: "0",
									})
								)
							),
							(0, t.createElement)(
								"div",
								{ id: "time", className: "audio-time video-time" },
								(0, t.createElement)("span", null, "current time"),
								(0, t.createElement)(
									"span",
									{
										id: "current-time",
										className: "audio-current video-current",
									},
									"00:00"
								),
								(0, t.createElement)("span", null, "duration"),
								(0, t.createElement)(
									"span",
									{
										id: "duration-time",
										className: "audio-duration video-duration",
									},
									"00:00"
								)
							),
							(0, t.createElement)(
								"div",
								{ className: "video-volume audio-volume" },
								(0, t.createElement)(
									"label",
									{ id: "volume-bar", htmlFor: "volume" },
									(0, t.createElement)("input", {
										type: "range",
										className: "audio-volume video-volume",
										id: "volume",
										title: "volume",
										min: "0",
										max: "1",
										step: "0.1",
										value: "1",
									})
								)
							)
						)
					)
				);
			},
		});
})();
