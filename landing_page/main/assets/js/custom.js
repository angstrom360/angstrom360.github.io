// Portfolio tabs
$(function () {
  "use strict";
    var filterList = {
      init: function () {
        $('#portfoliolist').mixItUp({
          selectors: {
            target: '.portfolio',
            filter: '.filter' 
          },
          load: {
            filter: '.designs, .development, .seo, .marketing'  
          }     
        });    
      }
    };
    // Run the show!
    filterList.init();    
  });

  // Portfolio tabs
$(function () {
  "use strict";
    var filterList = {
      init: function () {
        $('#portfoliolist1').mixItUp({
          selectors: {
            target: '.portfolio',
            filter: '.filter' 
          },
          load: {
            filter: '.yoga, .fitness, .gym, .running'  
          }     
        });    
      }
    };
    // Run the show!
    filterList.init();    
  }); 

$(function () {
  "use strict";
    var filterList = {
      init: function () {
        $('#portfoliolist2').mixItUp({
          selectors: {
            target: '.portfolio',
            filter: '.filter' 
          },
          load: {
            filter: '.breakfast, .lunch, .dinner, .snack'  
          }     
        });    
      }
    };
    // Run the show!
    filterList.init();    
  }); 

$(function () {
  "use strict";
    var filterList = {
      init: function () {
        $('#portfoliolist3').mixItUp({
          selectors: {
            target: '.portfolio',
            filter: '.filter' 
          },
          load: {
            filter: '.cardiology, .dental, .surgeries, .patology'  
          }     
        });    
      }
    };
    // Run the show!
    filterList.init();    
  }); 

// header Fixed class
$(window).on("scroll", function(){   
var scroll = $(window).scrollTop();
if (scroll >= 2) {
    $(".main_header").addClass("dark_bg");
} else {
    $(".main_header").removeClass("dark_bg");
}
});

// header Menu Scroll down js
$(window).on("scroll", function(){ 
  var scrollPos = $(window).scrollTop();
  $('.main_menu_list li a').on("each", function(){  
    var currentElement = $(this);
    var currentTop =  $($(this).attr('href')).offset().top - 80;
    var currentHeight = $(currentElement.attr("href")).outerHeight();
    if ( currentTop <= scrollPos && (currentTop + currentHeight) > scrollPos ) {
            $(currentElement).parent().siblings().find('a').removeClass('active');
            $(currentElement).addClass('active');
        }
        else{
            $(currentElement).removeClass('active');
        }
});
});
$('.main_menu_list li a').on('click', function(e) {
  e.preventDefault()

  $('html, body').animate(
    {
      scrollTop: $($(this).attr('href')).offset().top - 77,
    },
    500,
    'linear'
  )
});


// Scroll up js
$(window).on("scroll", function(){
    if ($(this).scrollTop() >= 50) {       
        $('.scrollUp').fadeIn(200);   
    } else {
        $('.scrollUp').fadeOut(200);   
    }
});
$('.scrollUp').on('click', function() {
    $('body,html').animate({
        scrollTop : 0                       
    }, 800);
});

$(document).ready(function () {
// scroll Down js
$('.scroll_down').on('click', function(e) {
  e.preventDefault()
  $('html, body').animate({scrollTop: $('#about').offset().top - 77, },'slow')
});

$( ".sliding_link" ).on("click", function( event ){
    event.preventDefault();
    $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
});


// portfolio popup js
$('#portfoliolist .portfolio_item,#portfoliolist1 .portfolio_item,.galleryList .gallery_item').magnificPopup({
  delegate: 'a',
  gallery: {
      enabled: true
    },
  type: 'image'
});

// portfolio popup js
$('.get_quote').magnificPopup({
});


$('.open-popup-link').magnificPopup({
  type:'inline',
  midClick: true
});




// mobile menu toggle
$(".menu-bar").on('click', function() {
  $(this).addClass('active');
  $('.main_menu').addClass('opened');
});
$(".close_menu").on('click', function() {
  $('.menu-bar').removeClass('active');
  $('.main_menu').removeClass('opened');
});
});


// Counter js
jQuery(window).scroll(startCounter);
function startCounter() {
    "use strict";
    var hT = jQuery('.love_counter').offset().top,
        hH = jQuery('.love_counter').outerHeight(),
        wH = jQuery(window).height();
    if (jQuery(window).scrollTop() > hT+hH-wH) {
        jQuery(window).off("scroll", startCounter);
        jQuery('.love_count').each(function () {
            var $this = jQuery(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.ceil(this.Counter) );
                }
            });
        });
    }
}


// Main Slider Slide animation
function mainSlider() {
        "use strict";
        var BasicSlider = $('.banner_slider');
        BasicSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.b_slide').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.b_slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });    

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();

if ($(".b_slide").hasClass(".slick-active") ) {
   alert("sfsd");
    $(this).find(".wow").removeClass('wow');
}



// Loader Js
$(window).on("load", function(){
    $(".loader").fadeOut("slow");
});


// go down
$(".go_down_arrow i.fa,.sliding_link").on('click', function() {
    $('html, body').animate({
        scrollTop: $("#main_body").offset().top
    }, 800);
});


// banner slider js
$('.banner_slider').slick({
  dots: true,
  infinite: true,
  speed: 2000,
  // fade:true,
  slidesToShow: 1,
  arrows:false,
  autoplay:true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 767,
      settings: {
         dots: false,
      }
    }
  ]
}) 


// porfloio slider  js
$('.porfloio_slider').slick({
  dots: false,
  infinite: true,
  speed: 500,
  // fade:true,
  slidesToShow: 1,
  arrows:true,
  autoplay:true,
  slidesToScroll: 1
}) 


// Teams slider js
$('.team_list').slick({
  dots: false,
  infinite: true,
  speed: 500,
  // fade:true,
  slidesToShow: 4,
  arrows:true,
  autoplay:true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}) 

// related items slider js
$('.related_items_slider').slick({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  arrows:false,
  autoplay:true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}) 


// testimonials slider  js
$('.testi_slider').slick({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  arrows:false,
  autoplay:true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}) 

// Partners slider  js
$('.partners_slider').slick({
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  arrows:false,
  autoplay:true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}) 

// Wow animation call
new WOW().init();





