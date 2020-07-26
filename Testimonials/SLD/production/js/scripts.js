/**
	*
	* ---------------------------------------------------------
	*
	* Template : TESTIMONIALS
	* Version  : 1.0
	* Author   : sodedar1984  
	* Email    : sodedar10@meta.ua or sldedar1984@gmail.com
	
	* ---------------------------------------------------------
	*
*/
;(function($) {
	
	"use strict";
	
	/*
		* -------------------------------------------------------
		*  CAROUSEL TESTIMONIALS
		* -------------------------------------------------------
	*/	
	
	/* dekstop show 1 block */
	if ($('.testimonials-carousel-one').length) {
		$('.testimonials-carousel-one').owlCarousel({
			loop: true,
			margin: 30,
			dots: true,
			nav: false,
			autoHeight: true,      
			lazyLoad: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				800: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		});
	}  
	
	/* dekstop show 2 block */
	if ($('.testimonials-carousel-two').length) {
		$('.testimonials-carousel-two').owlCarousel({
			loop: true,
			margin: 30,
			dots: true,
			nav: false,
			autoHeight: true,      
			lazyLoad: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				800: {
					items: 2
				},
				1000: {
					items: 2
				}
			}
		});
	}  
	
	/* dekstop show 3 block */
	if ($('.testimonials-carousel-three').length) {
		$('.testimonials-carousel-three').owlCarousel({
			loop: true,
			margin: 30,
			dots: true,
			nav: false,
			autoHeight: true,      
			lazyLoad: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				800: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});
	}  
	
	
})(window.jQuery);