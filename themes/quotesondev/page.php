<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section>
				<header class="entry-header">
					<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
				</header><!-- .entry-header -->
					
					<?php if (is_user_logged_in() ) :  ?>  
					<!-- // && can_user_edit_posts() -->

						<form id="form_qod" method="POST">
							<label for="update-title">Author of Quote</label>
							<input type="text" id="update-title"/>

							<label for="update-content">Quote</label>
							<textarea type="text" id="update-content" rows="3"></textarea>

							<label for="update-quote_added">Where did you find this quote? (e.g. book name)</label>
							<input type="text" id="update-quote_added"/>

							<label for="update-quote_added_url">Provide the URL of the quote source, if available.</label>
							<input type="text" id="update-quote_added_url"/>

							<input type="submit" id="submit" value="Submit Quote"/>
						</form>

						<p class="submit-sucess-msg"></p>
						<p class="submit-fail-msg"></p> 
					
					<?php else :     ?>
						<p>Sorry, you must be logged in to submit a quote!</p>
						<p><a href="<?php echo esc_url( home_url( '/' ) ); ?>/wp-login.php">Click here to login.</a></p>

					<?php endif; ?>
			</section>





		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
