<?php

/**
 * Plugin Name: Clashvibes Audio/Video Player Block
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


/**
 * Enqueue block editor JavaScript and CSS.
 */
function clashplayer_frontend_scripts()
{
	// Make paths variables so we don't write em twice 😉.
	$block_path    = './build/audio-es6.js';
	$block_pathtwo = './build/video-es6.js';

	// Enqueue the bundled block JS file.
	if (has_block('clashplayer/media')) {
		wp_enqueue_script(
			'clashvibes-blocks-js',
			plugins_url($block_path, __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data'),
			filemtime(plugin_dir_path(__FILE__) . $block_path),
			true
		);
		wp_enqueue_script(
			'clashvibes-blockstwo-js',
			plugins_url($block_pathtwo, __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data'),
			filemtime(plugin_dir_path(__FILE__) . $block_pathtwo),
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
		// label.
		'clashplayer-editor-script',
		// script file.
		plugins_url('build/index.js', __FILE__),
		// dependencies.
		array('wp-blocks', 'wp-i18n', 'wp-editor', 'wp-data', "wp-components"),
		// set version as file last modified time.
		filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
		true
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

	// Calls registered styles and script above.
	register_block_type(
		'clashplayer/media',
		array(
			'editor_script' => 'clashplayer-editor-script',
			'editor_style'  => 'clashplayer-editor-styles',
			'style'         => 'clashplayer-front-end-styles',

		)
	);

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
