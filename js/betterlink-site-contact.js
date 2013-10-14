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

		console.log(translatedValues);
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
	var entries = [];

	$.each(fieldMappings, function(oldName, newName) {
		var dataExistence = new RegExp("(^|&)" + oldName + "=[^&$]+");

		var parameterData = dataExistence.exec(formValues);
		if(parameterData) {
			var data = parameterData[0].substr(parameterData[0].indexOf('='));
			var newString = newName + data;

			entries.push(newString);
		}
	});

	return entries.join('&');
}

function disableSubmissionButton() {
	jqSubmissionButton.attr('disabled', true);
}

function enableSubmissionButton() {
	jqSubmissionButton.removeAttr('disabled');
}
