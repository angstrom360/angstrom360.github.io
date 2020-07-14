'use strict';
/*Comment jquery based on you are using theme*/
/*Theme 9 - Flip horizontal and vertical*/
jQuery(".jag-flip-horizontal .jag-flip-faq").flip({axis: 'x',trigger: 'hover'});
jQuery(".jag-flip-vertical .jag-flip-faq").flip({axis: 'y',trigger: 'hover'});

/*Match height jQuery to make eqaul height block Theme-7,8,9*/
jQuery(".jag-equalheight").matchHeight();

/*function to toggle icon of collapse THeme 2 to 6*/
function toggleIcon(e) {
    jQuery(e.target).prev().find(".jag-faq-icon-2").toggleClass('fa-plus fa-minus');
	jQuery(e.target).prev().find(".jag-faq-icon-3").toggleClass('fa-coffee fa-minus');
}
jQuery('.panel-group').on('hidden.bs.collapse', toggleIcon);
jQuery('.panel-group').on('shown.bs.collapse', toggleIcon);
    