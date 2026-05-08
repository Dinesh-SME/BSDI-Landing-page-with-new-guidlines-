// JavaScript Document
jQuery(document).ready(function($) {
    //'use strict';

	//===== Toggler Script - applicable on link or non-form elements that changes inner text when toggled
	//if ($('.toggler').length) {
		//$('.toggler').click(function(e) {
		$(document).on('click', '.govbh-toggler', function() {
			//e.preventDefault();
			
			var data_target_on = $(this).attr('data-target-on'),
				data_target_off = $(this).attr('data-target-off'),
				data_toggled_text = $(this).data('toggled-text'),
				data_target_disable = $(this).data('target-disable'),
				data_target_enable = $(this).data('target-enable'),
				data_change_text = $(this).data('change-text'),
				data_toggle_on_only = $(this).attr('data-toggled-on-only') == 'yes' ? true : false,
				old_text = $(this).html(),
				data_toggled = $(this).attr('data-toggled'),
				data_toggled_aria_expanded_text = $(this).data('aria-expanded-text'), 
				old_aria_label_text = $(this).attr('aria-label');
				
			if (data_toggle_on_only) {
				toggleElement('down', data_target_on);
				toggleElement('up', data_target_off);
				change_data_text(data_change_text);
			} else {
				if (data_toggled_text) {
					$(this).html(data_toggled_text);
					$(this).data('toggled-text', old_text);
				}
				

				if (data_toggled == '0' || data_toggled == undefined) {
					toggleElement('down', data_target_on);
					toggleElement('enable', data_target_enable);
					toggleElement('up', data_target_off);
					$(this).attr('data-toggled',1);
					if (data_toggled_aria_expanded_text) {
						$(this).attr('aria-label', data_toggled_aria_expanded_text);
						$(this).data('old-aria-label', old_aria_label_text);
							
					}
					$(this).attr('aria-expanded',true);
				} else {
					toggleElement('up', data_target_on);
					toggleElement('disable', data_target_disable);
					toggleElement('down', data_target_off);
					$(this).attr('data-toggled',0);
					if (data_toggled_aria_expanded_text) {
						$(this).attr('aria-label', $(this).data('old-aria-label'));
						
					}
					$(this).attr('aria-expanded',false);
				}
			}
			
		})
	//}
	//===== Toggler Script for check elements radio/check
	if ($('.govbh-check-toggler').length) {
		$('.govbh-check-toggler').on('click',function() {
			
			var data_target_on = $(this).data('target-on'),
				data_target_off = $(this).data('target-off'),
				data_target_disable = $(this).data('target-disable'),
				data_target_enable = $(this).data('target-enable'),
				data_target_check = $(this).data('target-check'),
				data_target_readonly = $(this).data('target-readonly'),
				data_change_text = $(this).data('change-text'),
				data_function_inverse = $(this).data('function-inverse') == 1 ? true : false,
				is_checked = $(this).is(':checked');
			
			change_data_text(data_change_text);
			
			if (!data_function_inverse) {
				
				if (is_checked) {
					toggleElement('down', data_target_on);
					toggleElement('up', data_target_off);
					toggleElement('disable', data_target_disable);
					toggleElement('check', data_target_check);
					toggleElement('readonly-on', data_target_readonly);
					$(this).data('toggled',1);
				} else {
					toggleElement('up', data_target_on);
					toggleElement('down', data_target_off);
					toggleElement('enable', data_target_enable);
					toggleElement('uncheck', data_target_check);
					toggleElement('readonly-off', data_target_readonly);
					$(this).data('toggled',0);
				}
			} else {
				if (is_checked) {
					toggleElement('up', data_target_on);
					toggleElement('down', data_target_off);
					toggleElement('enable', data_target_enable);
					toggleElement('check', data_target_check);
					toggleElement('readonly-on', data_target_readonly);
					$(this).data('toggled',0);
				} else {
					toggleElement('down', data_target_on);
					toggleElement('up', data_target_off);
					toggleElement('disable', data_target_disable);
					toggleElement('uncheck', data_target_check);
					toggleElement('readonly-off', data_target_readonly);
					$(this).data('toggled',1);
				}
			}
			
		});
	}
	
	//===== Toggler Script for select elements
	if ($('.select-toggler').length) {
		$('.select-toggler').change(function() {
			
			var data_target_on = $(this).data('target-on'),
				data_target_off = $(this).data('target-off'),
				data_target_disable = $(this).data('target-disable'),
				data_target_enable = $(this).data('target-enable'),
				data_function_inverse = $(this).data('function-inverse') == 1 ? true : false,
				is_matched = $(this).val() == $(this).data('matched-value');

			if (!data_function_inverse) {
				if (is_matched) {
					toggleElement('down', data_target_on);
					toggleElement('up', data_target_off);
					toggleElement('disable', data_target_disable);
					$(this).data('toggled',1);
				} else {
					toggleElement('up', data_target_on);
					toggleElement('down', data_target_off);
					toggleElement('enable', data_target_enable);
					$(this).data('toggled',0);
				}
			} else {
				if (is_matched) {
					toggleElement('up', data_target_on);
					toggleElement('down', data_target_off);
					toggleElement('enable', data_target_enable);
					$(this).data('toggled',0);
				} else {
					toggleElement('down', data_target_on);
					toggleElement('up', data_target_off);
					toggleElement('disable', data_target_disable);
					$(this).data('toggled',1);
				}
			}
			
		});
	}
	//resets fields inside a target element
	function empty_fields_inside(target) {
		//empty input fields except submit and reset
		$(target).find('input:not(input[type="submit"]):not(input[type="reset"]):not(input[type="radio"]):not(input[type="checkbox"])')
			.val('');
		//empty select fields
		$(target).find('select > option[value=""]').prop('selected',true);
		//empty radio and checkbox
		$(target).find('input[type="radio"],input[type="checkbox"]').prop('checked',false);
		//empty textarea
		$(target).find('textarea').val('');	
	}
	
	//disable/enable fields inside a target element
	function enable_disable(mode, target) {
		
		if (mode=='disable') {
			$(target).find('input, select, textarea, button').prop('disabled', true);
			
			$(target).find('.dropzone.multipleFile').each(function(index) {
				$(this).addClass('disabled');
			});
		} else {
			$(target).find('input, select, textarea, button').prop('disabled', false);
			
			$(target).find('.dropzone.multipleFile').each(function(index) {
				$(this).removeClass('disabled');
			});
			
		}
	}
	
	//change text based on data-change-text attr
	function change_data_text(data_text) {
		if (data_text) {
			var query = data_text;
			var matches = {}, m;
			var reg = /(\[\'(\#*\.*[a-zA-Z_0-9-]+)\'\,\'(.*?)\'])/gm;
			while(m=reg.exec(query)) { 
			  $(m[2]).html(m[3]);
			}
		}
	}
	
	//slideUp/SlideDown Disable/Enable target elements and empty fields inside
	function toggleElement(mode, target) {
		
		if (target) {
			var target_elem = [];
			if (target) {
				target_elem = target.split(',');
			}
			switch(mode) {
				case "down":
					target_elem.forEach(function(elem) {
						if ($(elem).length) {
							$(elem).slideDown();
							$(elem).removeAttr('data-closed');
							//refresh_datatables($(elem));
						}
							
					})
					break;
				case "up":
					target_elem.forEach(function(elem) {
						if ($(elem).length) {
							$(elem).slideUp();
							$(elem).attr('data-closed', 1);
							//empty_fields_inside(elem);
						}
					})
					break;
				case "disable":
					target_elem.forEach(function(elem) {
						if ($(elem).length) {
							enable_disable('disable', target);
							//empty_fields_inside(elem);
						}
							
					})
					break;
				case "enable":
					target_elem.forEach(function(elem) {
						if ($(elem).length)
							enable_disable('enable', target)
					})
					break;
				case "check":
					target_elem.forEach(function(elem) {
						if ($(elem).length)
							$(elem).prop('checked',true);
					})
					break;
				case "uncheck":
					target_elem.forEach(function(elem) {
						if ($(elem).length)
							$(elem).prop('checked',false);
					})
					break;
				case "readonly-on":
					target_elem.forEach(function(elem) {
						if ($(elem).length) {
							$(elem).addClass('readonly');
							$(elem).find('input, select, textarea').prop('readonly',true);
						}
					})
					break;
				case "readonly-off":
					target_elem.forEach(function(elem) {
						if ($(elem).length) {
							$(elem).removeClass('readonly');
							$(elem).find('input, select, textarea').prop('readonly',false);
						}
					})
					break;
			}
		}
	}
	
	
	
});


String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

// Get the scrollbar width and height of a specific element using jQuery
function getScrollbarWidthAndHeight(element) {
    const $element = $(element);
    const scrollBarWidth = $element[0].offsetWidth - $element[0].clientWidth;
    const scrollBarHeight = $element[0].offsetHeight - $element[0].clientHeight;
    
    return { width: scrollBarWidth, height: scrollBarHeight };
}