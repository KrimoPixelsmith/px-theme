<?php
	
	/**
	 * Match any images that are missing and return a 404 custom image
	 */
	if ( preg_match( '~\.(jpe?g|png|gif|svg|bmp)(\?.*)?$~i', $_SERVER['REQUEST_URI'] ) )
	{
		header( 'Content-Type: image/png' );
		readfile('http://placehold.it/400x400?text=missing%20image');
		exit;
	}

	get_header();
	
?>

	<div class="container">

		<h1>Error 404 - Page Not Found</h1>

	</div>
	<!-- /.container -->

<?php get_footer(); ?>
