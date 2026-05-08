jQuery(document).ready(function ($) {
	//Page preload animation
	$(window).ready(function () {
		$('.preloadcss').delay(10).fadeOut('fast');
	});
	// Variables
	var is_rtl = $('html').attr('dir') == 'rtl' ? true : false;
	//Cookie Card Starts
	$(document).ready(function (e) {
		var has_loaded = sessionStorage.getItem("has_loaded");
		if (!has_loaded) {
			$(".cookie-card").show();
			$(".cookie-card").find('.govbh-btn').click(function(){
				$(".cookie-card").hide();
				sessionStorage.setItem("has_loaded", true);
			});
			sessionStorage.setItem("has_loaded", true);
		} else{
			$('.cookie-card').hide();
		}
	});
	//Cookie Card Ends
	
	//Dark Veriosn Mode Starts
	$(document).ready(function () {
		var govbh_dark_mode = sessionStorage.getItem("govbh_dark_mode");
	
		// Apply dark mode on page load
		if (govbh_dark_mode === "true") { 
			$("html").addClass("govbh-darkmode"); 
			$(".govbh-head__darkmode").addClass("active"); 
		}
	
		$(".govbh-head__darkmode").click(function(){
			$('.govbh-head__darkmode').toggleClass("active");
			$('html').toggleClass('govbh-darkmode');
	
			if ($(this).hasClass('active')) {
				sessionStorage.setItem("govbh_dark_mode", "true"); // Store as string
			} else {
				sessionStorage.setItem("govbh_dark_mode", "false");
			}
		});
	});
	//Dark Veriosn Mode Ends

	//Feedback Widget Starts
	$(document).ready(function () {
		$(".govbh-floatinglist__smiley-btn").click(function () {
        	$('.govbh-floatinglist__smiley').addClass("active");
		});
		$(".govbh-floatinglist__pop-close").click(function () {
			$('.govbh-floatinglist__smiley').removeClass("active");
		});
		// Click outside to remove active class
		$(document).click(function (event) {
			if (!$(event.target).closest('.govbh-floatinglist__smiley,.govbh-floatinglist__smiley-btn').length) {
				$('.govbh-floatinglist__smiley').removeClass("active");
			}
		});
	});

	//Accessibility Widget Starts
	$(document).ready(function () {
		$(".govbh-accessibility-widget__btn").click(function () {
        	$('.govbh-accessibility-widget').addClass("active");
		});
		$(".govbh-accessibility-widget__pop-close").click(function () {
			$('.govbh-accessibility-widget').removeClass("active");
		});
		// Click outside to remove active class
		$(document).click(function (event) {
			if (!$(event.target).closest('.govbh-accessibility-widget,.govbh-accessibility-widget__btn').length) {
				$('.govbh-accessibility-widget').removeClass("active");
			}
		});
	});
	//Text Resize Starts
	$(document).ready(function () {
		$(".govbh-head__textsize-btn").click(function () {
        	$('.govbh-head__textsize').addClass("active");
		});
		$(".govbh-head__textsize-close").click(function () {
			$('.govbh-head__textsize').removeClass("active");
		});
		// Click outside to remove active class
		$(document).click(function (event) {
			if (!$(event.target).closest('.govbh-head__textsize, .govbh-head__textsize-btn').length) {
				$('.govbh-head__textsize').removeClass("active");
			}
		});
	});
	$(document).ready(function () {
		// Apply font size on page load
		var govbh_font_resize = sessionStorage.getItem("govbh_font_resize");
		if (govbh_font_resize) {
			$("html").removeClass("govbh-head__textsize-small govbh-head__textsize-medium govbh-head__textsize-large").addClass(govbh_font_resize);
			$(".govbh-head__textsize-body li").removeClass("active");
			$(".govbh-head__textsize-body li." + govbh_font_resize).addClass("active");
		}

		$(".govbh-head__textsize-body li").click(function () {
			// Remove 'active' class from all li elements
			$(".govbh-head__textsize-body li").removeClass("active");

			// Add 'active' class to the clicked li element
			$(this).addClass("active");

			// Get the class name for the clicked li element
			var fontSizeClass = $(this).attr('class').split(' ')[0]; // Assumes the first class is the size class

			// Update the <html> tag class
			$("html").removeClass("govbh-head__textsize-small govbh-head__textsize-medium govbh-head__textsize-large").addClass(fontSizeClass);

			// Store the value of the clicked li element in sessionStorage
			sessionStorage.setItem("govbh_font_resize", fontSizeClass);
		});

		// Reset functionality
		$(".textsizereset").click(function () {
			// Remove 'active' class from all li elements
			$(".govbh-head__textsize-body li").removeClass("active");
			
			// Set medium as the active option
			$(".govbh-head__textsize-body li.govbh-head__textsize-medium").addClass("active");
			
			// Update the <html> tag to medium
			$("html").removeClass("govbh-head__textsize-small govbh-head__textsize-medium govbh-head__textsize-large").addClass("govbh-head__textsize-medium");
			
			// Store medium in sessionStorage
			sessionStorage.setItem("govbh_font_resize", "govbh-head__textsize-medium");
		});
	});
	//Text Resize Ends

	//Masthead Starts
	$(".privacyhead").click(function(){
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$(this).attr('aria-expanded','true');
		} else {
			$(this).attr('aria-expanded','false');
		}
	});
	//Masthead Ends

	//Head Search Starts
	$("#searchbtn").click(function(){
		$(this).toggleClass('active');
		$(".govbh-search").slideToggle("").find('input[type="search"]')[0].focus();
	});
	//Head Search Ends

	//Head Search Starts
	$("#accessibilitybtn").click(function(){
		$(this).toggleClass('active');
	});
	//Head Search Ends

	//Search Advanced Starts
	$(".govbh-advanced-search__head").click(function(){
		$(this).toggleClass('active');
		$(this).parents('.govbh-search-card').find('.govbh-search-card__head').toggleClass("active");
		// Change the text based on the active state
		const span = $(this).find('span');
		if ($(this).hasClass('active')) {
			$(this).attr('aria-expanded','true');
			span.text(lang.govbh_hide);
		} else {
			$(this).attr('aria-expanded','false');
			span.text(lang.govbh_show);
		}
	});
	//Search Advanced Ends
	
	//Hamburger Starts
	$("#govbhhamburger").click(function(){
		$(this).toggleClass('active');
		$('body').toggleClass('overflow-hidden');
		$('.govbh-menu , .govbh-menuclose').toggleClass('active');
	});
	$("#govbhhamburgerclose , .govbh-menuclose").click(function(){
		$('.govbh-hamburger').toggleClass('active');
		$('body').toggleClass('overflow-hidden');
		$('.govbh-menu , .govbh-menuclose').toggleClass('active');
	});
	//Hamburger Ends
	
	//Map Filter Starts
	$(".govbh-map__filter-close").click(function(){
		$('.govbh-map__filter').toggleClass('active');
		$(this).html($('.govbh-map__filter').hasClass('active') ? '<i class="ph-bold ph-x"></i>' : '<i class="ph-bold ph-list"></i>');
	});
	//Map Filter Ends

	
	
	// Sweet alert Starts
	$(document).ready(function () {
		/* var swal_display = $('#swal_display').val(),
		swal_type = $('#swal_type').val(),
		swal_icon = $('#swal_icon').val(),
		swal_title = $('#swal_title').val(),
		swal_subtitle = $('#swal_subtitle').val(),
		swal_msg = $('#swal_msg').val();

		if (swal_display == 1) {
			showalert(swal_type, swal_msg, swal_title, swal_icon, swal_subtitle);
		} */
		
		$('[data-swal-toggle="popup"]').each(function() {
			$(this).click(function() {
				var swal_type = $(this).data('swal-type'),
				swal_msg = $(this).data('swal-message'),
				swal_title = $(this).data('swal-title');

				showalert(swal_type, swal_msg, swal_title);
			});
		});
		//===== Function to show different alert types based on sweetalert2, make sure that swal's css and js files are included
		function showalert(alert_type, message, title) {

			switch(alert_type) {
				case "success":
					Swal.fire({
						icon: alert_type,
						title: title,
						html: message,
						showCancelButton: false,
						iconHtml: "<i class='ph-fill ph-check-circle'></i>",
						confirmButtonText: lang.swal_ok + "<i class='ph ph-arrow-right'></i>",
						//denyButtonText: "Ok <i class='ph ph-arrow-right'></i>",
						customClass: {
							confirmButton: 'govbh-btn govbh-btn--primary d-flex',
							denyButton: 'govbh-btn govbh-btn--outline',
							cancelButton: 'govbh-btn govbh-btn--outline',
						}
					});
					break;
				case "question":
					Swal.fire({
						icon: alert_type,
						title: title,
						html: message,
						iconHtml: "<i class='ph-fill ph-question'></i>",
						cancelButtonText: lang.swal_cancel,
						confirmButtonText: lang.swal_confirm + "<i class='ph ph-arrow-right'></i>",
						//denyButtonText: "Ok <i class='ph ph-arrow-right'></i>",
						showCancelButton: true,
						reverseButtons: true,
						customClass: {
							cancelButton: 'govbh-btn govbh-btn--outline',
							confirmButton: 'govbh-btn govbh-btn--primary d-flex',
							denyButton: 'govbh-btn govbh-btn--outline',
						}
					});
					break;
				case "info":
					Swal.fire({
						icon: alert_type,
						title: title,
						html: message,
						showCancelButton: false,
						iconHtml: "<i class='ph-fill ph-info'></i>",
						confirmButtonText: lang.swal_ok + "<i class='ph ph-arrow-right'></i>",
						//denyButtonText: "Ok <i class='ph ph-arrow-right'></i>",
						customClass: {
							confirmButton: 'govbh-btn govbh-btn--primary d-flex',
							denyButton: 'govbh-btn govbh-btn--outline',
							cancelButton: 'govbh-btn govbh-btn--outline',
						}
					});
					break;
				case "error":
					Swal.fire({
						icon: alert_type,
						title: title,
						html: message,
						showCancelButton: false,
						iconHtml: "<i class='ph-fill ph-x-circle'></i>",
						confirmButtonText: lang.swal_ok + "<i class='ph ph-arrow-right'></i>",
						//denyButtonText: "Ok <i class='ph ph-arrow-right'></i>",
						customClass: {
							confirmButton: 'govbh-btn govbh-btn--primary d-flex',
							denyButton: 'govbh-btn govbh-btn--outline',
							cancelButton: 'govbh-btn govbh-btn--outline',
						}
					});
					break;
				case "warning":
					Swal.fire({
						icon: alert_type,
						title: title,
						html: message,
						showCancelButton: false,
						iconHtml: "<i class='ph-fill ph-warning-circle'></i>",
						confirmButtonText: lang.swal_ok + "<i class='ph ph-arrow-right'></i>",
						//denyButtonText: "Ok <i class='ph ph-arrow-right'></i>",
						customClass: {
							confirmButton: 'govbh-btn govbh-btn--primary d-flex',
							denyButton: 'govbh-btn govbh-btn--outline',
							cancelButton: 'govbh-btn govbh-btn--outline',
						}
					});
					break;

			}	
		}
	});
	// Sweet alert Ends
	
	function changeSliderBulletsAriaLabel(index, className) {
			// Create the aria-label for each bullet
			const ariaLabel = lang.govbh_slider_button_aria_label.format(index + 1);
			return '<span role="button" class="' + className + '" aria-label="' + ariaLabel + '"></span>';
	}
	function changeSliderSlideAriaLabel(slides) {
			// Create the aria-label for each bullet
			const totalSlides0 = slides.length;
			// Update each slide's aria-label
			slides.forEach((slide, index) => {
				var ariaLabel = lang.govbh_slider_slide_aria_label.format(index + 1, totalSlides0);
				slide.setAttribute('aria-label', ariaLabel);
			});
	}

	//SWIPER INITIALIZATION CONDITION - RAM
	if ($('.govbh-heroslider__swiper, .govbh-fullwidthslider__swiper, .govbh-newscard__swiper, .govbh-popup-model-slider-swiper').length > 0) {
	//Hero Slider Starts
		var herosliderSwiper = new Swiper('.govbh-heroslider__swiper', {
			effect: 'fade',
			crossFade: true,
			speed: 900,
			slidesPerView: 1,
			spaceBetween: 0,
			parallax: true,
			loop: false,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			pagination: {
				el: '.govbh-heroslider__swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return changeSliderBulletsAriaLabel(index, className);
				},
			},
			navigation: {
				nextEl: '.govbh-heroslider__swiper-next',
				prevEl: '.govbh-heroslider__swiper-prev',
			},
			breakpoints: {
				0: {
					speed: 700,
				},
				576: {
					speed: 900,
				},
			},
			on: {
				slideChange: function () {
					changeSliderSlideAriaLabel(this.slides);
				}
			},
		});
		// Initial setting of aria-labels on page load
		herosliderSwiper.emit('slideChange');
		//Hero Slider Ends

		//Fullwith Hero Slider Starts
		var fullwidthherosliderSwiper = new Swiper('.govbh-fullwidthslider__swiper', {
			effect: 'fade',
			crossFade: true,
			speed: 900,
			slidesPerView: 1,
			spaceBetween: 0,
			parallax: true,
			loop: false,
			on: {
				slideChange: function () {
					changeSliderSlideAriaLabel(this.slides);
				}
			},
			breakpoints: {
				0: {
					speed: 600,
				},
				576: {
					speed: 900,
				},
			},
			pagination: {
				el: '.govbh-fullwidthslider__swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return changeSliderBulletsAriaLabel(index, className);
				},
			},
			navigation: {
				nextEl: '.govbh-fullwidthslider__swiper-next',
				prevEl: '.govbh-fullwidthslider__swiper-prev',
			}
		});
		// Initial setting of aria-labels on page load
		fullwidthherosliderSwiper.emit('slideChange');
		//Fullwith Hero Slider Ends

		//News Card Slider Starts
		var newsSwiper = new Swiper('.govbh-newscard__swiper', {
			effect: 'fade',
			crossFade: true,
			speed: 900,
			slidesPerView: 1,
			spaceBetween: 0,
			parallax: true,
			loop: false,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.govbh-newscard__swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return changeSliderBulletsAriaLabel(index, className);
				},
			},
			navigation: {
				nextEl: '.govbh-newscard__swiper-next',
				prevEl: '.govbh-newscard__swiper-prev',
			},
			breakpoints: {
				0: {
					speed: 700,
				},
				576: {
					speed: 900,
				},
			},
			on: {
				slideChange: function () {
					changeSliderSlideAriaLabel(this.slides);
				}
			},
		});
		// Initial setting of aria-labels on page load
		newsSwiper.emit('slideChange');
		//News Card Slider Ends

		//Executive Card Slider Starts
		var swiper_custom = new Swiper('.govbh-popup-model-slider-swiper', {
			effect: 'fade',
			crossFade: true,
			speed: 800,
			slidesPerView: 1,
			spaceBetween: 0,
			parallax: true,
			loop: false,
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			keyboard: {
				enabled: true,
				onlyInViewport: false
			},
			navigation: {
				nextEl: '.govbh-popup-model-slider-next',
				prevEl: '.govbh-popup-model-slider-prev',
			},
			breakpoints: {
				0: {
					speed: 500,
				},
				576: {
					speed: 800,
				},
			},
			on: {
				slideChange: function () {
					changeSliderSlideAriaLabel(this.slides);
				}
			},
		});
		// Initial setting of aria-labels on page load
		swiper_custom.emit('slideChange');
		//Executive Card Slider Ends
	}
	
	// Prevents the default action
	$('a[href="#"] ').click(function() {
		return false; 
	});

	let lastFocusedElement; // Variable to store the last focused element

	$(".govbh-popup-wrapper__item .govbh-popup-wrapper__items").on('click', function (e) {
		$("html").addClass("overflow-hidden");
		e.preventDefault();
		
		// Store a reference to the clicked element
		lastFocusedElement = $(this);
		
		var pop_index_profile = $(this).index('.govbh-popup-wrapper__items');
		$(".govbh-popup-model-slider").addClass("active").attr('aria-hidden', 'false');
		swiper_custom.slideTo(pop_index_profile, 500);
		
		// Focus the popup or its first focusable element
		setTimeout(function() {
			$(".govbh-popup-model-slider").focus(); // Set focus to the popup
			trapFocus($(".govbh-popup-model-slider")); // Call the function to trap focus
		}, 100); // Delay to ensure the modal is fully visible
	});

	//History Slider Starts
	if ($('.govbh-history-timeline__wrapper').length > 0) {
		$(".govbh-history-timeline__wrapper .govbh-history-timeline__item li button").on('click', function (e) {
			$("html").addClass("overflow-hidden");
			e.preventDefault();
			// Store a reference to the clicked element
			lastFocusedElement = $(this);

			var pop_index_history = $(this).index('.govbh-history-timeline__item li button');
			$(".govbh-popup-model-slider").addClass("active").attr('aria-hidden', 'false');
			swiper_custom.slideTo(pop_index_history, 500);
			// Focus the popup or its first focusable element
			setTimeout(function() {
				$(".govbh-popup-model-slider").focus(); // Set focus to the popup
				trapFocus($(".govbh-popup-model-slider")); // Call the function to trap focus
			}, 100); // Delay to ensure the modal is fully visible
		});
	}
	//History Slider Ends

	//Our Location POP Slider Starts
	if ($('.govbh-popup-model-slider--ourlocation').length > 0) {
		// $(".govbh-history-timeline__wrapper .govbh-history-timeline__item li").on('click', function (e) {
		$(document).on('click', '.leaflet-popup-content .govbh-btn[data-location-index]', function (e) {
			e.preventDefault();
			// Store a reference to the clicked element
			lastFocusedElement = $(this);
			//alert($(this).data('location-index'));
			$("html").addClass("overflow-hidden");
			var pop_index_history = $(this).data('location-index');
			$(".govbh-popup-model-slider").addClass("active").attr('aria-hidden', 'false');
			swiper_custom.slideTo(pop_index_history, 500);
		});
	}
	//Our Location POP Slider Ends

	// Function to trap focus within the modal
	function trapFocus(modal) {
		const focusableElements = modal.find('a, button, .govbh-popup-model-slider-prev, .govbh-popup-model-slider-next');
		const firstElement = focusableElements.first();
		const lastElement = focusableElements.last();

		modal.on('keydown', function(e) {
			if (e.key === 'Tab') {
				if (e.shiftKey) { // Shift + Tab
					if (document.activeElement === firstElement[0]) {
						e.preventDefault();
						lastElement.focus();
					}
				} else { // Tab
					if (document.activeElement === lastElement[0]) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			}
		});
	}

	// Function to close the popup
	function closePopup() {
		$("html").removeClass("overflow-hidden");
		$(".govbh-popup-model-slider").removeClass("active").attr('aria-hidden', 'true');
		
		// Return focus to the triggering element
		if (lastFocusedElement) {
			lastFocusedElement.focus();
		}
	}

	// Close the popup when the close button is clicked
	$(".govbh-popup-model-slider__close, .govbh-popup-model-slider__foot button, .govbh-popup-model-slider__overlay").on('click', function() {
		closePopup();
	});

	// Close popup with Escape key
	$(document).on('keydown', function(e) {
		if (e.key === 'Escape') {
			closePopup();
		}
	});
	
	

	//Usefullinks Slider Starts
	document.querySelectorAll('[data-carousel="usefullinks"]').forEach(carousel => {
		const usefullinks = new Swiper(carousel.querySelector('.govbh-carousel__usefullinks'), {
			effect: 'slide',
			speed: 900,
			slidesPerView: "auto",
			spaceBetween: 80,
			loop: false,
			navigation: {
				nextEl: carousel.querySelector('.govbh-carousel__nav-next'),
				prevEl: carousel.querySelector('.govbh-carousel__nav-prev'),
			},
			pagination: {
				el: carousel.querySelector('.govbh-carousel__nav-pagination'),
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			breakpoints: {
				0: {
					spaceBetween: 25,
					speed: 600,
				},
				768: {
					spaceBetween: 25,
				},
				992: {
					spaceBetween: 40,
				},
				1200: {
					spaceBetween: 60,
				},
				1600: {
					spaceBetween: 80,
				},
			},
		});
	});
	//Usefullinks Slider Ends

	//Swiper Slider Custom Starts
	document.querySelectorAll('[data-carousel="custom"]').forEach(carousel => {
		var data_bp_xxxs_slidesperview = carousel.getAttribute('data-slidesperview-xxxs') || 1,
			data_bp_xxs_slidesperview = carousel.getAttribute('data-slidesperview-xxs') || 2,
			data_bp_xs_slidesperview = carousel.getAttribute('data-slidesperview-xs') || 2,
			data_bp_md_slidesperview = carousel.getAttribute('data-slidesperview-md') || 2,
			data_bp_lg_slidesperview = carousel.getAttribute('data-slidesperview-lg') || 3,
			data_bp_xl_slidesperview = carousel.getAttribute('data-slidesperview-xl') || 3;

		const dataswiper = new Swiper(carousel.querySelector('.govbh-carousel__slider'), {
			effect: 'slide',
			speed: 900,
			slidesPerView: 3,
			spaceBetween: 20,
			loop: false,
			keyboard: {
				enabled: true,
				onlyInViewport: false
			},
			navigation: {
				nextEl: carousel.querySelector('.govbh-carousel__nav-next'),
				prevEl: carousel.querySelector('.govbh-carousel__nav-prev'),
			},
			pagination: {
				el: carousel.querySelector('.govbh-carousel__nav-pagination'),
				clickable: true,
				renderBullet: function (index, className) {
					return changeSliderBulletsAriaLabel(index, className);
				},
			},
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false,
			// },
			breakpoints: {
				0: {
					slidesPerView: data_bp_xxxs_slidesperview,
					spaceBetween: 5,
					speed: 600,
				},
				480: {
					slidesPerView: data_bp_xxs_slidesperview,
					spaceBetween: 5,
					speed: 600,
				},
				576: {
					slidesPerView: data_bp_xs_slidesperview,
					spaceBetween: 5,
				},
				768: {
					slidesPerView: data_bp_md_slidesperview,
					spaceBetween: 10,
				},
				992: {
					slidesPerView: data_bp_lg_slidesperview,
					spaceBetween: 10,
				},
				1200: {
					slidesPerView: data_bp_xl_slidesperview,
					spaceBetween: 20,
				},
			},
			on: {
				slideChange: function () {
					changeSliderSlideAriaLabel(this.slides);
				}
			},
		});
		// Initial setting of aria-labels on page load
    	dataswiper.emit('slideChange');
	});
	//Swiper Slider Custom Ends


	//Zebra Tooltips Script Starts
	$(document).ready(function () {
		new $.Zebra_Tooltips($('[data-tooltip="tooltip"]'),{
			opacity:1,
		});		
		new $.Zebra_Tooltips($('[data-tooltip-position="bottom"]'), {
			opacity:1,
			vertical_alignment: 'below'
		});
		new $.Zebra_Tooltips($('[data-tooltip-position="right"]'), {
			opacity:1,
			position:'right',
		});
		new $.Zebra_Tooltips($('[data-tooltip-position="left"]'), {
			opacity:1,
			position:'left',
		});
	});
	//Zebra Tooltips Script Ends

	//Youtube Script Starts
    jQuery(document).ready(function () {
        jQuery('[data-youtube], [data-vbg], #ytbg').youtube_background({
            playsinline: true, // Set this option to true
			mobile: true,
			lazyloading: true, // Enable lazy loading
        });
		
		$('.govbh-heroslider__playpause').click(function() {
			$(this).toggleClass('pause');
			$(this).parent('.govbh-heroslider__img').find('.govbh-heroslider__video').toggleClass("active");
			$(this).parent('.govbh-heroslider__img').find('button.play-toggle').click();
			var video = $(this).parent('.govbh-heroslider__img').find('video')[0];
			if (video.paused) {
            	video.play();
				$(this).attr('aria-label', lang.govbh_pause_video);
			} else {
				video.pause();
				$(this).attr('aria-label', lang.govbh_play_video);
			}
		});
		$('.govbh-fullwidthslider__playpause').click(function() {
			$(this).toggleClass('pause');
			$(this).parents('.govbh-fullwidthslider__wrapper').find('.govbh-fullwidthslider__video').toggleClass("active");
			$(this).parents('.govbh-fullwidthslider__wrapper').find('button.play-toggle').click();
			var video1 = $(this).parents('.govbh-fullwidthslider__wrapper').find('video')[0];
			if (video1.paused) {
            	video1.play();
				$(this).attr('aria-label', lang.govbh_pause_video);
			} else {
				video1.pause();
				$(this).attr('aria-label', lang.govbh_play_video);	
			}
		});
    });
   //Youtube Script Ends
   //ADDING ATTRIBUTE TO PLAY BUTTON SCRIPT STARTS
    $(window).ready(function () {
        setTimeout(function () {
            $('.video-background-controls .play-toggle').attr('aria-label', 'Play Video / Pause Video');
            $('.ms-search input').attr('aria-label', 'Search Options1').attr('aria-disabled','true');
            $('.dt-search label').attr('aria-label', 'Search Options');
            $('.govbh-carousel__nav-next').attr('aria-label', 'Next');
            $('.govbh-carousel__nav-prev').attr('aria-label', 'Previous');
            $('.ms-options > ul').attr('aria-multiselectable', 'true');
        }, 1000);
    });
    //ADDING ATTRIBUTE TO PLAY BUTTON SCRIPT ENDS

	//International Telephone Starts 
	$(document).ready(function () {
		if ($('[type="tel"]').length > 0) {
			const phone_flag_elems = document.querySelectorAll('[type="tel"]');
			phone_flag_elems.forEach(function (elem) {
				var iti = window.intlTelInput(elem, {
					initialCountry: "bh",
					separateDialCode: true,
					strictMode: true,
					// onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
					placeholderNumberType: "MOBILE",
				});
				window.iti = iti; // useful for testing
			});
		}
	});
	//International Telephone Ends 

	//Password Starts
	$(document).ready(function() {
		$('.togglePassword').click(function() {
			// Find the corresponding password input
			const passwordInput = $(this).siblings('.password'); // or use .closest() if needed
			const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
			passwordInput.attr('type', type);
			$(this).html(type === 'password' ? '<i class="ph ph-eye"></i>' : '<i class="ph ph-eye-slash"></i>'); // Change icon based on state
		});
	});
	//Password Ends

	//Fancybox Starts
	// $(document).ready(function() {
	// 	Fancybox.bind("[data-fancybox]", {
	// 		// Your custom options
	// 		Escape: "close",
	// 	});
	// });

	//FANCYBOX INITIALIZATION CONDITION - RAM
	$(document).ready(function() {
		var items = $("[data-fancybox]"); // Select elements with data-fancybox
		if (items.length > 0) {
			Fancybox.bind(items, {
				// Your custom options
				Escape: "close",
			});
		}
	});
	//Fancybox Ends

	//DatePicker Starts
	$(document).ready(function () {
		if ($('.datepicker-control').length > 0) {
			$('.datepicker-control').daterangepicker({
				singleDatePicker: true,
				showDropdowns: true,
				locale: {
					format: 'DD/MM/YYYY',
				}
			});
		}
		if ($('.daterangepicker-control').length > 0) {
			$('.daterangepicker-control').daterangepicker({
				singleDatePicker: false,
				showDropdowns: true,
				locale: {
					format: 'DD/MM/YYYY',
				}
			});
		}
	});
	//DatePicker Ends

	//Select2 Starts
	$(document).ready(function () {
		if ($('.select2').length > 0) {
			$('.select2').select2({
				//minimumResultsForSearch: Infinity, // Disable search box
				//closeOnSelect:true, // Close dropdown on selection
			}).on("select2:selecting", function (e) {
				var select_val = $(e.currentTarget).val();
				if (select_val != '' && select_val != undefined) {
					setTimeout(function () {
						$(e.currentTarget).next('.select2').addClass('with-value');
					}, 500);
				} else {
					setTimeout(function () {
						$(e.currentTarget).next('.select2').removeClass('with-value');
					}, 500);
				}
			});
		}
	});
	//Select2 Ends

	//MutiSelect Starts
	$('select[multiple].with-search').each(function() {
		var placeholder 		= $(this).data('placeholder') ? $(this).data('placeholder') : lang.choose_value,
			plaeholder_search	= $(this).data('placeholder-search') ? $(this).data('placeholder-search') : lang.search_value,
			columns				= $(this).data('columns') ? $(this).data('columns') : 1,
			select_all			= $(this).data('select-all') == 'yes' ? true : false,
			select_all_text		= $(this).data('select-all-text') ? $(this).data('select-all-text') : lang.select_all,
			unselect_all_text	= $(this).data('unselect-all-text') ? $(this).data('unselect-all-text') : lang.unselect_all,
			selected_option_text		= $(this).data('selected-option-text') ? $(this).data('selected-option-text') : lang.selected_option;
		
		$(this).multiselect({
			columns: columns,
			placeholder: placeholder,
			selectAllText: select_all_text,
			unselectAllText: unselect_all_text,
			selectedOptionsText: selected_option_text,
			search: true,
			searchOptions: {
				'default': plaeholder_search
			},
			selectAll: select_all
		});
		
	});
	//MutiSelect Ends

	//Standard File Upload Starts
	$(document).ready(function () {
		$('.form-group__file').each(function () {
		const $this = $(this);
		const $selDiv = $this.find('.form-group__file-selected');
		const $fileInput = $this.find('.form-group__file--upload');
		
		$fileInput.on('change', function (e) {
		handleFileSelect(e, $selDiv, $this);
		});
		});
	});		
	function handleFileSelect(e, $selDiv, $this) {
	const files = e.target.files; // Get the FileList from the input	
	// Clear existing files in the display
	$selDiv.empty();	
	// Convert FileList to an array for easier management
	const filesArray = Array.from(files);	
	filesArray.forEach((file) => {
		const fileSize = (file.size / 1024).toFixed(2); // Convert size to KB and format to 2 decimal places
		//const fileerrorIcon = '<i class="ph ph-file-pdf"></i>';
		// Create a new span for the selected file with a close button
		const $fileSpan = $(`
					<div class="form-group__selected-files-items">
						<span class="form-group__selected-files-items-title">${file.name}</span><span class="form-group__selected-files-items-size">(${fileSize} KB)</span> 
						<button type="button" class="close-btn" aria-label="Close file" data-name="${file.name}">
							<i class="ph ph-x" aria-hidden="true"></i>
						</button>
					</div>
				`);
		
		// Append the file span to the selected files div
		$selDiv.append($fileSpan);
	});
	// Add active class if there are files
	if (filesArray.length > 0) {
		$this.addClass("active");
	}
	// Attach click event to close buttons
	$selDiv.find(".close-btn").off('click').on('click', function () {
	const fileName = $(this).data("name");	
	// Remove the file element from the display
	$(this).parent().remove();	
	// Create a new DataTransfer object to hold the remaining files
	const dataTransfer = new DataTransfer();	
	// Add remaining files to the DataTransfer object
	filesArray.forEach((file) => {
		if (file.name !== fileName) {
			dataTransfer.items.add(file);
		}
	});	
	// Update the input's files property
	$this.find('.__file-upload')[0].files = dataTransfer.files;
	// Remove active class if no files left
	if ($selDiv.find('.file-item').length === 0) {
		$this.removeClass("active");
		}
	});
	}	
	if ($('.govbh-upload').length > 0) {

		// Select all file input elements with the class 'govbh-upload'
	const fileInputs = document.getElementsByClassName('govbh-upload');

	// Loop through each file input and add an event listener
	Array.from(fileInputs).forEach((input) => {
		input.addEventListener('change', function(e) {
			const MAX_SIZE_MB = 5;
			const MAX_FILES = 2;
			// Find the closest ancestor element with the class `.govbh-form-control`
			let parentFormControl = input.closest('.govbh-form-control');

			// Find the `.govbh-form-control__validation-message` element within the parent `.govbh-form-control`
			let errorElement = parentFormControl.querySelector('.govbh-form-control__validation-message');

			const errorIcon = '<i class="ph ph-warning"></i>';
			const files = e.target.files;
			let errors = [];

			// Clear previous errors
			errorElement.textContent = '';
			this.setAttribute('aria-invalid', 'false');

			// Check file count
			if (files.length > MAX_FILES) {
				$(this).parents('.form-group').addClass('govbh-form-control--invalid');
				errors.push(`<div>${errorIcon} ${lang.govbh_max_files_allowed.format(MAX_FILES)}</div>`);
			}

			// Check each file's size
			Array.from(files).forEach((file, index) => {
				if (file.size > MAX_SIZE_MB * 1024 * 1024) {
					$(this).parents('.form-group').addClass('govbh-form-control--invalid');
					errors.push(`<div class="file-error-div">${errorIcon} ${lang.govbh_file_exceeds.format(index + 1, file.name, MAX_SIZE_MB)}</div>`);
				}
			});

			// Display errors
			if (errors.length > 0) {
				errorElement.innerHTML = errors.join('');
				this.setAttribute('aria-invalid', 'true');
				this.value = ''; // Clear invalid selection
			}
		});
	});

	}
	//Standard File Upload Ends

	//File Upload Starts
	if (typeof Dropzone !== 'undefined') {
        Dropzone.autoDiscover = false; // Disable auto discovery
    }
    $(document).ready(function () {
		if ($('.dropzone').length > 0) {
			var myDropzone = Dropzone.forElement(".dropzone");
			if (myDropzone) {
				myDropzone.destroy(); // Destroy existing instance if it exists
			}
			// Initialize Dropzone
			$(".dropzone").dropzone({
				url: "../images/uploads", // Ensure this URL is correct
				maxFiles: 2, // Allow a maximum of 2 files
				maxFilesize: 5, // Maximum file size in MB
				acceptedFiles: ".pdf,.docx,.doc,.png", // Accepted file types
				dictDefaultMessage: "Drag and drop files here or click to upload (Multiple files allowed)",
				init: function() {
					this.on("addedfile", function(file) {
						var removeButton = Dropzone.createElement("<button class='dz-remove'>Remove File</button>");
						removeButton.addEventListener("click", function(e) {
							e.preventDefault();
							e.stopPropagation();
							this.removeFile(file);
						}.bind(this));
						file.previewElement.appendChild(removeButton);
					});

					this.on("success", function (file, response) {
						var existingval = $('#hdnFileNames').val();
						$('#hdnFileNames').val(existingval + response + ';'); // Append the response to the hidden input
					});

					this.on("removedfile", function (file) {
						var existingval = $('#hdnFileNames').val();
						var fileNamesArray = existingval.split(';').filter(Boolean); // Filter out empty entries
						var newFileNamesArray = fileNamesArray.filter(function(name) {
							return name !== file.name; // Remove the name of the removed file
						});
						$('#hdnFileNames').val(newFileNamesArray.join(';')); // Update the hidden input
					});
				}
			});
		}
    });
	//File Upload Ends

	//Textarea Limit Starts
	$(document).ready(function() {
		const textareas = document.querySelectorAll('.form-textarea');

		textareas.forEach((textarea, index) => {
			const charCount = document.querySelectorAll('.textarea-character-limit')[index];
			const maxLength = textarea.getAttribute('maxlength');

			textarea.addEventListener('input', function() {
				const remaining = maxLength - textarea.value.length;
				charCount.textContent = remaining;

				if (remaining < 0) {
					charCount.classList.add('error');
				} else {
					charCount.classList.remove('error');
				}
			});
			// Initial check
			const initialRemaining = maxLength - textarea.value.length;
			charCount.textContent = initialRemaining;
		});
	});
	//Textarea Limit Ends

	//Accordion tabs Starts
	$(document).ready(function() {
		if ($('.govbh-accordion__expand').length > 0) {
			document.querySelector('.govbh-accordion__expand').addEventListener('click', function() {
				const accordionItems = document.querySelectorAll('.govbh-accordion__item-body');
				const buttons = document.querySelectorAll('.accordion-button');
				const isExpanding = this.textContent === lang.expand_all;
		
				accordionItems.forEach(item => {
					const collapseInstance = new bootstrap.Collapse(item, {
						toggle: false // prevent automatic toggle
					});
					if (isExpanding) {
						collapseInstance.show();
					} else {
						collapseInstance.hide();
					}
				});
		
				buttons.forEach(button => {
					if (isExpanding) {
						button.classList.remove('collapsed');
					} else {
						button.classList.add('collapsed');
					}
				});
		
				// Update the button text
				this.textContent = isExpanding ? lang.collapse_all : lang.expand_all;
			});
		}
	});
	//Accordion tabs Ends

	//Range Slider Starts
	$(document).ready(function() {
		// Function to update slider value display
		function showSliderValue(slider) {
			const $sliderInput = $(slider).find('[type="range"]');
			const $sliderLine = $(slider).find('.form-group__range-slider');
			const value = $sliderInput.val();
			const max = $sliderInput.attr('max');
			const widthPercentage = (value / max) * 100;

			$sliderLine.css('width', widthPercentage + '%');
		}

		// Initialize all sliders
		$('.form-group__range').each(function() {
			showSliderValue(this);
		});

		// Update slider on input
		$('.form-group__range [type="range"]').on('input', function() {
			const $slider = $(this).closest('.form-group__range');
			showSliderValue($slider);
			const value = $(this).val();
			$(this).closest('.form-group__range-with-input').find('[type="number"]').val(value);
		});
		// Update slider on input
		$('.form-group__range-with-input [type="number"]').on('input', function() {
			const value = $(this).val(); // Get the value of the input
			const $parent_form_group = $(this).parents('.form-group__range-with-input');
			const $rangeSlider = $parent_form_group.find('[type="range"]'); // Find the range input
			$rangeSlider.val(value);
			showSliderValue($parent_form_group);
		});

		// Update on window resize
		$(window).on('resize', function() {
			$('.form-group__range').each(function() {
				showSliderValue(this);
			});
		});
	});
	//Range Slider Ends

	//Accessibility Starts
	$(document).ready(function() {
		$('.govbh-floatinglist__backarrow').click(function() {
			$('.govbh-floatinglist').toggleClass('govbh-floatinglist--open');
		});
	});
    if (document.querySelector('.govbh-floatinglist-vertical')) {
        var scrollToTopAccessibilityBtn = document.querySelector(".govbh-floatinglist-vertical");
        var rootElementAccessibility = document.documentElement;

        function handleScrollAccessibility() {
            var scrollTotal = rootElementAccessibility.scrollHeight - rootElementAccessibility.clientHeight;
            if ((rootElementAccessibility.scrollTop / scrollTotal) > 0.15) {
                // Show button
                scrollToTopAccessibilityBtn.classList.add("govbh-floatinglist--show");
            } else {
                // Hide button
                scrollToTopAccessibilityBtn.classList.remove("govbh-floatinglist--show");
            }
        }

        //scrollToTopAccessibilityBtn.addEventListener("click", scrollToTop);
        document.addEventListener("scroll", handleScrollAccessibility);
    }

	//Scroll to Top Button
	if (document.querySelector('.govbh-scrollToTopBtn')) {
		var scrollToTopBtn = document.querySelector(".govbh-scrollToTopBtn");
		var rootElement = document.documentElement;

		function handleScroll() {
			var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
			if ((rootElement.scrollTop / scrollTotal) > 0.15) {
				// Show button
				scrollToTopBtn.classList.add("showBtn");
			} else {
				// Hide button
				scrollToTopBtn.classList.remove("showBtn");
			}
		}

		function scrollToTop() {
			// Scroll to top logic
			rootElement.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}

		scrollToTopBtn.addEventListener("click", scrollToTop);
		document.addEventListener("scroll", handleScroll);
	}
	
});
// Menu Script Starts
jQuery(document).ready(function($) {	

	"use strict";
	if ($('.govbh-header').length) {
		var navikMenuListDropdown = $('.govbh-menu__navmenu ul li:has(ul)'),
			megaMenuFullwidthContainer = $('.govbh-menu__megamenu-container');
			megaMenuFullwidthContainer.each(function(){
				$(this).parent('li').addClass('megamenu');
			});		
			// navikMenuListDropdown.each(function(){
			// 	$(this).find('> a').append( '<span class="dropdown-plus"></span>' );
			// 	//$(this).find('> a').append( '<button type="button" rol="button" class="dropdown-plus"></button>' );
			// 	$(this).addClass('dropdown_menu');
			// });			
	}

	//GOVMENU INITIALIZATION CONDITION - RAM
	function toggleActiveClassMenu() {
		const menu = document.querySelector('.govbh-menu');
		// Check if the menu exists and has children
		if (menu && menu.children.length > 0) {
			if (window.innerWidth < 1199) {
				menu.classList.add('has-animate');
			} else {
				menu.classList.remove('has-animate');
			}
		}
	}
	// Initial check
	toggleActiveClassMenu();
	// Add event listener for resize
	window.addEventListener('resize', toggleActiveClassMenu);

	// function toggleActiveClassMenu() {
	// 	const menu = document.querySelector('.govbh-menu');
	// 	if (window.innerWidth < 1199) {
	// 		menu.classList.add('has-animate');
	// 	} else {
	// 		menu.classList.remove('has-animate');
	// 	}
	// }
	// // Initial check
	// toggleActiveClassMenu();

	
	//Smart Menu Script Starts
	$(function() {
		$('#main-menu').smartmenus({
			subMenusSubOffsetX: 1,
			subMenusSubOffsetY: 1,
			collapsibleBehavior: 'accordion',
			showTimeout:0,
			hideTimeout:0,
		});	
	});

});
// Menu Script Ends

