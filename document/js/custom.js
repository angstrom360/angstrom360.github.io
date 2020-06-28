/**
	Navik - HTML header navigation menu
 	Copyright (c) 2020, Pophonic
	
	Author: Pophonic
	Profile: codecanyon.net/user/pophonic
	
**/


jQuery(document).ready(function() {
	
	"use strict";
	
	/* =============================================
	Page loading
	================================================ */
	$('.pageload').fadeOut(300);

	/* =============================================
	Custom Data Attribute
	================================================ */
	var bgImage = ".bgImage";
	
	$("*").css('height', function () {
		var heightAttr = $(this).attr('data-height')+'px';
		return heightAttr;
	});
	
	$("*").css('min-height', function () {
		var minheightAttr = $(this).attr('data-min-height')+'px';
		return minheightAttr;
	});
	
	$("*").css('color', function () {
		var colorAttr = $(this).data('color');
		return colorAttr;
	});
	
	$("*").css('background-color', function () {
		var bgcolorAttr = $(this).data('bg-color');
		return bgcolorAttr;
	});
	
	$("*").css('padding', function () {
		var paddingAttr = $(this).data('padding');
		return paddingAttr;
	});
	
	$("*").css('margin', function () {
		var marginAttr = $(this).data('margin');
		return marginAttr;
	});
	
	$("*").css('opacity', function () {
		var opacityAttr = $(this).data('opacity');
		return opacityAttr;
	});
	
	$(bgImage).css('background-image', function () {
		var bg = ('url(' + $(this).data("image-src") + ')');
		return bg;
	});

	/* =============================================
	Main menu settings
	================================================ */
	$('.burger-menu').on("click", function(){
		$('#sidebar-nav').toggleClass("menu-open");
	});

	/* =============================================
	Smooth scroll to content section
	================================================ */
	// Cache selectors
	var lastId,
		topMenu = $(".main-menu"),
		topMenuHeight = topMenu.outerHeight()-465,
		menuItems = topMenu.find("a"),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});
	
	// Bind click handler to menu items
	menuItems.click(function(e){
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 500);
		e.preventDefault();
	});
	
	// Bind to scroll
	$(window).scroll(function(){
		var fromTop = $(this).scrollTop()+topMenuHeight;
	   
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
				return this;
			});

		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
	   
		if (lastId !== id) {
			lastId = id;
			menuItems
				.parent().removeClass("active")
				.end().filter("[href=#"+id+"]").parent().addClass("active");
		}                   
	});

});