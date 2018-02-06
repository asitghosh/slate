$(document).ready(function() {

	var container = " ";
	var searchClass = $('.search-result-title');
	getUrlParameter();
	var query = getUrlParameter('search');
	searchOnPageLoad(query);

	$('#search-val').keyup(function(e) {

		var input = $('#search-val').val();

		if (input.length > 0) {
			$('.header-search-result').addClass('search-val-hover-result');
		} else if ((input.length == 0) && $('.header-search-result').hasClass('search-val-hover-result')) {
			$('.header-search-result').removeClass('search-val-hover-result');
		}

		if (e.keyCode == 13 && input.length > 0) {
			window.location.href = "searchPage.html?search=" + input;
		}
	});

	function searchOnPageLoad(query) {
		$('#search-val').attr('value', query);
		var input = query;
		var api = 'https://appwise.appdirect.com/api/v2/marketplaces/marketplace.appdirect.com/index/search?format=json&q=';
		var url = api + input + '&page_size=1000&marketplace_sections=DOCUMENTATION';

		$('html head').find('title').text(input + " - AppDirect Search");

		if (input.length > 0) {
			$('.header-search-result').addClass('search-val-hover-result');
		} else if ((input.length == 0) && $('.header-search-result').hasClass('search-val-hover-result')) {
			$('.header-search-result').removeClass('search-val-hover-result');
		}

		$('.search-result-title').empty();
		$('.search-image').css('display', 'block');

		$('.search-filter-mobile').css('display', 'none');
		$('.search-results').css('display', 'none');
		$('.index_All').prop('checked', true);

		$.getJSON(url, function(data) {
			if (data.response.docs.length > 0) {
				for (var i = 0; i < data.response.docs.length; i++) {
					var title = data.response.docs[i].title;

					if (title.includes("AppWise") || title.includes("AppInsights") || title.includes("AppMarket") || title.includes("AppBilling")) {

						title = trimApiTitles(title);
					}

					var getUrl = data.response.docs[i].url;
					var desc = data.response.docs[i].description.replace(new RegExp('\r?\n', 'g'), '<br />');

					filterTitleBaseOnUrl(getUrl);
					container = data.response.docs;
					searchClass.append("<a class='search-title-append' href = " + getUrl + " target = '_blank'>" + "<p class='search-title-append-content'>" + title + "</p>" + "</a>" + "<p class='search-highlight'>" + desc + "</p>");
				}
			} else {
				searchClass.append("<p>No results found for " + "'" + input + "'" + "</p>");
			}
			highlightKeyword(input);
			$('.search-heading').append("Search Results for " + "'" + input + "'");
			$('.search-results').css('display', 'flex');
			$('.search-image').css('display', 'none');
			if ($(window).width() <= 1073) {
				$('#All_Mobile').prop('checked', true);
				$('.search-filter-mobile').css('display', 'flex');
			}
		});
	}

	$('.index_api').click(function() {

		$('.search-result-title').empty();
		var input = $('#search-val').val();

		for (var i = 0; i < container.length; i++) {
			var title = container[i].title;

			if (title.includes("AppWise") || title.includes("AppInsights") || title.includes("AppMarket") || title.includes("AppBilling")) {

				title = trimApiTitles(title);
			}

			var desc = container[i].description.replace(new RegExp('\r?\n', 'g'), '<br />');
			var getUrl = container[i].url;

			if (getUrl.indexOf("/api/") >= 0) {
				filterTitleBaseOnUrl(getUrl);
				searchClass.append("<a class='search-title-append' href = " + getUrl + " target = '_blank'>" + "<p class='search-title-append-content'>" + title + "</p>" + "</a>" + "<p class='search-highlight'>" + desc + "</p>");
			}
		}
		highlightKeyword(input);
	});

	$('.index_documentation').click(function() {

		$('.search-result-title').empty();
		var input = $('#search-val').val();

		for (var i = 0; i < container.length; i++) {
			var title = container[i].title;
			if (title.includes("AppWise") || title.includes("AppInsights") || title.includes("AppMarket") || title.includes("AppBilling")) {

				title = trimApiTitles(title);
			}

			var desc = container[i].description;
			var getUrl = container[i].url;

			if (getUrl.indexOf("/api/") == -1) {
				filterTitleBaseOnUrl(getUrl);
				searchClass.append("<a class='search-title-append' href = " + getUrl + " target = '_blank'>" + "<p class='search-title-append-content'>" + title + "</p>" + "</a>" + "<p class='search-highlight'>" + desc + "</p>");
			}
		}
		highlightKeyword(input);
	});

	$('.index_All').click(function() {

		$('.search-result-title').empty();
		var input = $('#search-val').val();

		for (var i = 0; i < container.length; i++) {

			var title = container[i].title;

			if (title.includes("AppWise") || title.includes("AppInsights") || title.includes("AppMarket") || title.includes("AppBilling")) {

				title = trimApiTitles(title);
			}

			var getUrl = container[i].url;
			var desc = container[i].description.replace(new RegExp('\r?\n', 'g'), '<br />');
			filterTitleBaseOnUrl(getUrl);
			searchClass.append("<a class='search-title-append' href = " + getUrl + " target = '_blank'>" + "<p class='search-title-append-content'>" + title + "</p>" + "</a>" + "<p class='search-highlight'>" + desc + "</p>");
		}
		highlightKeyword(input);
	});

	function filterTitleBaseOnUrl(getUrl) {
		if (getUrl.indexOf("/appmarket/") >= 0) {
			searchClass.append("<p class='topic-title'>AppMarket Online Help</p>");
		} else if (getUrl.indexOf("/appbilling/") >= 0) {
			searchClass.append("<p class='topic-title'>AppBilling Online Help</p>");
		} else if (getUrl.indexOf("/appdistrib/") >= 0) {
			searchClass.append("<p class='topic-title'>AppDistribution Online Help</p>");
		} else if (getUrl.indexOf("/appreseller/") >= 0) {
			searchClass.append("<p class='topic-title'>AppReseller Online Help</p>");
		} else if (getUrl.indexOf("/appwise/") >= 0) {
			searchClass.append("<p class='topic-title'>AppWise Online Help</p>");
		} else if (getUrl.indexOf("/appinsights/") >= 0) {
			searchClass.append("<p class='topic-title'>AppInsights Online Help</p>");
		} else if (getUrl.indexOf("/api/appmarket.html") >= 0) {
			searchClass.append("<p class='topic-title'>AppMarket API Reference</p>");
		} else if (getUrl.indexOf("/api/appbilling.html") >= 0) {
			searchClass.append("<p class='topic-title'>AppBilling API Reference</p>");
		} else if (getUrl.indexOf("/api/appinsights.html") >= 0) {
			searchClass.append("<p class='topic-title'>AppInsights API Reference</p>");
		} else if (getUrl.indexOf("/api/appwise.html") >= 0) {
			searchClass.append("<p class='topic-title'>AppWise API Reference</p>");
		}
	}

	function highlightKeyword(input) {
		$(".search-highlight").mark(input, {
			"element": "span",
			"className": "highlight-search"
		});
	}

	function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	}

	function trimApiTitles(title) {
		var api_title = " ";

		api_title = title.split("-");
		title = api_title.slice(1, api_title.length).join("-");
		return title;
	}
});