//Column Extend Code Starts
jQuery(document).ready(function ($) {
    $(window).resize(function () {
        extend_column();
    });
    extend_column();
    function extend_column() {
        $('.extend-column').each(function () {
            var ec_elem = $(this), //define the element which will have extended column
                ec_container = ec_elem.parents('.container'),
                ec_row = ec_container.find('> .row'); //define its row

            //get the accumulated width of all div inside ec_row except the target ec_elem
            var accum_width = 0;
            ec_row.find('> div').not(ec_elem).each(function () {
                accum_width += $(this).width();
            });

            var half_outside_container = 0;
            //get the half of the outside of the container
            half_outside_container = ($(window).width() - ec_container.outerWidth()) / 2;
            //console.log($(window).width(), ec_container.outerWidth(), accum_width, half_outside_container);

            //subtract the ec_container width from browser width
            var px_to_extend = (ec_container.outerWidth() - accum_width) + half_outside_container;
            ec_elem.css('width', px_to_extend + 'px');

        });
    }
});
//Column Extend Code Ends	
//scrollintoview tabs starts
if ($('.govbh-tabs__head-tabs').length > 0) {
	document.addEventListener("DOMContentLoaded", function () {
		var tab_container_li = document.querySelectorAll(".govbh-tabs__head-tabs .govbh-tabs__list");

		tab_container_li.forEach(function (tab, index) {
		tab.addEventListener("click", function (event) {
			tab.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
			});
		});
		});
	});
	$(window).resize(function() {
		setHeightToNavTabContainer();
	});
	function setHeightToNavTabContainer() {
		//loop through each .nav-tab-container .nav-tabs and get the height + border-bottom
		$('.govbh-tabs__head .govbh-tabs__head-tabs').each(function() {
			let totalHeight = $(this).height() + parseInt($(this).css('border-bottom-width')),
				parentContainer = $(this).parent('.govbh-tabs__head');
			//get the scrollbar details (width and height)
			let scrollbar = getScrollbarWidthAndHeight(this);
				
			parentContainer.css({
				//deduct the scrollbar height, this hides the scrollbar in the scrolling tabs
				height: (totalHeight - scrollbar.height) + 'px'
			})
		})
	}
}
//scrollintoview tabs ends

