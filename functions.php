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
	wp_register_script('hello-theme-child', get_stylesheet_directory_uri() . '/dist/hello-theme-child.min.js', '', '', true);
	wp_enqueue_script('hello-theme-child');
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts');
