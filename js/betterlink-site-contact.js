var jqSubmissionButton;
var jqContactUsForm;

$(document).ready(function(){
	jqSubmissionButton = $('#submit-contact-form-btn');
	jqContactUsForm = $('#contact-us-form');

	jqContactUsForm.submit(function(e) {
		e.preventDefault();
		disableSubmissionButton();
		submitContactUsForm();
	});
});

function submitContactUsForm() {
	var formValues = jqContactUsForm.serialize();
	if(validateEntry(formValues)) {
		var translatedValues = translateValuesForWufoo(formValues);
		sendToWufoo(translatedValues);
	}
}

function validateEntry(inputs) {
	// naive check to match against the existence of
	// the parameter "save=contact" 
	var submissionCheck = /save=contact($|&)/;
	return submissionCheck.test(inputs);
}

function translateValuesForWufoo(formValues) {
	var fieldMappings = {
		'contact_name': 'Field2',
		'contact_email': 'Field5',
		'contact_message': 'Field3'
	};
	var dataMappings = {};

	$.each(fieldMappings, function(oldName, newName) {
		// Matches a 'key=value' parameter found within a set of parameters
		var dataExistence = new RegExp("(^|&)" + oldName + "=[^&$]+");

		var parameterData = dataExistence.exec(formValues);
		if(parameterData) {
			var data = parameterData[0].substr(parameterData[0].indexOf('=')+1);
			dataMappings.newName = data;
		}
	});

	return dataMappings;
}

function sendToWufoo(dataMappings) {
	var API_KEY = 'UZOS-9A5D-ZMHJ-GRNP';
	var FORM_HASH = 'z1uoi9vn0nkd3y5'; // contact-us form
	var url = 'https://betterlink.wufoo.com/api/v3/forms/' + FORM_HASH + '/entries.json';

	// see https://betterlink.wufoo.com/docs/api/v3/entries/post/
	// and https://betterlink.wufoo.com/docs/api/v3/examples/
}

function disableSubmissionButton() {
	jqSubmissionButton.attr('disabled', true);
}

function enableSubmissionButton() {
	jqSubmissionButton.removeAttr('disabled');
}
