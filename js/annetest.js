
    $('input[type=radio][name=bedStatus]').change(function() {
        if (this.value == 'allot') {
            alert("Allot Thai Gayo Bhai");
        }
        else if (this.value == 'transfer') {
            alert("Transfer Thai Gayo");
        }
    });

$(".radio input").change(function() {
  console.log('radio checked');
});


	function bookingEnquiry() {
			var data = getBookingSelection();


$(".radio input").change(function() {
			if(!data) {
				$('.booking-price').val('£0.00');
				// $('.button-orange').text('Contact us for a quote');
				$('.product-overview-foot button').attr('disabled', true);
				$('.error').html('Select an available date to see pricing.').show();
				return false;
			};
});



$('#no-size').change(function(){
    if ($('#no-size').is(':checked') == true){
      $('#field-party-size').val('').prop('disabled', true);
      console.log('checked');
   } else {
     $('#field-party-size').val('1').prop('disabled', false);
     console.log('unchecked');
   }
});


<div class="checkboxFive">
  		<input type="checkbox" value="1" id="checkboxFiveInput" name="" />
	  	<label for="checkboxFiveInput"></label>
  	</div>


  	/**
 * Checkbox Five
 */
.checkboxFive {
	width: 25px;
	margin: 20px 100px;
	position: relative;
}


/**
 * Create the box for the checkbox
 */
.checkboxFive label {
	cursor: pointer;
	position: absolute;
	width: 25px;
	height: 25px;
	top: 0;
  	left: 0;
	background: #eee;
	border:1px solid #ddd;
}


/**
 * Display the tick inside the checkbox
 */
.checkboxFive label:after {
	opacity: 0.2;
	content: '';
	position: absolute;
	width: 9px;
	height: 5px;
	background: transparent;
	top: 6px;
	left: 7px;
	border: 3px solid #333;
	border-top: none;
	border-right: none;

	transform: rotate(-45deg);
}

/**
 * Create the hover event of the tick
 */
.checkboxFive label:hover::after {
	opacity: 0.5;
}

/**
 * Create the checkbox state for the tick
 */
.checkboxFive input[type=checkbox]:checked + label:after {
	opacity: 1;
}