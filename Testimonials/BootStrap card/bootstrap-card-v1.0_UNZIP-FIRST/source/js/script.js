
$(document).ready(function($) {

	$('.sch-blog-card-share > a').on('click', function(e){ 
		e.preventDefault() // prevent default action - hash doesn't appear in url
   		$(this).parent().find( 'div' ).toggleClass( 'sch-blog-card-social-active' );
		$(this).toggleClass('share-expanded');
    });
  
});
$(document).ready(function(){

	
	/* schpt Slider Function */
	$('.icon').click (function(event){
		event.preventDefault();
		if( $ (this).hasClass('inOut')  ){
			$('.pp-setting').stop().animate({right:'-214px'},500 );
		} else{
			$('.pp-setting').stop().animate({right:'0px'},500 );
		} 
		$(this).toggleClass('inOut');
		return false;

	});
});
$(document).ready(function(){

	/* Class Color Click Event Function */

	$(".color1" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-cyan.css");
		return false;
	});

	$(".color2" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-black.css");
		return false;
	});

	$(".color3" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-blue.css");
		return false;
	});

	$(".color4" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-brown.css");
		return false;
	});

	$(".color5" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-green.css");
		return false;
	});
		
	$(".color6" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-gray.css");
		return false;
	});

	$(".color7" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-orange.css");
		return false;
	});

	$(".color8" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-pink.css");
		return false;
	});
	$(".color9" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-purple.css");
		return false;
	});

	$(".color10" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-red.css");
		return false;
	});
	$(".color11" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-white.css");
		return false;
	});

	$(".color12" ).click(function(){
		$("#sch-bg-color" ).attr("href", "css/colors/color-yellow.css");
		return false;
	});
});


