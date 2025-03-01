/* Master JS file */
window.$ = require('jquery');
require('jquery-sticky');
require('jquery.mmenu');

$(document).ready(function(){
  $(".menu").sticky({topSpacing:0});

  if($(window).height() > 920) {
    $('.tl-card--step1').css('visibility', 'hidden');
    $('.tl-card--step2').css('visibility', 'hidden');
    $('.tl-card--step3').css('visibility', 'hidden');

    $(".timeline2").css('visibility', 'hidden');

    $(".contactlinks").css('visibility', 'hidden');
  }

  $("#mobilemenu").mmenu({
     "extensions": [
        "fullscreen",
        "pagedim-black",
        "theme-dark"
     ],
     'navbar': false,
		 'navbars': {
			    content: ["close"],
		  },
      "pageScroll": true
  });
});

$(".navBtn").click(function(event) {
  event.preventDefault();
  $('html,body').animate({scrollTop: $($(this).attr('href')).offset().top},'slow');
});

if($(window).height() > 920) {
  $(document).on('scroll', function() {
      if($(this).scrollTop()>=$('#about').position().top + 70){
          $('#about').addClass('animated bounceIn');
      }

      if($(this).scrollTop()>=$('#education').position().top + 270){
        $('.tl-card--step1').css('visibility', 'visible');
        $('.tl-card--step1').addClass('animated fadeIn');

        setTimeout(function() {
          $('.tl-card--step2').css('visibility', 'visible');
          $('.tl-card--step2').addClass('animated fadeIn');

          setTimeout(function() {
            $('.tl-card--step3').css('visibility', 'visible');
            $('.tl-card--step3').addClass('animated fadeIn');
          }, 200);
        }, 200);
      }

      if($(this).scrollTop()>=$('#experiences').position().top + 70) {
        $(".timeline2").css('visibility', 'visible');
        $(".timeline2").addClass('animated zoomIn');
      }

      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $(".contactlinks").css('visibility', 'visible');
        $(".contactlinks").addClass('animated bounceIn');
      }
  });
}
