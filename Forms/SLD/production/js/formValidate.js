(function ($) {

	"use strict";

	// form Id
	$('#formExampleValidation').validate({

		rules: {			
		
			exampleFirstName: {
				required: true,
				minlength: 2,
				maxlength: 60
			},
			
			exampleLastName: {
				required: true,
				minlength: 2,
				maxlength: 60
			},
			
			exampleDOB: {
				required: true
			},
			
			examplePhone: {
				required: true
			},
		
			exampleEmail: {
				required: true,
				email: true
			},
			exampleEmailConfirm: {
				required: true,
				email: true,
				equalTo: '#exampleEmail'
			},

			examplePassword: {
				required: true,
				minlength: 5
			},
			examplePasswordConfirm: {
				required: true,
				equalTo: '#examplePassword'
			},
			
			exampleSelect: {
				required: true
			},
			
			exampleCheckbox: {
				required: true
			}

		},

		messages: {			
		
			exampleFirstName: {
				required: "Please enter your name",
				minlength: "Please enter your name",
				maxlength: "Please enter your name"
			},
			exampleLastName: {
				required: "Please enter your last name",
				minlength: "Please enter your last name",
				maxlength: "Please enter your last name"
			},
			exampleDOB: {
				required: "This is a required field"
			},
			
			examplePhone: {
				required: "This is a required field"
			},
					
			exampleEmail: {
				required: "E-mail field is required",
				email: "Please enter a valid email address"
			},
			exampleEmailConfirm: {
				required: "E-mail field is required",
				email: "Please enter a valid email address",
				equalTo: "Emails do not match"
			},
			
			exampleCheckbox: {
				required: "This is a required field"
			},			

			examplePassword: {
				required: "The password field must be filled in",
				minlength: "Minimum 5 characters"
			},
			examplePasswordConfirm: {
				required: "The password field must be filled in",
				equalTo: "Passwords do not match"
			},					
						
			exampleCheckbox: {
				required: "This is a required field"
			}
			
		},	
		
		submitHandler: function(form) { // for demo
            alert('Valid form submitted'); // for demo
            return false; // for demo		
        }

	});
	

})(window.jQuery);