//Countdown Starts
if ($('.govbh-countdown').length > 0) {
    // Set the date we're counting down to
    var countDownDate = new Date("Aug 29, 2025 08:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		var langdays = lang.days;
		var langhours = lang.hours;
		var langminutes = lang.minutes;		
		var langseconds = lang.seconds;

        // Update all elements with the class "govbh-countdown__timer"
        document.querySelectorAll('.govbh-countdown__timer').forEach(function(timerElement) {
            timerElement.innerHTML = '<div class="govbh-countdown__timer--list"><div class="govbh-countdown__numbers">' + days +'</div><div class="govbh-countdown__serial">' + langdays +'</div></div>' +
                '<div class="govbh-countdown__timer--list"><div class="govbh-countdown__numbers">' + hours +'</div><div class="govbh-countdown__serial">' + langhours +'</div></div>' +
                '<div class="govbh-countdown__timer--list"><div class="govbh-countdown__numbers">' + minutes +'</div><div class="govbh-countdown__serial">' + langminutes +'</div></div>' +
                '<div class="govbh-countdown__timer--list"><div class="govbh-countdown__numbers">' + seconds +'</div><div class="govbh-countdown__serial">' + langseconds +'</div></div>';
        });

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.querySelectorAll('.govbh-countdown__timer').forEach(function(timerElement) {
                timerElement.innerHTML = "EXPIRED";
            });
        }
    }, 1000);
}
//Countdown Ends

