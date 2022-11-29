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

defined('ABSPATH') || exit;

/**
 * Load translations (if any) for the plugin from the /languages/ folder.
 *
 * @link https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
 */
add_action('init', 'clashplayer_load_textdomain');

function clashplayer_load_textdomain()
{
	load_plugin_textdomain('clashplayer', false, basename(__DIR__) . '/languages');
}

//add_action('enqueue_block_assets', 'clashplayer_frontend_scripts'); // Can only be loaded in the footer
add_action('wp_enqueue_scripts', 'clashplayer_frontend_scripts'); // Can be loaded in the both in head and footer
/**
 * Enqueue block editor JavaScript and CSS
 */
function clashplayer_frontend_scripts()
{

	// Make paths variables so we don't write em twice 😉
	$blockPath = '/build/audio-es6.js';

	//   // Enqueue the bundled block JS file
	if (has_block('clashplayer/media')) {
		wp_enqueue_script(
			'clashvibes-blocks-js',
			plugins_url($blockPath, __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-data"),
			filemtime(plugin_dir_path(__FILE__) . $blockPath),
			true
		);
	}
}

/**
 * Add custom "clashplayer" block category
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter('block_categories', 'clashplayer_block_categories', 10, 2);

function clashplayer_block_categories($categories, $post)
{
	if ($post->post_type !== 'post') {
		return $categories;
	}
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'clashplayer',
				'title' => __('ClashPlayer', 'clashplayer'),
				'icon'  => 'microphone',
			),
		)
	);
}

/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
add_action('init', 'clashplayer_register_blocks');

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
		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-data"),		// dependencies
		filemtime(plugin_dir_path(__FILE__) . 'build/index.js')		// set version as file last modified time
	);

	// Register the block editor stylesheet.
	wp_register_style(
		'clashplayer-editor-styles',											// label
		plugins_url('build/editor.css', __FILE__),					// CSS file
		array('wp-edit-blocks'),										// dependencies
		filemtime(plugin_dir_path(__FILE__) . 'build/editor.css')	// set version as file last modified time
	);

	// Register the front-end stylesheet.
	wp_register_style(
		'clashplayer-front-end-styles',										// label
		plugins_url('build/style.css', __FILE__),						// CSS file
		array(),														// dependencies
		filemtime(plugin_dir_path(__FILE__) . 'build/style.css')	// set version as file last modified time
	);

	// Loop through $blocks and register each block with the same script and styles.

	register_block_type('clashplayer/media', array(
		'editor_script' => 'clashplayer-editor-script',					// Calls registered script above
		'editor_style' => 'clashplayer-editor-styles',					// Calls registered stylesheet above
		'style' => 'clashplayer-front-end-styles',					// Calls registered stylesheet above

	));

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
