/*
 * --------------------------------------------------------------------
 * jQuery-Plugin - converting <a> element to an animated button
 *
 * settings:
 * effect 				string (default: 'fx1'; accepted: 'fx1', 'fx2'... 'fx16'; Defines animation type.)
 * particleWidth 		string, number (default: 15;  accepted: integer values;  Defines particle width used in animation.)
 * particleHeight 		string, number (default: 15; accepted: integer values; Defines particle height used in animation.)
 * labelActiveColor 	string (default: #ffffff; accepted: color values; Defines the text color after hovering over the button.)
 * labelInactiveColor 	string (default: css color; accepted: color values; Defines the text color. If this setting is not present a css color for <a> will be used.)
 * particleColorOne 	string (default: #006699; accepted: color values; Defines first particle layer color. After hovering over the button, this will be the color of the background.)
 * particleColorTwo 	string (default: #0099cc; accepted: color values; Defines second particle layer color.)
 * background-color 	string (default: css background - color; accepted: color values;  Defines the background color. If this setting is not present a css background color for <a> will be used.)
 * border-radius 		string, number (default: 0; accepted: integer values; Defines border radius. IMPORTANT: Not supported by IE7, IE8.)
 * width 				string, number (default: current width;  accepted: integer values;  Defines button width. If this setting is not present the button will set width to fit the <a>.)
 * height 				string, number (default: current height; accepted: integer values; 	Defines button height. If this setting is not present the button will set height to fit the <a>.)
 * selected 			boolean (default: false; accepted: true or false;  Defines the state of the button - if true, the button is pressed (on). Setting this value to true will automatically set the toggle value to true.)
 * toggle 				boolean (default: false; accepted: true or false;  Defines the button's behavior - if true, the button remains pressed (on), after click, the next click unpresses the button.)
 * --------------------------------------------------------------------
 */

