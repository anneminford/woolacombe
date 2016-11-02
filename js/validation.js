			// Booking Form validation
		function validateDonotSelect(value,element,param)
	    {
	        if(value == param)
	        {
	          return false;
	        }
	        else
	        {
	            return true;
	        }      
	    }
	    $.validator.addMethod("do_not_select",validateDonotSelect,"Please select an option");


        $('#register-form').validate({
            rules: {
                "customer[title]": {
                	required: true,
                	do_not_select:'sel'
                },
                "customer[firstName]": "required",
                "customer[surname]": "required",
                "customer[email]": {
                    required: true,
                    email: true
                },
                "customer[phone]": {
                required: true,
                digits: true
                },
                "customer[addr1]": "required",
                "customer[addr2]": "required",
                "customer[town]": "required",
                "customer[postcode]":"required",
                "customer[county]":"required",
                "customer[country]":"required",
                "party[][title]": {
                	required: true,
                	do_not_select:'sel'
                },
                "party[][firstName]":"required",
                "party[][surname]":"required",
                "party[][age]": {
                	required:true,
                	do_not_select:'sel'
                },
                "party[][type]":"required"
                },
                 errorPlacement: function(error, element) {   },
                 debug: true,//remove after dev
                 messages: {
                // firstname: "Please enter your first name.", CUSTOMISE THE ERRORS IF NECESSARY
                },
                errorContainer: $('#errorContainer'),
               // errorLabelContainer: $('#errorContainer ul'), SHOW THE INDIVIDUAL ERRORS IN LIST
                // wrapper: 'li'

                 submitHandler: function(form) {
                  form.submit();
                  $.ajax({
                      url: '//woolacombe.appira.com/index.php?'+$(this).serialize(),
                      method: 'GET',
                      dataType: 'jsonp',
                      data: {
                        type: 'add_booking_details',
                        booking: getUrlVar('booking')
                      },
                      success: function(data) {
                        if(data.errorCode) {
                          return $('#register-form .form-actions .button-green').after('<p class="error-function1">'+data.errorDescription+'</p>');
                        }

                        $.ajax({
                          url: '//woolacombe.appira.com/index.php',
                          method: 'GET',
                          dataType: 'jsonp',
                          data: {
                            booking: getUrlVar('booking'),
                            type: 'pay_booking'
                          },
                          success: function(data) {
                            if(data.errorCode) {
                              return $('#register-form .form-actions .button-green').after('<p class="error-function2">'+data.errorDescription+'</p>');
                            }

                            window.location.href = data.redirect;
                          }
                        });
                      }
                    });
                }

        });
        $("#titleparty").rules("add", {
         required:true,
         do_not_select:'sel'
      	});
      	$("#surnameparty").rules("add", {
         required:true,
      	});
      	$(".firstnameparty").rules("add", {
         required:true,
      	});
      	$("#partyage").rules("add", {
         required:true,
         do_not_select:'sel'
      	});
      	$("#partytype").rules("add", {
         required:true,
      	});
// end register validation


// $('#form').validate({

//     ... your validation rules come here,

//     submitHandler: function(form) {
//         $.ajax({
//             url: form.action,
//             type: form.method,
//             data: $(form).serialize(),
//             success: function(response) {
//                 $('#answers').html(response);
//             }            
//         });
//     }
// });