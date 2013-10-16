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
	var formValues = jqContactUsForm.serializeArray();
	formValues = turnFormArrayIntoKeyValues(formValues);

	if(validateEntry(formValues)) {
		var translatedValues = translateValuesForWufoo(formValues);
		var formData = generateFormData(addWufooPostKey(translatedValues));
		sendToWufoo(formData);
	}
}

// Because we know our data is simple (just text values), then
// it's safe to run this basic conversion.
function turnFormArrayIntoKeyValues(formValues) {
	var formObject = {}
	$.each(formValues, function(index, obj) {
		formObject[obj.name] = obj.value;
	});
	return formObject;
}

// Validate that the request is coming from our web form. This
// is naively handled via a hidden attribute 'save=contact'.
function validateEntry(inputs) {
	if(inputs.hasOwnProperty('save')) {
		return inputs['save'] === 'contact';
	}
	return false;
}

// Convert the name fields in our web form into the fields
// that Wufoo has mapped to those attributes.
function translateValuesForWufoo(formValues) {
	var fieldMappings = {
		'contact_name': 'Field2',
		'contact_email': 'Field5',
		'contact_message': 'Field3'
	};

	var translatedValues = {};
	$.each(fieldMappings, function(oldName, newName) {
		translatedValues[newName] = formValues[oldName];
	});

	return translatedValues;
}

// In order for Wufoo to accept our Cross-Origin request,
// we need to supply this external POST key.
// Accessed via https://betterlink.wufoo.com/api/code/1/
function addWufooPostKey(dataMappings) {
	POST_KEY = 'opCNEE7w20felqkSRw1VKG90XtVGojCv9AZVyQfsfQs=';
	dataMappings['idstamp'] = POST_KEY;

	return dataMappings;
}

// Convert JS object into a FormData object that can be
// transmitted via an HTTP POST. Necessary to generate
// the multipart format expected by Wufoo.
function generateFormData(dataMappings) {
	var formData = new FormData();
	$.each(dataMappings, function (key, value) {
		formData.append(key, value);
	});
	return formData;
}

function sendToWufoo(formData) {
	var FORM_HASH = 'z1uoi9vn0nkd3y5'; // contact-us form
	var url = 'https://betterlink.wufoo.com/forms/' + FORM_HASH + '/';

	// structure influenced by http://stackoverflow.com/a/5976031
	// contentType = 'false' tells JQuery not to set the header for us,
	//               allowing the boundary string to be set
	// processData = 'false' is setup because FormData has set the data
	//               as we want
	// we always display success because the browser does not believe the
	// HTTP request reaches the server (it does). The returned jqXHR object
	// errors and returns a status code of 0.
	$.ajax({
		url: url,
		type: 'POST',
		data: formData,
		contentType: false,
		processData: false,
		dataType: 'json',
		success: displaySuccessResponse,
		error: displaySuccessResponse,
	}).always(function() {
		enableSubmissionButton();
	});

	// see https://betterlink.wufoo.com/docs/api/v2/external-post-to-wufoo/
	// and https://betterlink.wufoo.com/docs/api/v3/examples/
}

function disableSubmissionButton() {
	jqSubmissionButton.attr('disabled', true);
}

function enableSubmissionButton() {
	jqSubmissionButton.removeAttr('disabled');
}

function displaySuccessResponse(data) {
	var message = 'Thanks for your message. We\'ll get back in touch soon.';
	$('#submission-response').text(message);
}

function displayErrorResponse(jqXHR, textStatus, errorThrown) {
	var errorMessage = 'There was a problem sending your message. Please try emailing us at <a href="mailto:info@betterlink.co">info@betterlink.co</a>.';
	$('#submission-response').html(errorMessage);
}
