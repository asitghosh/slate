$(document).ready(function() {

	// var container = " ";
	// var searchClass = $('.search-result-title');

	$('#search-val').keyup(function(e) {

		var input = $('#search-val').val();
		// var api = 'https://appwise.appdirect.com/api/v2/marketplaces/marketplace.appdirect.com/index/search?format=json&q=';
		// var url = api + input;
		if (input.length > 0) {
			$('.header-search-result').addClass('search-val-hover');
		} else if ((input.length == 0) && $('.header-search-result').hasClass('search-val-hover')) {
			$('.header-search-result').removeClass('search-val-hover');
		}

		if (e.keyCode == 13 && input.length > 0) {

			window.location.href = "searchPage.html?search=" + input;
		}
	});
	// 		$('.search-result-title').empty();
	// 		$('.search-image').css('display', 'block');
	// 		$('.search-results').css('display', 'none');
	// 		$('#index_All').prop('checked', true);

	// 		$.getJSON(url, function(data) {

	// 			for (var i = 0; i < data.response.docs.length; i++) {
	// 				var title = data.response.docs[i].title;
	// 				var getUrl = data.response.docs[i].url;
	// 				var desc = data.response.docs[i].description;
	// 				filterTitleBaseOnUrl(getUrl);
	// 				container = data.response.docs;
	// 				searchClass.append("<a class='search-title-append' href = " + getUrl + " target = '_blank'>" + "<p class='search-title-append-content'>" + title + "</p>" + "</a>" + "<p class='search-highlight'>" + desc + "</p>");
	// 			}
	// 			highlightKeyword(input);

	// 			$('.search-heading').append("Search Results for " + "'" + input + "'");
	// 			$('.search-results').css('display', 'flex');
	// 			$('.search-image').css('display', 'none');
	// 		});
	// 	}
	// });

	// $('#index_api').click(function() {

	// 	$('.search-result-title').empty();

	// 	var input = $('#search-val').val();

	// 	for (var i = 0; i < container.length; i++) {
	// 		var title = container[i].title;
	// 		var desc = container[i].description;
	// 		var getUrl = container[i].url;

	// 		if (getUrl.indexOf("/api/") >= 0) {
	// 			filterTitleBaseOnUrl(getUrl);
	// 			searchClass.append("<a class='search-title-append' href = " + getUrl + " target = '_blank'>" + "<p class='search-title-append-content'>" + title + "</p>" + "</a>" + "<p class='search-highlight'>" + desc + "</p>");
	// 		}
	// 		highlightKeyword(input);

	// 	}
	// });

	// $('#index_documentation').click(function() {

	// 	$('.search-result-title').empty();
	// 	var input = $('#search-val').val();

	// 	for (var i = 0; i < container.length; i++) {
	// 		var title = container[i].title;
	// 		var desc = container[i].description;
	// 		var getUrl = container[i].url;

	// 		if (getUrl.indexOf("/api/") == -1) {
	// 			filterTitleBaseOnUrl(getUrl);
	// 			searchClass.append("<a class='search-title-append' href = " + getUrl + " target = '_blank'>" + "<p class='search-title-append-content'>" + title + "</p>" + "</a>" + "<p class='search-highlight'>" + desc + "</p>");
	// 		}
	// 		highlightKeyword(input);
	// 	}
	// });

	// $('#index_All').click(function() {

	// 	$('.search-result-title').empty();

	// 	var input = $('#search-val').val();

	// 	for (var i = 0; i < container.length; i++) {
	// 		var title = container[i].title;
	// 		var getUrl = container[i].url;
	// 		var desc = container[i].description;
	// 		filterTitleBaseOnUrl(getUrl);
	// 		searchClass.append("<a class='search-title-append' href = " + getUrl + " target = '_blank'>" + "<p class='search-title-append-content'>" + title + "</p>" + "</a>" + "<p class='search-highlight'>" + desc + "</p>");
	// 	}
	// 	highlightKeyword(input);
	// });

	// function filterTitleBaseOnUrl(getUrl) {
	// 	if (getUrl.indexOf("appmarket") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppMarket Online Help</p>");
	// 	} else if (getUrl.indexOf("appbilling") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppBilling Online Help</p>");
	// 	} else if (getUrl.indexOf("appdistrib") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppDistribution Online Help</p>");
	// 	} else if (getUrl.indexOf("appreseller") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppReseller Online Help</p>");
	// 	} else if (getUrl.indexOf("appwise") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppWise Online Help</p>");
	// 	} else if (getUrl.indexOf("appinsights") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppInsights Online Help</p>");
	// 	} else if (getUrl.indexOf("/api/appmarke") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppMarket API Reference</p>");
	// 	} else if (getUrl.indexOf("/api/appbilling") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppBilling API Reference</p>");
	// 	} else if (getUrl.indexOf("/api/appinsights") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppInsights API Reference</p>");
	// 	} else if (getUrl.indexOf("/api/appwise") >= 0) {
	// 		searchClass.append("<p class='topic-title'>AppWise API Reference</p>");
	// 	}
	// }

	// function highlightKeyword(input) {
	// 	$(".search-highlight").mark(input, {
	// 		"element": "span",
	// 		"className": "highlight"
	// 	});
	// }
});
