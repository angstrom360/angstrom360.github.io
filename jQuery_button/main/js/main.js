//$(window).unload(function() {
  //console.log('Handler for .unload() called.');
//});

$(document).ready(function(){
	var sampleMenuStt, topBttStt, customizeMeStt, sampleMenuWithBttStt, sampleMenuWithBttSttOneActive, sampleFormStt, dropDownStt;
	
	//init main menu
	sampleMenuStt = {
		'effect' : 'fx3',
		'particleWidth' : '15',
		'particleHeight' : '15',
		'labelActiveColor' : '#303030',
		'labelInactiveColor' : '#f0f0f0',
		'particleColorOne' : '#ffc600',
		'particleColorTwo' : '#00c6ff',
		'background-color' : '#303030',
		'width' : '180',
		'height' : '30'
	};
	$('ul#menu a').lhpTwoColorButton(sampleMenuStt);
	$('ul#menu a').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 900);
		event.preventDefault();
	});
	
	//init top buttons
	topBttStt = {
		'effect' : 'fx3',
		'particleWidth' : '15',
		'particleHeight' : '15',
		'labelActiveColor' : '#303030',
		'labelInactiveColor' : '#f0f0f0',
		'particleColorOne' : '#fff',
		'particleColorTwo' : '#aaa',
		'background-color' : '#303030',
		'width' : '75',
		'height' : '15'
	};
	$('a.topBtt').lhpTwoColorButton(topBttStt);
	$('a.topBtt').bind('click', function(event) {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 500);
		event.preventDefault();
	});
	
	//ini show source line
	$('a.sourceCode').each(function(){
		var $this = $(this);
		$this.click(function(event) {
			var $t = $(this);
			if($t.text() == 'show source code') {
				$t.text('hide source code');
			} else {
				$t.text('show source code');
			}
			$this.siblings('pre').fadeToggle("fast");
			return false;
		});
	});
	
	//init customize me
	customizeMeStt = {
		'effect' : 'fx14',
		'particleWidth' : '50',
		'particleHeight' : '50',
		'labelActiveColor' : '#f0f0f0',
		'labelInactiveColor' : '#303030',
		'particleColorOne' : '#303030',
		'particleColorTwo' : '#ffc600',
		'background-color' : '#00c6ff',
		'border-radius' : '44',
		'width' : '200',
		'height' : '100',
		'selected' : false,
		'toggle' : true
	};
	
	$('#firstSample .customizeMeForm .tip').each(function(){
		var $this = $(this);
		$this.hover(
			function (event) {
				var e;
				$('#firstSample .customizeMeForm .tipContainer').html($(this).attr('data-txt'))
				.css({display : 'block', opacity : 0})
				.stop().animate({ opacity : 1 }, { duration : 500 });
				e = $.Event('mousemove');
				e.pageX = event.pageX;
				e.pageY = event.pageY;
				$this.trigger(e);
			}, 
			function () {
				$('#firstSample .customizeMeForm .tipContainer')
				.stop().animate({ opacity : 0 }, { duration : 100, complete : function() {
						$(this).css({display : 'none'});
					}
				});
			}
		);
		$this.mousemove(function(event) {
			var $e = $('#firstSample .customizeMeForm .tipContainer'), eHeight = $e.height();
			$e.css({top : event.pageY-eHeight-10, left : event.pageX - 25})
		});
	});
	
	$('#firstSample .customizeMeForm input, #firstSample .customizeMeForm select').each(function(index){ 
		var $this = $(this), sttName = this.name.split('_')[2], toggleType;
		
		if($this.hasClass('label')) {
			this.value = $('#firstSample a.customizeMe').text();
		}
		else if($this.hasClass('labelStyle')) {
			this.value = '{"font-family":"' + $('#firstSample a.customizeMe').css('font-family') + '", ' + '"font-size":"' + $('#firstSample a.customizeMe').css('font-size') + '"}';
		}
		else if($this.hasClass('borderRadius')) {
			this.value = customizeMeStt[sttName];
		}
		else if($this.hasClass('toggle')) {
			if(customizeMeStt.selected) {
				toggleType = 'toggle/selected';
			} else if(customizeMeStt.toggle && !customizeMeStt.selected) {
				toggleType = 'toggle/unselected';
			} else {
				toggleType = 'none';
			}
			$this.find('option:contains("'+toggleType+'")').attr('selected', 'selected');
			$this.change(function () {
				$this.blur();
			});
		}
		else if($this.hasClass('select_option')) {
			$this.find('option:contains("'+customizeMeStt[sttName]+'")').attr('selected', 'selected');
			$this.change(function () {
				$this.blur();
			});
		}
		else if($this.hasClass('color')) {
			this.value = customizeMeStt[sttName];
		}
		
		$(this).blur(function () {
			var $this = $(this), sttName = this.name.split('_')[2], value = this.value, newSett = {}, toggleType, yourCode, quota, k;
			
			$('#firstSample a.customizeMe').lhpTwoColorButton('destroy');
			
			if($this.hasClass('label')) {
					$('#firstSample a.customizeMe').text(value);
			}
			else if($this.hasClass('labelStyle')) {
				try {
					$('#firstSample a.customizeMe').css($.parseJSON(value));
				} catch (err) {
					//console.log(err);
				}
			}
			else if($this.hasClass('borderRadius')) {
				newSett[sttName] = value;
			}
			else if($this.hasClass('toggle')) {
				toggleType = $this.find('option.[selected="selected"]').text();
				if(toggleType == 'toggle/selected') {
					newSett.toggle = newSett.selected = true;
				} else if(toggleType == 'toggle/unselected') {
					newSett.toggle =  true;
					newSett.selected = false;
				} else {
					newSett.toggle = newSett.selected = false;
				}
			}
			else if($this.hasClass('select_option')) {
				newSett[sttName] = $this.find('option.[selected="selected"]').text();
			}
			else if($this.hasClass('color')) {
				newSett[sttName] = '#' + value;
			}
			
			$.extend(customizeMeStt, newSett);
			$('#firstSample a.customizeMe').lhpTwoColorButton(customizeMeStt);
			
			//user code
			yourCode = 'var settings = {<br/>';
			for(k in customizeMeStt){
				quota = '';
				if(typeof customizeMeStt[k] == 'string') {
					quota = '"';
				}
				yourCode += '\t"' + k + '" : ' + quota + customizeMeStt[k] + quota + ',<br/>';
			}
			yourCode = yourCode.slice(0,-6) + '<br/>};<br/>$("a").lhpTwoColorButton(settings);'
			$('#firstSample pre').html(yourCode);
		});
		
		$(this).keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
			}
		});

	});
	$('#cm_btt_label').trigger('blur');
	
	//init menu with two color buttons
	sampleMenuWithBttStt = {
		'effect' : 'fx1',
		'particleWidth' : '35',
		'particleHeight' : '35',
		'labelActiveColor' : '#303030',
		'labelInactiveColor' : '#f0f0f0',
		'particleColorOne' : '#ffc600',
		'particleColorTwo' : '#00c6ff',
		'background-color' : '#303030',
		'border-radius' : '0',
		'width' : '210',
		'height' : '105',
		'oneButtonAlwaysActive' : false,
		'buttonSelected' : 'none'
	};
	$('#secondSample ul a').lhpMenuTwoColorButton(sampleMenuWithBttStt);
	$('#secondSample ul a').click(function() {
		var $this = $(this);
		$this.parent().parent().siblings('span').text($this.attr('title').toUpperCase() + ' CLICKED').
		stop().clearQueue().css({visibility : 'visible', opacity : 0}).animate({opacity : 1}, {duration : 300}).animate({opacity : 0}, {duration : 1200});
	});
	
	//init menu with two color buttons (one button always active)
	sampleMenuWithBttSttOneActive = {
		'effect' : 'fx1',
		'particleWidth' : '35',
		'particleHeight' : '35',
		'labelActiveColor' : '#303030',
		'labelInactiveColor' : '#f0f0f0',
		'particleColorOne' : '#ffc600',
		'particleColorTwo' : '#00c6ff',
		'background-color' : '#303030',
		'border-radius' : '0',
		'width' : '210',
		'height' : '105',
		'oneButtonAlwaysActive' : true,
		'buttonSelected' : $('#thridSample ul a[title="CodeCanyon"]') //jQuery selector or button index (example '0')
	};
	$('#thridSample ul a').lhpMenuTwoColorButton(sampleMenuWithBttSttOneActive);
	$('#thridSample ul a').click(function() {
		var $this = $(this);
		$this.parent().parent().siblings('span').text($this.attr('title').toUpperCase() + ' CLICKED').
		stop().clearQueue().css({visibility : 'visible', opacity : 0}).animate({opacity : 1}, {duration : 300}).animate({opacity : 0}, {duration : 1200});
	});

	//init form with two color button
	sampleFormStt = {
		'effect' : 'fx4',
		'particleWidth' : '20',
		'particleHeight' : '20',
		'labelActiveColor' : '#111111',
		'labelInactiveColor' : '#666666',
		'particleColorOne' : '#666666',
		'particleColorTwo' : '#d8d8d8',
		'background-color' : '#f4f4f4',
		'border-radius' : '10',
		'width' : '160',
		'height' : '40',
		'selected' : false,
		'toggle' : false
	};
	$('#fourthSample input[type="submit"]').each(function () {
		var $this = $(this);
		$this.css('display', 'none');
		$('<a href="#"></a>').text($this.attr('value')).insertBefore($this).lhpTwoColorButton(sampleFormStt)
		.click(function(event) {
			event.preventDefault();
			$this.click();
		});
	});
	
	//init drop down menu
	dropDownStt = {
		'effect' : 'fx3',
		'particleWidth' : '15',
		'particleHeight' : '15',
		'labelActiveColor' : '#f0f0f0',
		'labelInactiveColor' : '#303030',
		'particleColorOne' : '#303030',
		'particleColorTwo' : '#ffc600',
		'background-color' : '#00c6ff',
		'width' : '180',
		'height' : '30'
	};
	
	$('ul#navigation').css('display', 'block');
	
	$('#navigation a').lhpTwoColorButton(dropDownStt);
	
	$('ul#navigation li').hover(function() {
		$(this).children('.subnav').stop(true, true).slideDown('slow');
	}, function() {
		$(this).children('.subnav').stop(true, true).slideUp('fast');
	});
	
	$('ul#navigation li ul.subnav').css('display', 'none');
});