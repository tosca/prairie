
/*global $:false */
/*global window: false */

(function(){
  "use strict";


$(function ($) {


    $(window).load(function(){
    

        
        var $container = $('.works-container');


        $container.isotope({
          // options
          itemSelector: '.works-item',
          layoutMode: 'masonry'
        });


        $('.works-filter li a').click(function(){
        $('.works-filter li a').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
              $('.works-container').isotope({ filter: selector });
              return false;
        });

        // window resize and layout regenerate
        $(window).resize(function() {
             $container.isotope({
              // options
              itemSelector: '.works-item',
              layoutMode: 'masonry'
            });

        });

    });

      
        
   
});
// $(function ($)  : ends

})();
//  JSHint wrapper $(function ($)  : ends







  

