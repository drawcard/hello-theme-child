<?php

/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 */

/**
 * Load child theme css and optional scripts
 *
 * @return void
 */
function hello_elementor_child_enqueue_scripts()
{
	wp_enqueue_style(
		'hello-elementor-child-style',
		get_stylesheet_directory_uri() . '/style.css',
		[
			'hello-elementor-theme-style',
		],
		'1.0.0'
	);
	wp_enqueue_script('vendor-js', get_stylesheet_directory_uri() . 'assets/js/vendor.min.js', null, null, true);
	wp_enqueue_script('custom-js', get_stylesheet_directory_uri() . 'assets/js/custom.min.js', null, null, true);
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts');