//Image Parallax Starts
$(document).ready(function () {
	var image = document.getElementsByClassName('imganimate');
	var imagescale = document.getElementsByClassName('imganimatescale');
	var rightimage = document.getElementsByClassName('rightanimate');
	var leftanimate = document.getElementsByClassName('leftanimate');
	var downanimate = document.getElementsByClassName('downanimate');
	new simpleParallax(image, {
		delay: 2,
		scale: 1.1,
		orientation: 'up',
		transition: 'cubic-bezier(0,0,0,1.2)'
	});
	new simpleParallax(imagescale, {
		delay: 2,
		scale: 1.25,
		orientation: 'up',
		transition: 'cubic-bezier(0,0,0,1.2)'
	});
	new simpleParallax(rightimage, {
		delay: 2,
		scale: 1.05,
		orientation: 'right',
		transition: 'cubic-bezier(0,0,0,1.2)'
	});
	new simpleParallax(leftanimate, {
		delay: 2,
		scale: 1.1,
		orientation: 'left',
		transition: 'cubic-bezier(0,0,0,1.2)'
	});
	new simpleParallax(downanimate, {
		delay: 2,
		scale: 1.25,
		orientation: 'down',
		transition: 'cubic-bezier(0,0,0,1.2)'
	});

});
//Image Parallax Ends

