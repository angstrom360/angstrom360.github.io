(function ($) { 
	"use strict"; // this function is executed in strict mode	
  
	
 
   
     /** Client Testimonial Slider 1 **/ 
    $(document).ready(function (){ 
        $('.client-testimonail-slider-1').owlCarousel({
            loop:true, 	 
            autoplay:true,
            items:3,
            nav:false,
             dots:false, 
            stagePadding: 100,
            margin:20,   
            responsive:{
                0:{
                    items:1,
                    dots:false, 
                    nav:false,
                    stagePadding: 0,
                    
                },
                768:{
                    items:2,
                     dots:false, 
                    nav:false,
                    stagePadding: 0, 
                },
                1000:{
                    items:2,
                    dots:false,  
                   
                   
                },
                 1200:{
                    items:3, 
                    dots:true,  
                    dots:false, 
                }
            }

        });
   });  
	  
    
     /** Client Testimonial Slider 2 **/ 
    $(document).ready(function (){ 
        $('.client-testimonail-slider-2').owlCarousel({
            loop:true, 	 
            autoplay:true,
            items:1,
            dots:true,
            nav:true,
            center: true, 
            margin:20, 
            Boolean:true,
            responsive:{
                0:{
                    items:1,
                    dots:true, 
                     nav:false,
                  
                    
                },
                768:{
                    items:1,
                    dots:true, 
                     nav:false,
                    
                },
                1000:{
                    items:1,
                    dots:true,  
                    
                   
                },
                 1200:{
                    items:1, 
                    dots:true,  
                    
                }
            }
        });
    });  

		 
    /** client-testimonail-slider-3  **/ 
    $(document).ready(function (){ 
        $('.client-testimonail-slider-3').owlCarousel({
            loop:true, 	 
            autoplay:true,
            items:2,
            margin:20,
            navText:['<i class="fas fa-caret-left"></i>','<i class="fas fa-caret-right"></i>'],
            nav:true, 
            autoplayTimeout:10000,
            responsive:{
                0:{
                    items:1,
                    dots:true, 
                    nav:true,
                     margin:20,
                    
                },
                768:{
                    items:2,
                    dots:true, 
                     nav:false,
                     margin:20,
                    
                },
                1000:{
                    items:2,
                    dots:true,  
                    
                   
                },
                 1200:{
                    items:2, 
                    dots:true,  
                    
                }
            }
        });
    });  

    
    
    /** client-testimonail-slider-4  **/ 
    $(document).ready(function (){ 
        $('.client-testimonail-slider-4').owlCarousel({
            loop:true, 	 
            autoplay:false,
            items:1,
            margin:20,
            navText:['<i class="fas fa-angle-double-left"></i>','<i class="fas fa-angle-double-right"></i>'], 
            nav:true, 
            autoplayTimeout:10000,
            responsive:{
                0:{
                    items:1,
                    dots:true, 
                    nav:true,
                    margin:0,
                    
                },
                768:{
                    items:2,
                    dots:true, 
                     nav:false,
                    
                    
                },
                1000:{
                    items:1,
                    dots:true,  
                    
                   
                },
                 1200:{
                    items:1, 
                    dots:true,  
                    
                }
            }
        });
    });  

    
    
    /** client-testimonail-slider-5  **/ 
    $(document).ready(function (){ 
        $('.client-testimonail-slider-5').owlCarousel({
            loop:true, 	 
            autoplay:true,
            items:1,
            margin:20,
            navText:['<i class="fas fa-angle-double-down"></i>','<i class="fas fa-angle-double-up"></i>'], 
            nav:true, 
            autoplayTimeout:10000,
            responsive:{
                0:{
                    items:1,
                    dots:true, 
                    nav:true,
                    margin:0,
                    
                },
                768:{
                    items:1,
                    dots:true, 
                     nav:false,
                    
                    
                },
                1000:{
                    items:1,
                    dots:true,  
                    
                   
                },
                 1200:{
                    items:1, 
                    dots:true,  
                    
                }
            }
        });
    });  

    
    /** wobble Slider **/ 
    $(document).ready(function (){ 
        $('.client-testimonial-slider-6').owlCarousel({
            loop:true, 	 
            autoplay:false,
            items:1,
            nav:false,
            dots:true,
             responsive:{
                0:{
                    items:1,
                    dots:true, 
                   
                    
                },
                768:{
                    items:1,
                 
                    
                },
                1000:{
                    items:1,
                    
                },
                 1200:{
                    items:1, 
                
                }
            }    
        });
    });  

    
    
     
			
})(jQuery);	
  