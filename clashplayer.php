<?php

/**
 * Plugin Name: clashplayer Audio/Video Player Block
 * Plugin URI: https://github.com/
 * Description: Custom block plugin .
 * Version: 1.0.0
 * Author: Ray Thompson
 *
 * @package clashplayer
 */


// If this file is called directly, abort.
defined('ABSPATH') || exit;

/**
 * Currently plugin version.
 */
define('CVWDO_VERSION', '1.0.0');

/**
 * Plugin URL
 */
define('CVWDOPATH', plugin_dir_url(__FILE__)); // This include the trailing slash!

function clashplayer_load_textdomain()
{
	load_plugin_textdomain('clashplayer', false, basename(__DIR__) . '/languages');
}

/**
 * Loads dashicons.
 */
function clashplayer_load_dashicons_front_end()
{
	wp_enqueue_style('dashicons');
}
add_action('wp_enqueue_scripts', 'clashplayer_load_dashicons_front_end');

/**
 * Enqueue block editor JavaScript and CSS.
 */
function clashplayer_frontend_scripts()
{
	// Make paths variables so we don't write em twice 😉.
	$block_path    = './build/audio-es6.js';
	$block_pathtwo = './build/video-es6.js';

	// Make paths variables so we don't write em twice
	$blockPathAudio = '/build/audio-es6.js';
	$blockPathVideo = '/build/video-es6.js';

	//   // Enqueue the bundled block JS file
	if (has_block('clashplayer/audio')) {
		wp_enqueue_script(
			'clashplayer-blocks-js',
			plugins_url($blockPathAudio, __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-components"),
			filemtime(plugin_dir_path(__FILE__) . $blockPathAudio),
			true
		);
	}
	if (has_block('clashplayer/video')) {
		wp_enqueue_script(
			'clashplayer-blockstwo-js',
			plugins_url($blockPathVideo, __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-components"),
			filemtime(plugin_dir_path(__FILE__) . $blockPathVideo),
			true
		);
	}
}
// add_action('wp_enqueue_scripts', 'clashplayer_frontend_scripts');
// Can be loaded in the both in head and footer.
// Can only be loaded in the footer.
// add_action('enqueue_block_assets', 'clashplayer_frontend_scripts');

/**
 * Add custom "clashplayer" block category.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 * @param array  $categories post categories.
 * @param object $post post categories.
 */
function clashplayer_block_categories($categories, $post)
{
	if ('post' !== $post->post_type) {
		return $categories;
	}
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'clash-player',
				'title' => __('ClashPlayer', 'clashplayer'),
				'icon'  => 'microphone',
			),
		)
	);
}
add_filter('block_categories', 'clashplayer_block_categories', 10, 2);

/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
function clashplayer_register_blocks()
{
	// If Block Editor is not active, bail.
	if (!function_exists('register_block_type')) {
		return;
	}

	// Retister the block editor script.
	wp_register_script(
		'clashplayer-editor-script',											// label
		plugins_url('build/index.js', __FILE__),						// script file
		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-components"),		// dependencies
		filemtime(plugin_dir_path(__FILE__) . 'build/index.js')		// set version as file last modified time
	);

	// Register the block editor stylesheet.
	wp_register_style(
		// label.
		'clashplayer-editor-styles',
		// CSS file.
		plugins_url('build/editor.css', __FILE__),
		// dependencies.
		array('wp-edit-blocks'),
		// set version as file last modified time.
		filemtime(plugin_dir_path(__FILE__) . 'build/editor.css')
	);

	// Register the front-end stylesheet.
	wp_register_style(
		'clashplayer-front-end-styles',
		plugins_url('build/style.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'build/style.css')
	);

	// Array of block created in this plugin.
	$blocks = [
		'clashplayer/audio',
		'clashplayer/video'

	];

	// Loop through $blocks and register each block with the same script and styles.
	foreach ($blocks as $block) {
		register_block_type($block, array(
			'editor_script' => 'clashplayer-editor-script',					// Calls registered script above
			'editor_style' => 'clashplayer-editor-styles',					// Calls registered stylesheet above
			'style' => 'clashplayer-front-end-styles',					// Calls registered stylesheet above

		));
	}

	if (function_exists('wp_set_script_translations')) {
		/**
		 * Adds internationalization support.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
		 * @link https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
		 */
		wp_set_script_translations('clashplayer-editor-script', 'clashplayer', plugin_dir_path(__FILE__) . '/languages');
	}
}
add_action('init', 'clashplayer_register_blocks');
