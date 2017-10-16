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
	// Different Left Nav Logos for Different API Docs.
	////////////////////////////////////////////////////////////////////////////////

	$(document).ready(function() {

		if ($('body').hasClass('appmarket')) {

			$("#Page_Logo").attr('src', 'images/AppMarket.svg');
			$('body').css('visibility', 'visible');
		}

		if ($('body').hasClass('appbilling')) {
			$("#Page_Logo").attr('src', 'images/AppBilling.svg');
			$('body').css('visibility', 'visible');
		}

		if ($('body').hasClass('appinsights')) {
			$("#Page_Logo").attr('src', 'images/AppInsights.svg');
			$('body').css('visibility', 'visible');
		}

		if ($('body').hasClass('appwise')) {
			$("#Page_Logo").attr('src', 'images/AppWise.svg');

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

	$(document).ready(function() {
		$('a[href*="#"]').bind("click", function(e) {

			var target = $(this).attr("href"); //Get the target
			var scrollToPosition = $(target).offset().top - document.getElementById('header').offsetHeight

			$('html,body').animate({
				'scrollTop': scrollToPosition
			}, 0, function(target) {
				window.location.hash = target;
			});

			e.preventDefault();
		});

	});
})();