//Input Keyup Starts
$(document).ready(function() {
	jQuery.expr[':'].Contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
    };
    jQuery.expr[':'].contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
    };
    $('.govbh-map__filter-input input').keyup(function (e) {
        var s = $(this).val().trim();
        if (s === '') {
            $(this).closest('.govbh-map__filter-form').siblings('ul').find('li').show();
            return true;
        }
        $(this).closest('.govbh-map__filter-form').siblings('ul').find('li:not(:contains(' + s + '))').hide();
        $(this).closest('.govbh-map__filter-form').siblings('ul').find('li:contains(' + s + ')').show();
        return true;
    });
});
//Input Keyup Ends

//Vertical Floating List Starts
	document.addEventListener("DOMContentLoaded", () => {
		if ($('.myList, .govbh-floatinglist-vertical__backarrow').length > 0) {
			const ul = document.getElementById('myList');
			const backArrow = document.querySelector('.govbh-floatinglist-vertical__backarrow');

			// Initially show only the first li
			const items = ul.querySelectorAll('li');
			items.forEach((li, index) => {
				if (index > 0) {
					li.style.display = ''; // Hide all except the first
				}
			});

			// Toggle full list visibility on back arrow click
			backArrow.addEventListener('click', () => {
				if (ul.classList.contains('open')) {
					ul.classList.remove('open');
					backArrow.classList.remove('active');
					items.forEach((li, index) => {
						if (index > 0) {
							li.style.display = 'none'; // Hide all except the first
						}
					});
				} else {
					ul.classList.add('open');
					backArrow.classList.add('active');
					items.forEach(li => {
						li.style.display = ''; // Show all
					});
				}
			});
		}
    });
	
