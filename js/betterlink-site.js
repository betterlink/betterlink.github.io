$(document).ready(function(){
	$("div.info-bar a").click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
});