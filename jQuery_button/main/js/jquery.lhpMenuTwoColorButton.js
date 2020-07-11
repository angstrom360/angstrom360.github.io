/*
 * ----------------------------------------------------------------------------
 * jQuery-Plugin - converting <a> elements to animated buttons and builds menu
 *
 * settings:
 * oneButtonAlwaysActive 	boolean (default: false; accepted: true or false; Defines the menu behavior. By default, clicking a menu element will change it's state (on / off). If this parameter is set to true, the pressed button will be unpressed only when a different button (from the same menu) will be pressed.)
 * buttonSelected 			jQuery selector, number or string (Presses the selected button. You can use a jQuery selector or the button's index ('0', '1',…).)
 * + settings lhpTwoColorButton
 * ----------------------------------------------------------------------------
 */
 
(function ($) {
	
	var pubMet, prvMet, defaultSettings;
	
	defaultSettings = {
		'selected' : false,
		'toggle' : true
	};

	pubMet = {
		init : function (options) {
			var set = {}, buttons = [];
			$.extend(set, options, defaultSettings);
			this.each(function (i) {
				var $this = $(this);
				$this.lhpTwoColorButton(set);
				buttons.push($this);
				if(set.oneButtonAlwaysActive) {
					$this.bind({ 'click.lhpMTCB' : prvMet.clickHandlerWithDisable });
				} else {
					$this.bind({ 'click.lhpMTCB' : prvMet.clickHandler });
				}
				if(set.buttonSelected && (set.buttonSelected[0] == $this[0] || set.buttonSelected == i)) {
					$this.lhpTwoColorButton('select');
					if(set.oneButtonAlwaysActive) {
						$this.lhpTwoColorButton('disabled');
					}
				}
			});
			return this.each(function () {
				var $this = $(this), siblings = [], i, k;
				for(i=0, k=buttons.length; i<k; i++) {
					if($this[0] != buttons[i][0]) {
						siblings.push(buttons[i]);
					}
				}
				$this.data('lhpDMWTCB', {'siblings' : siblings});
			});
		},
		/*
		* Destructor. Removes the menu from the page. Restores the original appearance and functionality of the <a> elements. Allows to efficiently clean the memory.
		* @return {Object} Returns jQuery object.
		*/
		destroy : function () {
			return this.each(function () {
				var $this = $(this);
				$this.removeData('lhpDMWTCB');
				$this.unbind({ 'click.lhpMTCB' : prvMet.clickHandlerWithDisable });
				$this.unbind({ 'click.lhpMTCB' : prvMet.clickHandler });
				$this.lhpTwoColorButton('destroy');
			});
		}
	};
	
	prvMet = {
		clickHandlerWithDisable : function (event) {
			var $this = $(this), siblings = $this.data('lhpDMWTCB').siblings, i, k;
			$this.lhpTwoColorButton('disabled');
			for(i=0, k=siblings.length; i<k; i++) {
				siblings[i].lhpTwoColorButton('unselect').lhpTwoColorButton('enabled');
			}
		},
		clickHandler : function (event) {
			var $this = $(this), siblings = $this.data('lhpDMWTCB').siblings, i, k;
			for(i=0, k=siblings.length; i<k; i++) {
				siblings[i].lhpTwoColorButton('unselect');
			}
		}
	};
	
	$.fn.lhpMenuTwoColorButton = function (method) {
		if (pubMet[method]) {
			return pubMet[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return pubMet.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.lhpMenuTwoColorButton');
		}
	};

})(jQuery);