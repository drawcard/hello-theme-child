<?php
// Require the composer autoload for getting conflict-free access to enqueue
require_once __DIR__ . '/vendor/autoload.php';

// Instantiate
$enqueue = new \WPackio\Enqueue('helloThemeChild', 'dist', '1.0.0', 'plugin', __FILE__);
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
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts', PHP_INT_MAX);


/*
Integrations
To disable each integration, delete its block of code below
*/

/* START Intervention */

use function \Sober\Intervention\intervention;

if (function_exists('\Sober\Intervention\intervention')) {
	// now you can use the function to call the required modules and their params

	// Allow SVG uploads
	intervention('add-svg-support', ['admin', 'editor']);

	//Remove 'Howdy'
	intervention('remove-howdy');
}
/* END Intervention */