//Vertical Floating List Ends

//Footer hide content on mobile starts
$(document).ready(function() {
	function adjustFooters() {
		$('.govbh-footer__body').each(function() {
			var headaction = $(this).prev('.govbh-footer__head');
			if ($(window).width() <= 767) {
				$(this).hide(); // Hide body on mobile
				headaction.addClass('active');
			} else {
				$(this).show(); // Show body on desktop
				headaction.removeClass('active');
			}
		});
	}

	// Initial adjustment
	adjustFooters();

	// Toggle on header click
	$('.govbh-footer__head').click(function() {
		if ($(window).width() <= 767) {
			$(this).next('.govbh-footer__body').slideToggle(); // Slide toggle for the corresponding body
		}
	});

	// Adjust on window resize
	$(window).resize(function() {
		adjustFooters();
	});

	$('.govbh-open-user-rating').click(function() {
		
		$('[data-target-on="#sharethoughts"]').click();
		setTimeout(function() {
			var top = $('.govbh-user-rating').offset().top,
			//main_header_height = $(window).width() > 1199 ? $('.govbh-menu').height() : $('.govbh-head').height();
			menu_height = $(window).width() > 1199 ? $('.govbh-menu').height() : $('.govbh-head').height();
			$('html, body').animate({
				scrollTop: top-menu_height,
			}, 500);
		}, 500);
	});
});
//Footer hide content on mobile ends
//ODOMETER COUNTER STARTS
	//format guides
	/* Format    -  Example
	(,ddd)    -  12,345,678
	(,ddd).dd -  12,345,678.09
	(.ddd),dd -  12.345.678,09
	( ddd),dd -  12 345 678,09
	d         -  12345678 */

	var odom_el = $('.odometer'),
		odom_arr = [];
		odom_el.each(function(index, value) {
			var format = $('.odometer:eq('+index+')').data('format');
			odom_arr[index] = new Odometer({
			el: value,
			format: format ? format : '(,ddd)',
			theme: "default"
			});
		})
	$(document).ready(function () {		
		$(document).scroll(function () {
			updateCounter();
		});
		// Function to update the counter
		function updateCounter() {
			var pageYOffset = window.pageYOffset;
			$('.odometer').each(function () {
				//var parent_section_position = $(this).closest('.ad-counter-block').position();
				var parent_section_top = $(this).closest('.govbh-odometer').offset().top;
				if (pageYOffset >= parent_section_top - ($(window).height() / 1)) {
					if ($(this).data('status') == 'yes') {
						$(this).html($(this).data('count'));
						$(this).data('status', 'no');
					}
				}
			});
		}
		// Call the function to start the counter on page load
		updateCounter();
	});
	//ODOMETER COUNTER ENDS
	//Checkbox Starts
	$(document).ready(function () {		
	// Select all checkboxes & radios
        const inputcheckboxes = document.querySelectorAll('input[type="checkbox"]');

        inputcheckboxes.forEach(inputcheckboxe => {
            inputcheckboxe.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    inputcheckboxe.checked = !inputcheckboxe.checked; // Toggle checkbox
                    event.preventDefault(); // Prevent default action
                }
            });
        });
        const inputradios = document.querySelectorAll('input[type="radio"]');

        inputradios.forEach(inputradio => {
            inputradio.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    inputradio.checked = !inputradio.checked; // Toggle checkbox
                    event.preventDefault(); // Prevent default action
                }
            });
        });
	});
	//Checkbox Ends
