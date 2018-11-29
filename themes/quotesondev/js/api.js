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
       url: api_vars.root_url + // eslint-disable-line 
       'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
       cache: false 
     }).done(function(data){
       //get the first and only post array - data.shift()
       const post = data.shift(),
       title = post.title.rendered,
       content = post.content.rendered,
       quoteSource = post._qod_quote_source,
       quoteSourceUrl = post._qod_quote_source_url;
      // update the quote content and name of the quote person
       $( '.entry-title' ).text('— ' + title );
       $( '.entry-content' ).html( content );
       //$( '.source' ).html('<a href="' + quoteSourceUrl + '">' + quoteSource +'</a>');
      //display quote source if available
      if (quoteSource && quoteSourceUrl) {
        $( '.source' ).html(', <a href="' + quoteSourceUrl + '">' + quoteSource +'</a>');
      } else if (quoteSource){
        $( '.source' ).html('<span>, </span>' + quoteSource);
      } else {
        $( '.source' ).html('');
      }

       // update the URL using history, also use post.link from the array to get the completelly link, with the title
       history.pushState(null, null, post.link)
     });
    });
   // Make the back and forward nav work with the history API, and we need it out of the click event.
    window.addEventListener('popstate', function() {
      let LastPage = document.URL;
      window.location.replace(LastPage);
    })
 });

 // /* Ajax-based front-end post submission*/
  $(function(){
      //Event on submit on the form
      $('#form_qod').on('submit',function(event) {
        event.preventDefault();
        const data = {
          title: $('#update-title').val(),
          content: $('#update-content').val(),
          _qod_quote_source: $('#update-quote_added').val(), // eslint-disable-line 
          _qod_quote_source_url: $('#update-quote_added_url').val(), // eslint-disable-line 
          post_status: 'pending' // eslint-disable-line 
        }
        $.ajax({
           method: 'POST',
           url: api_vars.root_url + 'wp/v2/posts', // eslint-disable-line 
           data,
           beforeSend: function(xhr) {
              xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce ); // eslint-disable-line 
           }
           
        }).done(function(data, statusText, xhr){
          $('#form_qod')
            //clear the form fields and Use jquery so hide the form in a slideup
            .slideUp()
            .find('input[type="submit"], input[type="text"], textarea')
            .val('');
            //show success message using the var from functions.php
            const status = xhr.status;
            if(status === 201) {
              $('.submit-fail-msg').hide();
              $('.submit-sucess-msg').text(api_vars.success)} // eslint-disable-line 
        }).fail(function() {
          //Post and alert with failure var from function.php
          $('.submit-fail-msg').text(api_vars.failure); // eslint-disable-line 
        })
     });
  });

})(jQuery);