(function ($) {

	var pubMet, prvMet, defaultSettings;
	
	defaultSettings = {
		'effect' : 'fx1',
		'particleWidth' : 15,
		'particleHeight' : 15,
		'labelActiveColor' : '#fff',
		'particleColorOne' : '#006699',
		'particleColorTwo' : '#0099cc',
		'timeShiftAnimIn' : .05,
		'timeShiftAnimOut' : .02,
		'selected' : false,
		'toggle' : false
	};

	pubMet = {
		init : function (options) {
			var set = {};
			$.extend(set, defaultSettings, options);
			$(window).unload(function() {});

			return this.each(function () {
				var $t = $(this), data = $t.data('lhpDTCB'), tmpCss, newWidth, newHeight, sourceHeight, tmpHtml, tmpDiv;
		
				if (!data) {
			
					tmpCss = {	'width' : $t.css('width'), 'height' : $t.css('height'), 'display' : $t.css('display'), 'position' : $t.css('position'), 'background-color' : $t.css('background-color'), 'border-radius' : $t.css('border-radius'), 'z-index' : $t.css('z-index')};
					
					set['border-radius'] = set['border-radius'] || $t.css('border-radius');
					set['border-radius'] = parseInt(set['border-radius']);
					
					newWidth = set.width || $t.width();
					
					tmpHtml = $t.html();
					tmpDiv = $('<div />').css('width', newWidth).html($t.html());
					$t.append(tmpDiv);
					sourceHeight = tmpDiv.height();

					newHeight = set.height || sourceHeight;
					
					$t.empty();
					$t.css({	'width' : newWidth, 'height' : newHeight, 'display' : 'block', 'position' : 'relative',	'background-color' : set['background-color'] ,	'border-radius' : set['border-radius']});
					$t.data('lhpDTCB', {'set' : set, 'tmpCss' : tmpCss, 'html' : tmpHtml, 'sourceHeight' : sourceHeight , 'selected' : false, 'lastAnimType' : '' });
					
					prvMet.createLayers($t, set);
					prvMet.addMouseRoll($t);
					
					if (set.selected) {
						set.toggle = true;
						pubMet.select.apply($t);
					}
					
					if (set.toggle) {
						$t.data('lhpDTCB').hitLay.bind({ 'click.lhpTCB' : prvMet.clickHandler });
					}
					
					$t.data('lhpDTCB').hitLay.bind({ 'mouseenter.lhpTCB': prvMet.incZindex, 'mouseleave.lhpTCB': prvMet.decZindex });
				}
			});
		},
		/*
		* Destructor. Removes the button from the page. Restores the original appearance and functionality of the <a> element. Allows to efficiently clean the memory.
		* @return {Object} Returns jQuery object.
		*/
		destroy : function () {
			return this.each(function () {
				var $t = $(this), data = $t.data('lhpDTCB');
				if (data) {
					data.hitLay.unbind({ 'mouseenter.lhpTCB': prvMet.incZindex, 'mouseleave.lhpTCB': prvMet.decZindex });
					prvMet.remMouseClick($t);
					prvMet.remDisabClick($t);
					prvMet.remMouseRoll($t);
					$t.empty();
					$t.html(data.html);
					$t.css(data.tmpCss);
					$t.removeData('lhpDTCB');
				}
			});
		},
		/*
		* Presses the button. This method works only if the toggle setting is set to true.
		* @return {Object} Returns jQuery object.
		*/
		select : function () {
			return this.each(function () {
				var $t = $(this), e;
				if (!$t.data('lhpDTCB').selected && $t.data('lhpDTCB').set.toggle) {
					e = $.Event('mouseenter', {'currentTarget' : $t.children('.lhpTCB_layerHitArea')});
					prvMet.animIn(e);
					prvMet.remMouseRoll($t);
					$t.data('lhpDTCB').selected = true;
				}
			});
		},
		/*
		* Unpresses the button. This method works only if the toggle setting is set to true.
		* @return {Object} Returns jQuery object.
		*/
		unselect : function () {
			return this.each(function () {
				var $t = $(this), e;
				if ($t.data('lhpDTCB').selected && $t.data('lhpDTCB').set.toggle) {
					e = $.Event('mouseleave', {'currentTarget' : $t.children('.lhpTCB_layerHitArea')});
					prvMet.animOut(e);
					prvMet.addMouseRoll($t);
					$t.data('lhpDTCB').selected = false;
				}
			});
		},
		/*
		* Renders the button not to react to mouse events.
		* @return {Object} Returns jQuery object.
		*/
		disabled : function () {
			return this.each(function () {
				var $t = $(this);
				$t.css('cursor', 'default');
				$t.data('lhpDTCB').hitLay.css('cursor', 'default');
				prvMet.remMouseRoll($t);
				prvMet.remMouseClick($t);
				prvMet.addDisabClick($t);
			});
		},
		/*
		* Renders the button to react to mouse events.
		* @return {Object} Returns jQuery object.
		*/
		enabled : function () {
			return this.each(function () {
				var $t = $(this);
				$t.css('cursor', 'pointer');
				$t.data('lhpDTCB').hitLay.css('cursor', 'pointer');
				prvMet.addMouseRoll($t);
				prvMet.remDisabClick($t);
				prvMet.addMouseClick($t);
			});
		},
		/*
		* Checks the button's state.
		* @return {Array} Returns true if the button is pressed.
		*/
		isSelect : function () {
			var res = [];
			this.each(function () {
				res.push($(this).data('lhpDTCB').selected);
			});
			return res;
		}
	};

	prvMet = {
		createLayers : function ($e, set) {
			var effects, effectName, parHorN, parVerN, order, orderItemNum, sortOrderAnimIn, sortOrderAnimOut, sortFunc, $layer0, $layer1, $labelLayerWrapper, $hitLay;
			
			effects = {
				'fx1' : ['C_LR', 'C_TB'],
				'fx2' : ['C_LR', 'TB_C'],
				'fx3' : ['C_LR', 'T_B'],
				'fx4' : ['C_LR', 'B_T'],
				
				'fx5' : ['LR_C', 'C_TB'],
				'fx6' : ['LR_C', 'TB_C'],
				'fx7' : ['LR_C', 'T_B'],
				'fx8' : ['LR_C', 'B_T'],
				
				'fx9' : ['L_R', 'C_TB'],
				'fx10' : ['L_R', 'TB_C'],
				'fx11' : ['L_R', 'T_B'],
				'fx12' : ['L_R', 'B_T'],
				
				'fx13' : ['R_L', 'C_TB'],
				'fx14' : ['R_L', 'TB_C'],
				'fx15' : ['R_L', 'T_B'],
				'fx16' : ['R_L', 'B_T']				
			};
			
			effectName = set.effect || 'fx1';
			
			sortFunc = function (a, b) {
				if (a[0] == b[0] ) {
					return a[1] - b[1];
				} else {
					return a[0] - b[0];
				}
			};
	
			parHorN = Math.ceil($e.width() / set.particleWidth);
			parVerN = Math.ceil($e.height() / set.particleHeight);
			
			/*fade in*/
			order = $().lhpUtilsOrderLinearAlgorithms('build', parHorN, parVerN, effects[effectName][0], effects[effectName][1]);
			orderItemNum = order.v.length + order.h.length;
			sortOrderAnimIn = $().lhpUtilsOrderGenerator('build', order.v, order.h, (set.timeShiftAnimIn * (7/orderItemNum)), 'VER_PRIO');
			sortOrderAnimIn.sort( sortFunc );
			/**/

			/*fade out*/
			order = $().lhpUtilsOrderLinearAlgorithms('build', parHorN, parVerN, 'LR_C', 'TB_C');
			sortOrderAnimOut = $().lhpUtilsOrderGenerator('build', order.v, order.h, (set.timeShiftAnimOut * (7/orderItemNum)), 'VER_PRIO'); 
			sortOrderAnimOut.sort( sortFunc );
			/**/
			
			$layer0 = prvMet.createParticleLayer(1, $e, set.particleColorOne, set.particleWidth, set.particleHeight, set['border-radius'], sortOrderAnimIn, sortOrderAnimOut, parHorN, parVerN);
			$e.data('lhpDTCB').layer0 = $layer0;
			
			$layer1 = prvMet.createParticleLayer(2, $e, set.particleColorTwo, set.particleWidth, set.particleHeight, set['border-radius'], sortOrderAnimIn, false, parHorN, parVerN);
			$e.data('lhpDTCB').layer1 = $layer1;
			
			$labelLayerWrapper = prvMet.createLabelLayer($e, set.labelInactiveColor, set.labelActiveColor);
			$e.data('lhpDTCB').labelLayerWrapper = $labelLayerWrapper;
			
			$hitLay = prvMet.createHitAreaLayer($e);
			$e.data('lhpDTCB').hitLay = $hitLay;
		},
		createParticleLayer : function (zIndex, $e, parColor, parW, parH, borderRadius, sortOrderAnimIn, sortOrderAnimOut, parHorN, parVerN) {
			var $layer, $par, i, k, parStyle, parL, parT, particleNumCorner;
			
			particleNumCorner = {'TL' : 0, 'TR' : (parVerN*parHorN - parVerN), 'BR' :  (parVerN*parHorN - 1), 'BL' : (parVerN-1)};
			
			$layer = $('<div />').css({'width' : $e.width(), 'height' : $e.height(), 'position' : 'absolute', 'top' : 0, 'left' : 0, 'z-index' : zIndex});
			$layer.addClass('lhpTCB_layer'+zIndex);
			parStyle = {'width' : 0, 'height': 0, 'background-color' : parColor, 'position' : 'absolute'};

			for (i=0, k=sortOrderAnimIn.length; i<k; i++) {
				parL = (sortOrderAnimIn[i][0]-1) * parW + parW/2;
				parT = (sortOrderAnimIn[i][1]-1) * parH + parH/2;
				parStyle.left = parL;
				parStyle.top = parT;
				$par = $('<div />').css(parStyle);
				$par.data({'animInTime' : sortOrderAnimIn[i][2], 'left' : parL, 'top' : parT});
				if (sortOrderAnimOut) {
					$par.data({'animOutTime' : sortOrderAnimOut[i][2]});
				}
				
				if(borderRadius) {
					if(i == particleNumCorner.TL) {
						$par.css('border-top-left-radius', borderRadius);
					}
					if(i ==  particleNumCorner.TR) {
						$par.css('border-top-right-radius', borderRadius);
					}
					if(i ==  particleNumCorner.BR) {
						$par.css('border-bottom-right-radius', borderRadius);
					}
					if(i ==  particleNumCorner.BL) {
						$par.css('border-bottom-left-radius', borderRadius);
					}
				}
				
				$layer.append($par);
			}

			$e.prepend($layer);
			return $layer;
		},
		createLabelLayer : function ($e, inactiveColor, activeColor) {
			var $labelWrapper, $labelInactive = $('<div />'), $labelActive = $('<div />'), width = $e.width(), height = $e.height(), sourceHeight = $e.data('lhpDTCB').sourceHeight, labelHtml = $e.data('lhpDTCB').html;
			
			$labelWrapper = $('<div />').css( {overflow : 'hidden', position : 'absolute', top : 0, left : 0, 'width' : width, 'height' : height, zIndex : 3} );
			$labelWrapper.addClass('lhpTCB_layerLabelWrapper');
			
			$('<div />').appendTo($labelWrapper)
						.css( {position : 'absolute', top : 0, left : 0, 'width' : width, 'height' : 2*height} )
						.append( $labelInactive.css( {	color:inactiveColor, 	position : 'absolute', left : 0, top : (height - sourceHeight)/2, 			'width' : width, 'text-align' : 'center'}).html(labelHtml) )
						.append( $labelActive.css( {	color:activeColor, 		position : 'absolute', left : 0, top : height + (height - sourceHeight)/2, 	'width' : width, 'text-align' : 'center'}).html(labelHtml) );
			
			$e.prepend( $labelWrapper );
			return $labelWrapper;
		},
		createHitAreaLayer : function ($e) {
			var $hitArea = $('<div />').css( {background : '#000', opacity : 0, cursor : 'pointer', position : 'absolute', top : 0, left : 0, 'width' : $e.width(), 'height' : $e.height(), zIndex : 4} );
			$hitArea.addClass('lhpTCB_layerHitArea');
			$e.prepend( $hitArea );
			
			return $hitArea;
		},
		addMouseRoll : function ($e) {
			prvMet.remMouseRoll($e);
			$e.data('lhpDTCB').hitLay.bind({ 'mouseenter.lhpTCB': prvMet.animIn, 'mouseleave.lhpTCB': prvMet.animOut });
		},
		remMouseRoll : function ($e) {
			$e.data('lhpDTCB').hitLay.unbind({ 'mouseenter.lhpTCB': prvMet.animIn, 'mouseleave.lhpTCB': prvMet.animOut });
		},
		remMouseClick : function ($e) {
			$e.data('lhpDTCB').hitLay.unbind({ 'click.lhpTCB' : prvMet.clickHandler });
		},
		addMouseClick : function ($e) {
			if ($e.data('lhpDTCB').set.toggle) {
				prvMet.remMouseClick($e);
				$e.data('lhpDTCB').hitLay.bind({ 'click.lhpTCB' : prvMet.clickHandler });
			}
		},
		remDisabClick : function ($e) {
			$e.data('lhpDTCB').hitLay.unbind({ 'click.lhpTCB' : prvMet.clickDisabledHandler });
		},
		addDisabClick : function ($e) {
			prvMet.remDisabClick($e);
			$e.data('lhpDTCB').hitLay.unbind({ 'click.lhpTCB' : prvMet.clickDisabledHandler }).bind({ 'click.lhpTCB' : prvMet.clickDisabledHandler });
		},
		incZindex : function (event) {
			var $e = $(event.currentTarget).parent();
			$e.css({'z-index' : 9999});
		},
		decZindex : function (event) {
			var $e = $(event.currentTarget).parent();
			$e.css({'z-index' : $e.data('lhpDTCB').tmpCss['z-index']});
		},
		animIn : function (event) {
			var $e = $(event.currentTarget).parent(), $par, set = $e.data('lhpDTCB').set, startTop, interTop, parW = set.particleWidth, parH = set.particleHeight, timeOut, layer0TimeComplete = 0;
			if ($e.data('lhpDTCB').lastAnimType !== 'in') {
				
				/*layer 0*/
				$e.data('lhpDTCB').layer0.children().each(function () {
					$par = $(this);
					timeOut = $par.data('timeOut');
					
					if (timeOut)
					{
						clearTimeout(timeOut);
					}
					
					$par.clearQueue().stop().css({
							width : parW * 0.3,
							height : parH * 0.3,
							marginLeft : -parW/2 * 0.3,
							marginTop : -parH/2 * 0.3,
							opacity : 0.3
					});
					
					timeOut = setTimeout( (function ($par, parW, parH) {
						return function () {
							$par.animate({
								width : parW * 1.2,
								height : parH * 1.2,
								marginLeft : -parW/2 * 1.2,
								marginTop : -parH/2 * 1.2
							}, { duration : 300 } )
							.animate({
								width : parW,
								height : parH,
								marginLeft : -parW/2,
								marginTop : -parH/2,
								opacity : 1
							}, { duration : 600 } );
						}
					})($par, parW, parH), $par.data('animInTime')*1000 );
					
					$par.data({'timeOut' : timeOut});
					
					layer0TimeComplete = Math.max(layer0TimeComplete, 300 + $par.data('animInTime')*1000);
				});
				
				$e.data('lhpDTCB').hideBgColorTimeout = setTimeout( (function ($e) {
					return function () {
						$e.css('background', 'none');
					}
				})($e), 600 + layer0TimeComplete );
				

				/*layer 1*/
				$e.data('lhpDTCB').layer1.show().children().each(function () {
					$par = $(this);
					startTop = $par.data('top') + (Math.random()*80-40);
					interTop = startTop + (Math.random()*80-40);
					timeOut = $par.data('timeOut');
					
					if (timeOut)
					{
						clearTimeout(timeOut);
					}
					
					$par.clearQueue().stop().css({
							width : 0,
							height : 0,
							marginLeft : 0,
							marginTop : 0,
							opacity : 1,
							top : startTop 
					});
						
					timeOut = setTimeout( (function ($par, interTop, parW, parH) {
						return function () {
							$par.animate({
								width : parW,
								height : parH,
								marginLeft : -parW/2,
								marginTop : -parH/2,
								top : interTop
							}, { duration : 300, easing : 'easeOutQuad' } )
							.animate({
								top : $par.data('top')
							}, { duration : 300, easing : 'easeInQuad' } )
							.animate({
								opacity : 0
							}, { duration : 600 } );
						}
					})($par, interTop, parW, parH), layer0TimeComplete + $par.data('animInTime')*1000 );
					
					$par.data({'timeOut' : timeOut});
				});
				
				/*label layer*/
				$e.data('lhpDTCB').labelLayerWrapper.children()
				.clearQueue().stop().css({ top : 0 })
				.animate({ top : -$e.height() }, { duration : 800, easing: 'easeInOutBack' } );
				
				$e.data('lhpDTCB').lastAnimType = 'in';
			}
		},
		animOut : function (event) {
			var $e = $(event.currentTarget).parent(), $par, set = $e.data('lhpDTCB').set, parW = set.particleWidth, parH = set.particleHeight, timeOut;
			
			if ($e.data('lhpDTCB').lastAnimType !== 'out') {
				
				clearTimeout($e.data('lhpDTCB').hideBgColorTimeout);
				$e.css('background', set['background-color']);
				
				/*layer 0*/
				$e.data('lhpDTCB').layer0.children().each(function () {
					$par = $(this);
					timeOut = $par.data('timeOut');
					
					if (timeOut)
					{
						clearTimeout(timeOut);
					}
					
					$par.clearQueue().stop().css({
						width : parW,
						height : parH,
						marginLeft : -parW/2,
						marginTop : -parH/2,
						opacity : 1
					});
					
					timeOut = setTimeout( (function ($par) {
						return function () {
							$par.animate({
								width : 0,
								height : 0,
								marginLeft : 0,
								marginTop : 0,
								opacity : 0
							}, { duration : 500 } );
						}
					})($par), $par.data('animOutTime')*1000 );
					
					$par.data({'timeOut' : timeOut});
				});
				
				/*layer 1*/
				$e.data('lhpDTCB').layer1.hide().children().each(function () {
					$par = $(this);
					timeOut = $par.data('timeOut');
					
					if (timeOut)
					{
						clearTimeout(timeOut);
					}
					
					$par.clearQueue().stop();
				});
				
				/*label layer*/
				$e.data('lhpDTCB').labelLayerWrapper.children()
				.clearQueue().stop().css({ top : -$e.height() })
				.animate({ top : 0 }, { duration : 500, easing : 'easeOutBack' } );
				
				$e.data('lhpDTCB').lastAnimType = 'out';
			}
		},
		clickHandler : function (event) {
			var $e = $(event.currentTarget).parent();

			event.preventDefault();	
			if($e.data('lhpDTCB').selected) {
				pubMet.unselect.apply($e);
			} else {
				pubMet.select.apply($e);
			}
		},
		clickDisabledHandler : function (event) {
			event.preventDefault(); 
			event.stopPropagation();
		}
	};
	
	$.fn.lhpTwoColorButton = function (method) {
    
		if (pubMet[method]) {
			return pubMet[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return pubMet.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.lhpTwoColorButton');
		}
	};

})(jQuery);

/*
 * --------------------------------------------------------------------
 * jQuery-Utils - order generator 
 * --------------------------------------------------------------------
 */
(function ($) {

	var pubMet, prvMet, privateVars = {};

	pubMet = {
		/*
		* Build order.
		* @tileVerticalOrder {Array} tile vertical order
		* @tileHorizontalOrder {Array} tile horizontal order
		* @shftTime {Number} shift time
		* @priority {String} priority type 'HOR_PRIO' or 'VER_PRIO'
		* @return {Array} Returns Array with order.
		*/
		build : function (tileVerticalOrder, tileHorizontalOrder, shftTime, priority) {

			privateVars.tileVerticalOrder = tileVerticalOrder || [];
			privateVars.tileHorizontalOrder = tileHorizontalOrder || [];
			privateVars.shftTime = shftTime || 1;
			privateVars.priority = priority || 'HOR_PRIO';
			
			return prvMet.setTileOrderStep2( prvMet.setTileOrderStep1() );
		}
	};
	
	prvMet = {
		setTileOrderStep1 : function () {
			var res = [], shftTime, i, ii;
			
			shftTime = (privateVars.priority === 'HOR_PRIO') ? privateVars.shftTime : privateVars.shftTime * privateVars.tileVerticalOrder.length;
			
			for (i=0; i<privateVars.tileHorizontalOrder.length; i++) {
				if ($.isArray(privateVars.tileHorizontalOrder[i])) {
					for (ii = 0; ii<privateVars.tileHorizontalOrder[i].length; ii++)
						//res.push(['_'+privateVars.tileHorizontalOrder[i][ii], shftTime*i, privateVars.tileHorizontalOrder[i][ii]]);
						res.push([privateVars.tileHorizontalOrder[i][ii], shftTime*i]);
				} else {
					//res.push(['_'+privateVars.tileHorizontalOrder[i], shftTime*i, privateVars.tileHorizontalOrder[i]]);
					res.push([privateVars.tileHorizontalOrder[i], shftTime*i]);
				}	
			}

			return res;
		},
		setTileOrderStep2 : function (tileOrder) {
			var res = [], shftTime, k, i, ii;
			
			shftTime = (privateVars.priority === 'HOR_PRIO') ? privateVars.shftTime * privateVars.tileHorizontalOrder.length : privateVars.shftTime;
			
			for (k=0; k<tileOrder.length; k++) {
				for (i=0; i<privateVars.tileVerticalOrder.length; i++) {
					
					if ($.isArray(privateVars.tileVerticalOrder[i])) {
						for (ii = 0; ii<privateVars.tileVerticalOrder[i].length; ii++)
							//res.push([tileOrder[k][0] + '_' + privateVars.tileVerticalOrder[i][ii], tileOrder[k][1]+shftTime*i, tileOrder[k][2], privateVars.tileVerticalOrder[i][ii]])
							res.push([tileOrder[k][0], privateVars.tileVerticalOrder[i][ii], tileOrder[k][1]+shftTime*i])
					
					} else {
						//res.push([tileOrder[k][0] + '_' + privateVars.tileVerticalOrder[i], tileOrder[k][1]+privateVars.shftTime*i, tileOrder[k][2], privateVars.tileVerticalOrder[i]])
						res.push([tileOrder[k][0], privateVars.tileVerticalOrder[i], tileOrder[k][1]+privateVars.shftTime*i])
					}
				}
			}
			
			return res;
		}
	};

	$.fn.lhpUtilsOrderGenerator = function (method) {
    
		if (pubMet[method]) {
			return pubMet[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.lhpUtilsOrderGenerator');
		}
	};

})(jQuery);

/*
 * --------------------------------------------------------------------
 * jQuery-Utils - create different orders 
 * --------------------------------------------------------------------
 */
(function ($) {

	var pubMet, prvMet;

	pubMet = {
		/*
		* Build different orders.
		* @hItems {Number} number of horizontal item
		* @vItems {Number} number of vertical item
		* @horizontalAlgorithm {String} horizontal order algorithm 'L_R', 'R_L', 'C_LR', 'LR_C', example 'C_LR' - first center next left and right edge
		* @verticalAlgorithm {String} horizontal order algorithm 'T_B', 'B_T', 'C_TB', 'TB_C', example 'T_B' - first top
		* @return {Array} Returns Array with order.
		*/
		build : function (hItems, vItems, horizontalAlgorithm, verticalAlgorithm) {
			var horizontalOrder = [], verticalOrder = []; //[3,[2,4],[1,5]]; [2,[1,3]];
			
			switch (horizontalAlgorithm) { 
				case 'L_R': 
					horizontalOrder = prvMet.leftRight_or_topBottom(hItems); 
					break;
				case 'R_L': 
					horizontalOrder = prvMet.rightLeft_or_bottomTop(hItems); 
					break;
				case 'C_LR': 
					horizontalOrder = prvMet.centerToEdge(hItems); 
					break;
				case 'LR_C': 
					horizontalOrder = prvMet.edgeToCenter(hItems); 
					break;
				default: 
					horizontalOrder = prvMet.leftRight_or_topBottom(hItems);  
					break; 
			}
			
			switch (verticalAlgorithm) { 
				case 'T_B': 
					verticalOrder = prvMet.leftRight_or_topBottom(vItems); 
					break;
				case 'B_T': 
					verticalOrder = prvMet.rightLeft_or_bottomTop(vItems); 
					break;
				case 'C_TB': 
					verticalOrder = prvMet.centerToEdge(vItems); 
					break;
				case 'TB_C': 
					verticalOrder = prvMet.edgeToCenter(vItems); 
					break;
				default: 
					verticalOrder = prvMet.leftRight_or_topBottom(vItems);  
					break; 
			}
			
			return {'h':horizontalOrder, 'v':verticalOrder};
		}
	};
	
	prvMet = {
		leftRight_or_topBottom : function (items) {
			var res = [], i;
			
			for (i = 1; i<=items; i++) {
				res.push(i);
			}
				
			return res;
		},
		rightLeft_or_bottomTop : function (items) {
			var res = [], i;
			
			for (i = items; i>0; i--) {
				res.push(i);
			}
				
			return res;
		},
		centerToEdge : function (items) {
			var res = [], i;
			
			if (items%2) {
				res.push(Math.ceil(items/2));
			}
			
			for (i = Math.floor(items/2); i>0; i--) {
				res.push([i, items - i + 1]);
			}
				
			return res;
		},
		edgeToCenter : function (items) {
			var res = [], halfItem, i;
			
			if (items%2) {
				halfItem = Math.ceil(items/2);
			}
				
			for (i = 1; i <= items; i++) {
				if (halfItem && i === halfItem) {
					res.push(halfItem);
					break;
				} else if (i > items/2) {
					break;
				}
				 
				res.push([i, items - i + 1]);
			}
				
			return res;
		}
	};

	$.fn.lhpUtilsOrderLinearAlgorithms = function (method) {
    
		if (pubMet[method]) {
			return pubMet[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.lhpUtilsOrderLinearAlgorithms');
		}
	};

})(jQuery);