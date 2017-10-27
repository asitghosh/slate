//= require ./lib/_energize
//= require ./app/_toc
//= require ./app/_lang
$(function() {
	loadToc($('#toc'), '.toc-link', '.toc-list-h2', 120);
	setupLanguages($('body').data('languages'));
	$('.content').imagesLoaded(function() {
		window.recacheHeights();
		window.refreshToc();
	});
});

window.onpopstate = function() {
	activateLanguage(getLanguageFromQueryString());
};

$(document).ready(function() {
	var i = 0;
	$('.api_reference').addClass('secondary_nav_active');
	$(this).find('.subnav').hide();
	$('.primary-header-left-ul-li a').css('color', '#a2a2a2');
	$('.appdirect_dark_logo').css('display', 'block');
	$('.appdirect_light_logo').css('display', 'none');

	//////////////////////////////////////////////////////////////////
	////// Top-Right side hamburger icon hide and show for mobile view
	//////////////////////////////////////////////////////////////////

	$(document).on('click', 'body', function(e) {
		if ($(window).width() <= 700) {
			if ($(e.target).attr('id') !== "hide_menu") {
				$('.primary-header-right-ul').hide();
				$('#hide_menu').removeClass('active');
			}
		}
	});
	$('#hide_menu').click(function() {
		$(this).toggleClass('active');
		$('.primary-header-right-ul').toggle();
	});
	$(window).resize(function() {
		if ($(window).width() > 700) {
			if ($('#hide_menu').hasClass('active')) {
				$('#hide_menu').removeClass('active');
				$(".primary-header-right-ul").css('display', 'flex');
			}
			$(".primary-header-right-ul").show();
		} else {
			if ($('#hide_menu').hasClass('active')) {
				$(".primary-header-right-ul").show();
			} else {
				$(".primary-header-right-ul").hide();
			}
		}

		////////////////////////////////////////////////////////////////////////////////////////////
		////// Open user guide menu on hover for desktop + tablet view and on click for mobile view
		////////////////////////////////////////////////////////////////////////////////////////////

		if ($(window).width() > 700) {
			donotpopulate();
			$('.subnav-li , .subnav').mouseover(function() {
				populate();
			});
			$('.subnav-li , .subnav').mouseout(function() {
				donotpopulate();
			});
		} else if ($(window).width() <= 700) {
			donotpopulate();
			$(document).on('click', 'body', function(event) {
				if ($(event.target).attr('id') !== "userguidelink_id") {
					donotpopulate();
					i = 0;
				}
			});
			$('.subnav-li').click(function() {
				if (i == 0) {
					populate();
					i = 1;
				} else {
					donotpopulate();
					i = 0;
				}
			});
		}
	}).trigger('resize');

	///////////////////////////////////////////////////////////////////////////////////////////////
	/////////// functions of populate and non-populate
	//////////////////////////////////////////////////////////////////////////////////////////////


	function populate() {
		$('.subnav').show();
		$('.subnav-li').css("background-color", "#333");
		$('.userguidelink').css("background-color", "#333");
		$('.userguidelink').css("color", "#fff");
	}

	function donotpopulate() {
		$('.subnav').hide();
		$('.subnav-li').css("background-color", "#eee");
		$('.userguidelink').css("background-color", "#eee");
		$('.userguidelink').css("color", "#a2a2a2");
	}

	//////////////////////////////////////////////////////////////////////////////
	/////// Colour change of anchor tag on hover of li
	//////////////////////////////////////////////////////////////////////////////

	$('.helpsupport-li').mouseover(function() {

		$('.helpsupport').css('color', '#fff');

	});
	$('.helpsupport-li').mouseout(function() {

		$('.helpsupport').css('color', '#a2a2a2');


	});

	$('.right-side-border').mouseover(function() {

		$('.right-side-border a').css('color', '#fff');

	});
	$('.right-side-border').mouseout(function() {

		$('.right-side-border a').css('color', '#a2a2a2');


	});

	///////////////////////////////////////////////////////////////////////////////
	///////////// Changing top-left side appdirect logo on hover
	//////////////////////////////////////////////////////////////////////////////


	$('.logo-li').mouseover(function() {

		$('.appdirect_dark_logo').css('display', 'none');
		$('.appdirect_light_logo').css('display', 'block');

	});
	$('.logo-li').mouseout(function() {

		$('.appdirect_dark_logo').css('display', 'block');
		$('.appdirect_light_logo').css('display', 'none');

	});

});
