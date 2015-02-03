/* required by splash page */
$(function(){
  //pluginCarousel var is intentionally kept global, so that it can be used by other plugins
  pluginCarousel = $('#atn-plugin-carousel').bxSlider({ 
          pager: true, slideWidth: 304, infiniteLoop:false,
          minSlides: 1, maxSlides:1, moveSlides:1,
          onSliderLoad: function() {
            var $pluginContainer =  $('#atn-plugin-container');
            var totalSlides = $('#atn-plugin-carousel li').length;
            if(totalSlides < 2) {
                $pluginContainer.find('.bx-controls').hide();                                          
            }
          }
    });

  $('body').delegate('.atn-social-webform','click', function(e){
    $('#webFormModal').modal('show');
  });

});
