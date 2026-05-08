jQuery(document).ready(function() {
	
	"use strict";
	
	/* ========== Sticky on scroll ========== */
	function stickyNav() {
		var scrollTop = $(window).scrollTop(),
			noSticky = $('.no-sticky'),
			viewportSm = $('.viewport-sm'),
			viewportLg = $('.viewport-lg'),
			viewportLgBody = viewportLg.parent('body'),
			viewportLgNosticky = $('.viewport-lg.no-sticky'),
			viewportLgNostickyBody = viewportLgNosticky.parent('body'),
			headerTransparentLg = $('.viewport-lg.header-transparent'),
			headerTransparentLgBody = headerTransparentLg.parent('body'),
			headerOpacityLg = $('.viewport-lg.header-opacity'),
			headerOpacityLgBody = headerOpacityLg.parent('body');

		if (scrollTop > navikHeaderHeight) {
			navikHeader.addClass('sticky');
			viewportLgBody.css("margin-top", navikHeaderHeight);
			viewportLg.css("margin-top", -navikHeaderHeight);
		} else {
			navikHeader.removeClass('sticky');
			viewportLgBody.add(viewportLg).css("margin-top", "0");
		}

		noSticky.removeClass('sticky');
		//viewportSm.removeClass('sticky');
		
		headerTransparentLg.add(headerTransparentLgBody).add(headerOpacityLg).add(headerOpacityLgBody).add(viewportLgNostickyBody).add(viewportLgNosticky).css("margin-top", "0");
	}
	/* ========== Horizontal navigation menu ========== */
	if ($('.govbh-header').length) {
		var navikHeader = $('.govbh-header'),
			navikHeaderHeight = navikHeader.height(),
			headerTransparent = $('.navik-header.header-transparent'),
			headerOpacity = $('.navik-header.header-opacity');

		/* ========== Window resize ========== */
		$(window).on("resize", function() {
			if ($(window).width() < 1) {
				navikHeader.removeClass('viewport-lg');
				navikHeader.addClass('viewport-sm');
				headerTransparent.removeClass('header-transparent-on');
				headerOpacity.removeClass('header-opacity-on');
			} else {
				navikHeader.removeClass('viewport-sm');
				navikHeader.addClass('viewport-lg');
				headerTransparent.addClass('header-transparent-on');
				headerOpacity.addClass('header-opacity-on');
			}
			stickyNav();
		}).resize();

		/* ========== Sticky on scroll ========== */
		$(window).on("scroll", function() {
			stickyNav();
		}).scroll();
	}
});