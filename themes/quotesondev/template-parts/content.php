<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

$source = get_post_meta(get_the_id(), '_qod_quote_source', true);
$source_url = get_post_meta(get_the_id(), '_qod_quote_source_url', true)
 //Code to set veriables for add source and source url (get_post_meta)
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="entry-content">
		<p><?php the_content(); ?></p>
	</div><!-- .entry-content -->

	<div class="entry-meta">
		<h2 class="entry-title">— <?php the_title()?></h2>
	
		<?php if ($source && $source_url) : ?>
			<span class="source">, <a href="<?php echo $source_url ?>"><?php echo $source ?></a></span>
		
			<?php elseif ($source) : ?>
				<span class="source">, <?php echo $source ?></span>

			<?php else : ?>
				<span class="source"></span>

		<?php  endif; ?>
	</div><!--.entry-meta -->
</article><!-- #post-## -->


		
<?php if ( is_home() || is_single() ) : ?>
	<!-- show random button -->
	<button id="new_quote_button">Show me another!</button>
<?php endif; ?>