// Side Widget Menu Script Starts
// This script handles the active state of side widget menu items based on clicks and URL hash changes
$(document).ready(function() {
  $('.govbh-side-widget__item').on('click', function() {
    $('.govbh-side-widget__item').removeClass('active');
    $(this).addClass('active');
  });

	function updateActiveMenuItem() {
		var rawHash = window.location.hash;
		if (rawHash) {
			
			var safeHash = sanitizeHash(rawHash); // strict whitelist
			var link = document.querySelector(
			`.govbh-side-widget__item a[href="#${CSS.escape(safeHash)}"]`
			);

			if (link) {
				document.querySelectorAll('.govbh-side-widget__item')
					.forEach(el => el.classList.remove('active'));
				link.parentElement.classList.add('active');
			}
		}
	}

	function sanitizeHash(hash) {
		// Strip leading "#"
		hash = hash.replace(/^#/, '');
		// Whitelist characters
		return hash.replace(/[^a-zA-Z0-9\-_]/g, '');
	}
  
  updateActiveMenuItem();
  $(window).on('hashchange', updateActiveMenuItem);
});
// Side Widget Menu Script Ends

if ($('.govbh-accordion__expand').length > 0) {
	$(document).on('click', '.govbh-accordion__expand', function () {
		const isChecked = $(this).attr('aria-checked') === 'true';
		$(this).attr('aria-checked', !isChecked); // Toggle the value
		// Additional logic to expand or collapse content goes here
	});
}
if ($('.govbh-breadcrumb__group').length > 0) {
	$(document).ready(function(){
		// Select the breadcrumb list
		const $breadcrumbList = $(".govbh-breadcrumb__group");
		// Count the number of <li> elements
		const itemCount = $breadcrumbList.find('li').length;
		// Check if there are more than 4 items
		if (itemCount > 3) {
			// Create the new <li> element for "Show more"
			const showMoreItem = $(`<li class="govbh-breadcrumb__item-show-more-toggle"><button aria-label="${lang.showmoretext}" type="button">…</button></li>`);

			// Insert the new <li> after the first <li> (home item)
			$breadcrumbList.find('.govbh-breadcrumb__item-home').after(showMoreItem);
		}
	});
	$(document).on('click','.govbh-breadcrumb__item-show-more-toggle',function(){
		$('.govbh-breadcrumb__group').addClass('active');
	});
}

//Form Swtich Starts
document.addEventListener('DOMContentLoaded', function() {
	const toggleSwitches = document.querySelectorAll('.toggle-switch');

	toggleSwitches.forEach(function(toggleSwitch) {
		toggleSwitch.addEventListener('change', function() {
			var arialabelledby = this.getAttribute('aria-labelledby');
			var ariaLabel = this.getAttribute('aria-label');
			var ariaLabelone = this.getAttribute('aria-label-one');
			var ariaLabeltwo = this.getAttribute('aria-label-two');
			document.getElementById(arialabelledby).textContent =  this.checked ? ariaLabel + ' ' +ariaLabeltwo : ariaLabel + ' ' +ariaLabelone;
			//this.setAttribute('aria-labell', this.checked ? 'true' : 'false');
		});
	});
});
//Form Swtich Ends

//sprintf
String.prototype.format = function() {
	var formatted = this;
	for( var arg in arguments ) {
		formatted = formatted.replace("{" + arg + "}", arguments[arg]);
	}
	return formatted;
};
// Side menu sticky #tags
if ($('.govbh-side-widget__content').length > 0) {
	$(document).on('click', '.govbh-side-widget__content > ul > li > a', function (e) {
		e.preventDefault();
		var thisref = this;
		setTimeout(function () {
			var href_attr = $(thisref).attr('href'),
				//menu_height = $('.govbh-menu').height();
				main_header_height = $(window).width() > 1199 ? $('.govbh-menu').height() : $('.govbh-head').height();
			$("html, body").animate({ scrollTop: ($(href_attr).offset().top - main_header_height) }, "fast");
		}, 100);
	});
}

//STEPS SCRIPT STARTS
if ($('ul.govbh-steps').length) {
	activate_mobile_step(false);
}
function activate_mobile_step(update) {
	$('ul.govbh-steps').each(function() {
		if (!update)
			var return_html = '<div class="govbh-mobile-steps d-md-none d-sm-flex d-flex mb-4">';
		else
			var return_html = '';

		var steps = $(this),
			steps_num = steps.find('li').length,
			active_step = steps.find('li.active').index(),
			percentage = ((active_step + 1) / steps_num)*100,
			current_step_text = '<h3> <span>'+ steps.find('li.active').find('.govbh-steps__item-content span').text() +'</span>' + steps.find('li.active').find('.govbh-steps__item-content .govbh-steps__item-content-title').text() + '</h3>';
			console.log(active_step);

		
		var next_step_text = '';
		if (percentage != 100) {
			next_step_text = '<p><strong>'+ lang.dt_next_text +':</strong> '+ steps.find('li:eq('+ (active_step+1) +')').find('.govbh-steps__item-content-title').text() +'</p>';
		}

		var step_def = '<span>'+ (active_step+1) + '</span><span>' + lang.of_text + '</span><span>' + steps_num +'</span>';

		return_html += '<div class="pie-container"><div class="pie animate no-round" style="--p:'+ percentage +';--c:lightgreen">'+ step_def +'</div></div>';
		return_html += '<div class="govbh-mobile-steps__text">';
		return_html += current_step_text;
		return_html += next_step_text;
		return_html += '</div>';

		if (!update) {
			return_html += '</div>';

			$(return_html).insertAfter(this);
		} else {
			$('.govbh-mobile-steps').html(return_html);
		}
		
	})
}
//STEPS SCRIPT ENDS

//COLORBOX GALLERY STARTS
$(document).ready(function () {	
	//add accessibility properties to colorbox controls
	if ($('[data-cb-gallery][data-cb-type]').length > 0) {
		$('#cboxNext').attr('aria-label', lang.govbh_next_gallery);
		$('#cboxPrevious').attr('aria-label', lang.govbh_prev_gallery);
		$('#cboxClose').attr('aria-label', lang.govbh_close_gallery);
		$('#cboxSlideshow').attr('aria-label', lang.govbh_play_gallery);
		$('#cboxSlideshow').attr('aria-hidden', true);
	}
	
	$('#cboxPrevious, #cboxNext').click(function() {
		setTimeout(function() {
			var cBoxTitle = $('#cboxTitle').text();
			$('.cboxPhoto').attr('alt', cBoxTitle);
		},1000);
	});

	$('[data-cb-gallery][data-cb-type]').each(function() {
		var cbox = $(this),
			cbox_gallery = cbox.data('cb-gallery'),
			cbox_type = cbox.data('cb-type');

		switch(cbox_type) {
			case 'photo':
				$('.' + cbox_gallery).colorbox({rel:cbox_gallery, maxWidth: "85%", maxHeight: "85%", transition:"fade"});
				break;
			case 'video':
				$('.' + cbox_gallery).colorbox({rel:cbox_gallery, maxWidth: "85%", maxHeight: "85%", transition:"fade", iframe:true, innerWidth:1280, innerHeight:720,});
				break;
			case 'pdf':
				$('.' + cbox_gallery).colorbox({rel:cbox_gallery, maxWidth: "85%", maxHeight: "80%", height: "80%", transition:"fade", iframe:true, innerWidth:1280, innerHeight:720,});
				break;
		}
	})
	 
	 $('[data-cb-gallery][data-cb-type]').click(function() {
		$('html').addClass('with-colorbox');
		setTimeout(function() {
			var cBoxTitle = $('#cboxTitle').text();
			$('.cboxPhoto').attr('alt', cBoxTitle);
		},1000);
	 });
	 $(document).keydown(function(event) {
		if (event.keyCode === 27 || event.which === 27) {
			if ($('html').hasClass('with-colorbox')) {
				$('html').removeClass('with-colorbox');
			}
		}
	});
	 $(document).on('click', '#cboxClose, #cboxOverlay', function() {
		$('html').removeClass('with-colorbox');
	 });
});
//COLORBOX GALLERY ENDS