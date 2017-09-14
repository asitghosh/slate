//= require ../lib/_jquery
//= require ../lib/_imagesloaded.min

;
(function() {
	'use strict';

	var loaded = false;

	var debounce = function(func, waitTime) {
		var timeout = false;
		return function() {
			if (timeout === false) {
				setTimeout(function() {
					func();
					timeout = false;
				}, waitTime);
				timeout = true;
			}
		};
	};

	////////////////////////////////////////////////////////////////////////////////
	// Different Left Nav Styling for Different API Docs.
	////////////////////////////////////////////////////////////////////////////////

	$(document).ready(function() {

		if ($('body').hasClass('appmarket')) {
			$("#Page_Logo").attr('src', 'images/AppMarket_MasterLogo1_RGB.svg');
			$(".toc-wrapper").css('background-color', '#009abf');
			$("input.input-search").css('background', '#009abf');
			$("input#header-search").css('background', '#ffffff ');
			$(".toc-wrapper .search-results").css('background-color', '#009abf');
		}

		if ($('body').hasClass('appbilling')) {
			$("#Page_Logo").attr('src', 'images/AppBilling_LogoREV1_RGB.svg');
			$(".toc-wrapper").css('background-color', '#78be20 ');
			$("input.input-search").css('background', '#78be20 ');
			$("input#header-search").css('background', '#ffffff ');
			$(".toc-wrapper .search-results").css('background-color', '#78be20');
		}

		if ($('body').hasClass('appinsights')) {
			$("#Page_Logo").attr('src', 'images/AppInsights_LogoREV1_RGB.svg');
			$(".toc-wrapper").css('background-color', '#00a8df ');
			$("input.input-search").css('background', '#00a8df ');
			$("input#header-search").css('background', '#ffffff ');
			$(".toc-wrapper .search-results").css('background-color', '#00a8df ');
		}

		if ($('body').hasClass('appwise')) {
			$("#Page_Logo").attr('src', 'images/AppWise_LogoREV1_RGB.svg');
			$(".toc-wrapper").css('background-color', '#26d07c ');
			$("input.input-search").css('background', '#26d07c ');
			$("input#header-search").css('background', '#ffffff ');
			$(".toc-wrapper .search-results").css('background-color', '#26d07c ');
		}

		$('body').css('visibility', 'visible');

	});


	var closeToc = function() {
		$(".toc-wrapper").removeClass('open');
		$("#nav-button").removeClass('open');
	};

	function loadToc($toc, tocLinkSelector, tocListSelector, scrollOffset) {
		var headerHeights = {};
		var pageHeight = 0;
		var windowHeight = 0;
		var originalTitle = document.title;

		var recacheHeights = function() {
			headerHeights = {};
			pageHeight = $(document).height();
			windowHeight = $(window).height();

			$toc.find(tocLinkSelector).each(function() {
				var targetId = $(this).attr('href');
				if (targetId[0] === "#") {
					headerHeights[targetId] = $(targetId).offset().top;
				}
			});
		};

		var refreshToc = function() {
			var currentTop = $(document).scrollTop() + scrollOffset;

			if (currentTop + windowHeight >= pageHeight) {
				// at bottom of page, so just select last header by making currentTop very large
				// this fixes the problem where the last header won't ever show as active if its content
				// is shorter than the window height
				currentTop = pageHeight + 1000;
			}

			var best = null;
			for (var name in headerHeights) {
				if ((headerHeights[name] < currentTop && headerHeights[name] > headerHeights[best]) || best === null) {
					best = name;
				}
			}

			// Catch the initial load case
			if (currentTop == scrollOffset && !loaded) {
				best = window.location.hash;
				loaded = true;
			}

			var $best = $toc.find("[href='" + best + "']").first();
			if (!$best.hasClass("active")) {
				// .active is applied to the ToC link we're currently on, and its parent <ul>s selected by tocListSelector
				// .active-expanded is applied to the ToC links that are parents of this one
				$toc.find(".active").removeClass("active");
				$toc.find(".active-parent").removeClass("active-parent");
				$best.addClass("active");
				$best.parents(tocListSelector).addClass("active").siblings(tocLinkSelector).addClass('active-parent');
				$best.siblings(tocListSelector).addClass("active");
				$toc.find(tocListSelector).filter(":not(.active)").slideUp(150);
				$toc.find(tocListSelector).filter(".active").slideDown(150);
				if (window.history.pushState) {
					window.history.pushState(null, "", best);
				}
				// TODO remove classnames
				document.title = $best.data("title") + " – " + originalTitle;
			}
		};

		var makeToc = function() {
			recacheHeights();
			refreshToc();

			$("#nav-button").click(function() {
				$(".toc-wrapper").toggleClass('open');
				$("#nav-button").toggleClass('open');
				return false;
			});
			$(".page-wrapper").click(closeToc);
			$(".toc-link").click(closeToc);

			// reload immediately after scrolling on toc click
			$toc.find(tocLinkSelector).click(function() {
				setTimeout(function() {
					refreshToc();
				}, 0);
			});

			$(window).scroll(debounce(refreshToc, 200));
			$(window).resize(debounce(recacheHeights, 200));
		};

		makeToc();

		window.recacheHeights = recacheHeights;
		window.refreshToc = refreshToc;
	}

	window.loadToc = loadToc;

	/////////////////////////////////////////////////
	/// SCROLL DOWN PAGE TO GET TO CLICKED LINK
	/////////////////////////////////////////////////

	var jump = function(e) {

		e.preventDefault(); //prevent "hard" jump
		var target = $(this).attr("href"); //get the target

		//perform animated scrolling
		$('html,body').animate({
				scrollTop: $(target).offset().top - document.getElementById('header').offsetHeight //get top-position of target-element and set it as scroll target
			}, 1000, function() //scrolldelay: 1 seconds
			{
				location.hash = target; //attach the hash (#jumptarget) to the pageurl
			});
	}
	$(document).ready(function() {
		$('a[href*="#"]').bind("click", jump); //get all hrefs
		return false;
	});

})();
