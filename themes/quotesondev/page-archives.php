<?php
/**
 * The template for displaying the archives.png
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
		<section class="browser-archives">
			<header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			</header><!-- .entry-header -->			

			<div class="post-archives clearfix">
				<h2 class="entry-title">Quote Authors</h2>
				<ul>
					<?php
					global $post;
					$args = array( 'numberposts' => -1);
					$myposts = get_posts( $args );
						foreach( $myposts as $post ) :
							setup_postdata($post); ?>
							<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
						<?php endforeach; 
					wp_reset_postdata(); ?>
				</ul>
			</div>

			<div class="category-archives clearfix">
				<h2 class="entry-title">Categories</h2>
				<ul>
					<!-- <?php wp_list_categories(); ?> -->

					<?php wp_tag_cloud( array( 'taxonomy' => 'category' ) ); ?>
					
				</ul>
			</div>
			

			<div class="tag-archives clearfix">
				<h2 class="entry-title">Tags</h2>
					<ul>	
						<?php wp_tag_cloud(); ?>
				</ul>	
			</div>
		</section>


		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
