<?php get_header(); ?>

	<section role="document">
		<?php
			if ( have_rows('modules') ):

				while ( have_rows('modules') ) : the_row();

					get_template_part('modules/px', get_row_layout());

				endwhile;

			endif;
		?>	
	</section>

<?php get_footer(); ?>