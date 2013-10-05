var custom;
custom = window.custom || (function () {

	var api = {};

	api.toggleDisplayOfInfo = function(linkedDiv) {
		var infoDiv = $("#" + linkedDiv);
		var infoBox = infoDiv.closest('.info-box');
		
		if(sectionIsNotDisplayed(infoDiv)) {
			activateElement(infoDiv);
			ensureContainerIsActive(infoBox);
		}
		else {
			hideElements(infoDiv, infoBox);
		}
	}

	function sectionIsNotDisplayed(element) {
		return !element.hasClass("active");
	}

	function activateElement(elementToShow) {
		elementToShow.toggleClass("hidden active");

		var activeSiblings = elementToShow.siblings('.active');
		activeSiblings.toggleClass("hidden active");
	}

	function ensureContainerIsActive(container) {
		container.addClass("active").removeClass("hidden");
	}

	function hideElements() {
		for (var i = 0, len = arguments.length; i < len; i++){
			arguments[i].addClass("hidden").removeClass("active");
		}
	}

	return api;
})();

$(document).ready(function(){
	$("div.info-bar a").click(function() {
		custom.toggleDisplayOfInfo($(this).attr('data-linked-div'));
		return false;
	});
});