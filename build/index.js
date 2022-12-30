!(function () {
	function e(t) {
		return (
			(e =
				typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e &&
								typeof Symbol === "function" &&
								e.constructor === Symbol &&
								e !== Symbol.prototype
								? "symbol"
								: typeof e;
					  }),
			e(t)
		);
	}
	let t;
	const a = window.wp.element;
	const o = window.wp.i18n;
	const l = window.wp.blocks;
	const r = window.wp.blockEditor;
	const n = window.wp.components;
	const i = window.React;
	function c() {
		return (
			(c = Object.assign
				? Object.assign.bind()
				: function (e) {
						for (let t = 1; t < arguments.length; t++) {
							const a = arguments[t];
							for (const o in a)
								Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
						}
						return e;
				  }),
			c.apply(this, arguments)
		);
	}
	(0, window.wp.hooks.addFilter)(
		"editor.MediaUpload",
		"core/edit-post/components/media-upload/replace-media-upload",
		() => r.MediaUpload
	),
		(0, l.registerBlockType)("clashplayer/media", {
			title: (0, o.__)("ClashPlayer", "clashplayer"),
			icon: {
				src(e) {
					return i.createElement(
						"svg",
						c(
							{
								xmlns: "http://www.w3.org/2000/svg",
								viewBox: "0 0 72 72",
								style: { enableBackground: "new 0 0 72 72" },
								xmlSpace: "preserve",
							},
							e
						),
						t ||
							(t = i.createElement("path", {
								d: "M42.9 38.3V38c2.9-.6 4.3-2.2 4.3-4.8V21.6c0-5.4-2.7-8.2-8-8.2H23.3c-.2-.6-.7-1-1.4-1-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4c.7 0 1.2-.4 1.4-1H29v22.1h-5.7c-.2-.6-.7-1-1.4-1-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4c.7 0 1.2-.4 1.4-1H29v20.7h-5.6c-.2-.6-.7-1-1.4-1-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.7 0 1.2-.4 1.4-1H41c4.6 0 6.8-2.2 6.8-6.7v-8.4c.1-2.6-1.6-4.3-4.9-5.2zm-8-19.4h3.6c1.8 0 2.7 1.1 2.7 3.3v9.9c0 2.2-1.2 3.3-3.4 3.3H35V18.9zm6.9 32.2c0 1.3-.8 1.9-2.4 1.9h-4.5V40.8h3.3c2.4 0 3.6 1.1 3.6 3.2v7.1z",
							}))
					);
				},
			},
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
			edit(t) {
				const l = t.attributes;
				const i = l.id;
				const c = l.autoplay;
				const s = l.loop;
				const d = l.preload;
				const u = l.src;
				const m = l.types;
				const p = t.setAttributes;
				const v = t.className;
				const b = t.noticeOperations;
				const y = ["audio", "video"];
				function E(t) {
					return function (a) {
						let o;
						let l;
						let r;
						p(
							((o = {}),
							(r = a),
							(l = (function (t) {
								const a = (function (t, a) {
									if (e(t) !== "object" || t === null) return t;
									const o = t[Symbol.toPrimitive];
									if (void 0 !== o) {
										const l = o.call(t, a);
										if (e(l) !== "object") return l;
										throw new TypeError(
											"@@toPrimitive must return a primitive value."
										);
									}
									return String(t);
								})(t, "string");
								return e(a) === "symbol" ? a : String(a);
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
				const g = function (e) {
					e && e.url
						? p({ src: e.url, id: e.id })
						: p({ src: void 0, id: void 0 });
				};
				const f = (0, a.createElement)(
					"audio",
					{ id: "clashaudio-player", preload: d, loop: s, autoPlay: c },
					(0, a.createElement)("source", { src: u, type: m }),
					(0, a.createElement)("track", {
						src: "fgsubtitles_en.vtt",
						kind: "captions",
						srcLang: "en",
						label: "English",
					})
				);
				const w = (0, a.createElement)(
					"video",
					{ id: "clashvideo-player", preload: d, loop: s, autoPlay: c },
					(0, a.createElement)("source", { src: u, type: m }),
					(0, a.createElement)("track", {
						src: "fgsubtitles_en.vtt",
						kind: "captions",
						srcLang: "en",
						label: "English",
					})
				);
				return (
					console.log(m),
					(0, a.createElement)(
						"div",
						{
							className: "".concat(
								v,
								" clashplayer-block clashplayer-editable"
							),
						},
						(0, a.createElement)(
							r.BlockControls,
							null,
							(0, a.createElement)(
								n.Toolbar,
								null,
								(0, a.createElement)(r.MediaReplaceFlow, {
									mediaId: i,
									mediaURL: u,
									allowedTypes: y,
									accept: "audio/*, video/*",
									onSelect: g,
									onSelectURL(e) {
										p({ src: e, id: void 0 });
									},
									onError(e) {
										b.removeAllNotices(), b.createErrorNotice(e);
									},
								}),
								(0, a.createElement)(
									r.MediaUploadCheck,
									null,
									(0, a.createElement)(r.MediaUpload, {
										onSelect: g,
										allowedTypes: y,
										value: i,
										render(e) {
											const t = e.open;
											return (0, a.createElement)(
												n.Button,
												{ onClick: t },
												"Open Media Library"
											);
										},
									})
								)
							)
						),
						(0, a.createElement)(
							r.InspectorControls,
							null,
							(0, a.createElement)(
								n.PanelBody,
								{ title: (0, o.__)("Audio settings") },
								(0, a.createElement)(n.TextControl, {
									label: "Audio or Video URL",
									help: "type audio url into this field",
									value: u,
									onChange(e) {
										p({ src: e });
									},
								}),
								(0, a.createElement)(n.ToggleControl, {
									label: (0, o.__)("Autoplay"),
									onChange: E("autoplay"),
									checked: c,
									help(e) {
										return e
											? (0, o.__)(
													"Note: Autoplaying audio may cause usability issues for some visitors."
											  )
											: null;
									},
								}),
								(0, a.createElement)(n.ToggleControl, {
									label: (0, o.__)("Loop"),
									onChange: E("loop"),
									checked: s,
								}),
								(0, a.createElement)(n.SelectControl, {
									label: (0, o.__)("Preload"),
									value: d || "",
									onChange(e) {
										return p({ preload: e || void 0 });
									},
									options: [
										{ value: "", label: (0, o.__)("Browser default") },
										{ value: "auto", label: (0, o.__)("Auto") },
										{ value: "metadata", label: (0, o.__)("Metadata") },
										{ value: "none", label: (0, o.__)("None") },
									],
								}),
								(0, a.createElement)(n.SelectControl, {
									label: (0, o.__)("Format"),
									value: m || "",
									onChange(e) {
										return p({ types: e || void 0 });
									},
									options: [
										{
											value: "audio/mpeg",
											label: (0, o.__)("Browser default"),
										},
										{ value: "audio/ogg", label: (0, o.__)("ogg") },
										{ value: "audio/m4a", label: (0, o.__)("m4a") },
										{ value: "video/mp4", label: (0, o.__)("mp4") },
										{ value: "video/webm", label: (0, o.__)("webm") },
									],
								})
							)
						),
						m === "video/mp4" || m === "video/webm" ? w : f,
						(0, a.createElement)(
							"div",
							{ className: "audio-controls video-controls" },
							(0, a.createElement)(
								"div",
								{ id: "btns-box" },
								(0, a.createElement)("button", {
									id: "play-toggle",
									className:
										"player-button audio-toggle video-toggle dashicons dashicons-controls-play",
									type: "button",
								}),
								(0, a.createElement)("button", {
									id: "rewind",
									className:
										"player-button audio-rewind video-rewind dashicons dashicons-controls-back",
									type: "button",
								}),
								(0, a.createElement)("button", {
									id: "forward",
									className:
										"player-button audio-forward video-forward dashicons dashicons-controls-forward",
									type: "button",
								})
							),
							(0, a.createElement)(
								"div",
								{ id: "progress" },
								(0, a.createElement)("progress", {
									value: "0",
									id: "playback",
									className: "audio-playback video-playback",
								}),
								(0, a.createElement)("span", {
									id: "load-progress",
									className: "audio-load-progress video-load-progress",
								}),
								(0, a.createElement)("span", {
									id: "play-progress",
									className: "audio-play-progress video-play-progress",
								})
							),
							(0, a.createElement)(
								"div",
								{ className: "video-seek audio-seek" },
								(0, a.createElement)(
									"label",
									{ htmlFor: "seek" },
									(0, a.createElement)("input", {
										type: "range",
										id: "seek",
										title: "seek",
										min: "0",
										value: "0",
										max: "0",
									})
								)
							),
							(0, a.createElement)(
								"div",
								{ id: "time", className: "audio-time video-time" },
								(0, a.createElement)("span", null, "current time"),
								(0, a.createElement)(
									"span",
									{
										id: "current-time",
										className: "audio-current video-current",
									},
									"00:00"
								),
								(0, a.createElement)("span", null, "duration"),
								(0, a.createElement)(
									"span",
									{
										id: "duration-time",
										className: "audio-duration video-duration",
									},
									"00:00"
								)
							),
							(0, a.createElement)(
								"div",
								{ className: "video-volume audio-volume" },
								(0, a.createElement)(
									"label",
									{ id: "volume-bar", htmlFor: "volume" },
									(0, a.createElement)("input", {
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
			save(e) {
				const t = e.attributes;
				const o = t.src;
				const l = t.preload;
				const r = t.loop;
				const n = t.autoplay;
				const i = t.types;
				const c = e.className;
				const s = (0, a.createElement)(
					"audio",
					{ id: "clashaudio-player", preload: l, loop: r, autoPlay: n },
					(0, a.createElement)("source", { src: o, type: i }),
					(0, a.createElement)("track", {
						src: "fgsubtitles_en.vtt",
						kind: "captions",
						srcLang: "en",
						label: "English",
					})
				);
				const d = (0, a.createElement)(
					"video",
					{ id: "clashvideo-player", preload: l, loop: r, autoPlay: n },
					(0, a.createElement)("source", { src: o, type: i }),
					(0, a.createElement)("track", {
						src: "fgsubtitles_en.vtt",
						kind: "captions",
						srcLang: "en",
						label: "English",
					})
				);
				return (
					console.log(i),
					(0, a.createElement)(
						"div",
						{
							className: "".concat(c, " clashplayer-block clashplayer-static"),
						},
						i === "video/mp4" || i === "video/webm" ? d : s,
						(0, a.createElement)(
							"div",
							{ className: "audio-controls video-controls" },
							(0, a.createElement)(
								"div",
								{ id: "btns-box" },
								(0, a.createElement)(
									"button",
									{
										id: "play-toggle",
										className: "player-button audio-toggle video-toggle",
										type: "button",
									},
									(0, a.createElement)("i", {
										className: "fa fa-play",
										"aria-hidden": "true",
										title: "Play",
									})
								),
								(0, a.createElement)(
									"button",
									{
										id: "rewind",
										className: "player-button audio-rewind video-rewind",
										type: "button",
									},
									(0, a.createElement)("i", {
										className: "fa fa-backward",
										"aria-hidden": "true",
										title: "Backward",
									})
								),
								(0, a.createElement)(
									"button",
									{
										id: "forward",
										className: "player-button audio-forward video-forward",
										type: "button",
									},
									(0, a.createElement)("i", {
										className: "fa fa-forward",
										"aria-hidden": "true",
										title: "Forward",
									})
								)
							),
							(0, a.createElement)(
								"div",
								{ id: "progress" },
								(0, a.createElement)("progress", {
									value: "0",
									id: "playback",
									className: "audio-playback video-playback",
								}),
								(0, a.createElement)("span", {
									id: "load-progress",
									className: "audio-load-progress video-load-progress",
								}),
								(0, a.createElement)("span", {
									id: "play-progress",
									className: "audio-play-progress video-play-progress",
								})
							),
							(0, a.createElement)(
								"div",
								{ className: "video-seek audio-seek" },
								(0, a.createElement)(
									"label",
									{ htmlFor: "seek" },
									(0, a.createElement)("input", {
										type: "range",
										id: "seek",
										title: "seek",
										min: "0",
										value: "0",
										max: "0",
									})
								)
							),
							(0, a.createElement)(
								"div",
								{ id: "time", className: "audio-time video-time" },
								(0, a.createElement)("span", null, "current time"),
								(0, a.createElement)(
									"span",
									{
										id: "current-time",
										className: "audio-current video-current",
									},
									"00:00"
								),
								(0, a.createElement)("span", null, "duration"),
								(0, a.createElement)(
									"span",
									{
										id: "duration-time",
										className: "audio-duration video-duration",
									},
									"00:00"
								)
							),
							(0, a.createElement)(
								"div",
								{ className: "video-volume audio-volume" },
								(0, a.createElement)(
									"label",
									{ id: "volume-bar", htmlFor: "volume" },
									(0, a.createElement)("input", {
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
