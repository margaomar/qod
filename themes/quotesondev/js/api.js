/**
 * File api.js.
 *
 */

(function($){
  /*Ajax-based random post fetching.*/
  /*Random button GET action*/
 $(function(){
   $('#new_quote_button').click(function(event) {
    event.preventDefault();
     $.ajax({
       method: 'get',
       url: api_vars.root_url + 
       'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
       cache: false 
     }).done(function(data){
       const post = data.shift();
       title = post.title.rendered;
       content = post.content.rendered;
       quoteSource = post._qod_quote_source;
       $quoteSourceUrl = post._qod_quote_source_url;
       $( '.entry-title' ).text( title );
       $( '.entry-content' ).html( content );
       $( '.source' ).html('<a href="' + quoteSourceUrl + '">' + quoteSource +'</a>');

       //get the first and only post array - data.shift()
       // update the quote content and name of the quote person
       //display quote source if available
       // update the URL using history
     });
   
   });
 });

 // /* Ajax-based front-end post submission*/
  $(function(){
//Event on submit on the form
     $('#form_qod').on('submit',function(event) {
       event.preventDefault();
       const data = {
          title: $('#update-title').val(),
          content: $('#update-content').val(),
          _qod_quote_source: $('#update-quote_added').val(),
          _qod_quote_source_url: $('#update-quote_added_url').val(),
          post_status: 'pending'
        }
       $.ajax({
           method: 'POST',
           url: api_vars.root_url + 'wp/v2/posts',
           data,
           beforeSend: function(xhr) {
              xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce );
           }
           
         }).done(function(data, statusText, xhr){
          $('#form_qod')
            .slideUp()
            .find('input[type="submit"], input[type="text"], textarea')
            .val('');

            const status = xhr.status;
            if(status === 201) {
              $('.submit-fail-msg').hide();
              $('.submit-sucess-msg').text(api_vars.success)}
              // clear the form fields and hide the form
              //Use jquery so hide the form in a slidey way
        
              //show success message using the var from functions.php
              
        
            }).fail(function() {
              $('.submit-fail-msg').text(api_vars.failure);
              //Post and alert with failure var from function.php
            })
     });
});

})(jQuery);


