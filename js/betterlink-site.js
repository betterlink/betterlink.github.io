$(document).ready(function(){
	var hash = window.location.hash;
	hash && $('.info-bar a[href="' + hash + '"]').tab('show');

	$(".info-bar a").click(function(e) {
		$(this).tab('show');
		clearHashForDefaultView(e);
	});
});

function clearHashForDefaultView(e) {
	if(anchorIsForDefaultView($(e.target))) {
		e.preventDefault();
		window.location.hash = '';
	}
}

function anchorIsForDefaultView(jqAnchorElement) {
	var hash = jqAnchorElement.attr('href');
	return hash === '#placement-example' || hash === '#script-sample';
}
