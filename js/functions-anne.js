$(document).ready(function() {
	$('body').on('change', '#no-size-popup', function(e) {
		e.preventDefault();	
		if ($('#no-size-popup').is(':checked') == true){
		    $('.list-radios-secondary input').val('').prop('disabled', true).attr('checked', false);
		    $('.list-radios-secondary label').addClass('fadeRadio');
		} else {
			 $('.list-radios-secondary input').val('1').prop('disabled', false);
				$('.list-radios-secondary label').removeClass('fadeRadio');
		};
	});

	if(getUrlVar('date')) {
		$('.form-advanced-search .product-calendar').datepicker('setDate', new Date(getUrlVar('date')));
		$('.product-calendar.cottageDate').datepicker('setDate', new Date(getUrlVar('date')));
	}

	if(getUrlVar('duration')) {
		$('.form-advanced-search input[name="duration"][value="'+getUrlVar('duration')+'"]').prop('checked', true);
		$('input[name="duration-group"][value="'+getUrlVar('duration')+'"]').attr('data-checked', 'checked');
	}

	if(getUrlVar('partysizemax')) {
		$('.form-advanced-search input[name="partysizemax"]').val(getUrlVar('partysizemax'));
		$('input[name="field-party-size"]').val(getUrlVar('partysizemax'));
	}

	if(getUrlVar('status')==='invalid') {
		$('.section-thanks header').hide();
		$('.section-thanks.error').show();
		$('.section-thanks.error p span.reason').text(getUrlVar('reason'));
	}

	// Booking Form add new party member
   	$('.copy-member').click(function(){
   		event.preventDefault();
   		var partyCount = $('.party-addition').length + 1;
      	$('.party-addition:first').clone().attr('id', partyCount++).insertAfter($('div.party-addition:last'));
		$( '.party-addition').each(function( index ) {
		  	var changeTitle = $( this ).attr('id');
		  	$(this).find('h4').text('Party Details Member ' + changeTitle);
		});
		if ($('div#2').length){
		    $('.remove-member').css('display', 'block');
		}
  	 });

   // Booking Form remove party member
	$('body').on('click', '.remove-member', function() {
		event.preventDefault();
		$('.party-addition:last').remove();
		var partyCount = $('.party-addition').length + 1;
   		if($('div#2').length == 0) {
  			$('.remove-member').css('display', 'none');
		}
	});

 	// Booking Form validation
	$(function(){

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
                title: {
                	required: true,
                	do_not_select:'sel'
                },
                firstname: "required",
                surname: "required",
                email: {
                    required: true,
                    email: true
                },
                phone: {
                required: true,
                digits: true
                },
                address1: "required",
                address2: "required",
                city: "required",
                postcode:"required",
                county:"required",
                country:"required",
                titleparty: {
                	required: true,
                	do_not_select:'sel'
                },
                firstnameparty:"required",
                surnameparty:"required",
                ageparty: {
                	required:true,
                	do_not_select:'sel'
                },
                typeparty:"required"
                },
                 errorPlacement: function(error, element) {   },
                 messages: {
                // firstname: "Please enter your first name.", CUSTOMISE THE ERRORS IF NECESSARY
                },
                errorContainer: $('#errorContainer'),
                // errorLabelContainer: $('#errorContainer ul'), SHOW THE INDIVIDUAL ERRORS IN LIST
                // wrapper: 'li'

        });
	 });

	// populate type field from age
	$('body').on('change', '.party-addition .ageparty', function() {
	    console.log( this.value ); 
		  if(this.value>17)
		  {
		  	$(".typeparty").val("Adult");
		  } else {
		  	$(".typeparty").val("Child");
		  }
		  console.log($('.typeparty').val());
	});


	// share
	
	$('.sm-link-email').attr('href', $('.sm-link-email').attr('href') + window.location.href);

	var hashremove = window.location.hash.slice(1);
	$('.sm-link-facebook').attr('href', $('.sm-link-facebook').attr('href') + hashremove);
	$('.sm-link-google').attr('href', $('.sm-link-google').attr('href') + hashremove);
	$('.sm-link-twitter').attr('href', $('.sm-link-twitter').attr('href') + hashremove);
	//$('.sm-link-pinterest').attr('href', $('.sm-link-pinterest').attr('href') + hashremove);

	// Header search href
	var root = '\/\/' + window.location.host;
	if(~window.location.href.indexOf('preview')) {
		root = '//station.locomotive.works/_app/gentle-summer-7034/preview';
	}
	$(".open-search").attr("href", root + '/' + 'search');

	// Overlay basic search construct url for search
	$(document).on('click','.search-by-location-basic',function(e) {
        e.preventDefault();
		var results = $('.form-search form').serialize();
    	var dateFormat = $('.calendar').datepicker('option', 'dateFormat');
		var datepicker_date = $('.calendar').datepicker({ dateFormat: 'yy-mm-dd' }).val();
		//var datepicker_formatted = datepicker_date.replace(/\//g, '-');
		var url = '/search-results?date=' + datepicker_date + '&' + results;
		if(~window.location.href.indexOf('preview')) {
			window.location.href = '//station.locomotive.works/_app/gentle-summer-7034/preview/'+url;
		} else {
			window.location.href = url;
		}
    });

        // Advanced search construct url for cottage page

		$(document).on('click','.product-item-content a', function(e) {			
			e.preventDefault();
			var hash = $(this).attr('href').split('#')[1];
			var datepicker_date = $('.product-calendar').datepicker({ dateFormat: 'yy-mm-dd' }).val();
			var dateFormat = $('.product-calendar').datepicker('option', 'dateFormat');
			var results = $('.form-advanced-search form').serialize();
			var cottageid = ('/cottage?' + 'date=' + datepicker_date + '&' + results + '&#' + hash);
			window.location.href = cottageid;
		});

		
// http://213.187.241.51:3333/cottage#IVY_WO?date=11/02/2016&duration-group=3&field-party-size=1

    if($('.slider-product').length || $('.section-booking').length ) {
		$.ajax({ /* We make our ajax call to get the objects from the search back. */
			url: '//woolacombe.appira.com/index.php?type=get_property&property='+window.location.hash.replace('#',''),
			method: 'GET',
			dataType: 'jsonp',
			success: function(data) {
					$.ajax({
						url: '//woolacombe.appira.com/index.php?type=search_properties_by_location&location='+data.location.code+'&page=1&limit=4',
						method: 'GET',
						dataType: 'jsonp',
						success: function(data) {
							var other_html = '<div class="row">';
							$.each(data.results, function(i, property) {
								other_html += ''
												+'<div class="three columns">'
													+'<div class="product-item">'
														+'<a href="/cottage#'+property.id+'">'
															+'<div class="cottage-image-container"><img onclick="location.reload();" src="'+property.images[0].url+'" height="" width="" alt=""></div>'
															+'<h4 class="">'+property.name+'</h4>'
															+'<h6 class="">'+property.address.town+', '+property.address.county+'<br />Sleeps '+property.accommodates+', Bedrooms: '+property.bedrooms+'<br />£'+property.brands.WO.pricing.ranges['2016'].low+'</h6>'
														+'</a>'
													+'</div><!-- /.product-item -->'
												+'</div><!-- /.three columns -->';
							});
							other_html += '</div>';
							$('.section-body.other-properties').append(other_html);
						}
					});


					if(data.attributes.Comments) $('.cottage-review').text(data.attributes.Comments);
					//$.each(data.comments, function(i, comments) {
					//	$('.cottage-review-header').text(data.comments.name);
					//	$('.cottage-review').text(data.comments.comment);
					//});

					if(!data.specialOffers.length) {
						$('.product-special').css('display','none');
					} else {
						var offerHtml = '';
						data.specialOffers.forEach(function(offer) {
							offerHtml += offer.description+'<br />';
						});
						offerHtml += '<strong>Book now and don’t miss out!</strong>';
						$('.cottage-offer').html(offerHtml);
					}

					var root = '';
					if(~window.location.href.indexOf('preview')) {
						root = '//station.locomotive.works/_app/gentle-summer-7034/preview';
					}

					$('.cottage-title').text(data.name);
					$('.breadcrumb-cottage').text(data.name);
					$('.cottage-town').text(data.address.town);
					$('#populate-by-location').attr('href', root+'/north-devon-holiday-cottages/'+data.address.town.toLowerCase().replace(/ /g, '-')).text(data.address.town+' Holiday Cottages');
					$('.cottage-sleeps').text(data.accommodates);
					$('.cottage-beds').text(data.bedrooms);
					$('.cottage-teaser').text(data.brands.WO.teaser);
					$('.cottage-description-full').html(data.brands.WO.description);
					var cottage_amenity_icon = '<ul class="list-icons">';				
						if(data.attributes['Family orientated']) {
						 cottage_amenity_icon += '<li> <i class="ico-family"></i> <div class="tooltip">Family orientated</div></li>';
						}
						if(data.attributes['Traditional Cottages']) {
						 cottage_amenity_icon += '<li> <i class="ico-traditional"></i> <div class="tooltip">Traditional Cottages</div></li>';
						}
						if(data.attributes['Friday Changeover']) {
						 cottage_amenity_icon += '<li> <i class="ico-friday"></i> <div class="tooltip">Friday Changeover</div></li>';
						}
						if(data.attributes['Walk to the Beach']) {
						 cottage_amenity_icon += '<li> <i class="ico-beach"></i> <div class="tooltip">Walk to the Beach</div></li>';
						}
						if(data.attributes['BBQ area']) {
						 cottage_amenity_icon += '<li> <i class="ico-BBQ"></i> <div class="tooltip">BBQ area</div></li>';
						}
						if(data.attributes['Tranquil Location']) {
						 cottage_amenity_icon += '<li> <i class="ico-tranquil"></i> <div class="tooltip">Tranquil Location</div></li>';
						}
						if(data.attributes['Walk to Amenities']) {
						 cottage_amenity_icon += '<li> <i class="ico-amenities"></i> <div class="tooltip">Walk to Amenities</div></li>';
						}
						if(data.attributes['Rural Views']) {
						 cottage_amenity_icon += '<li> <i class="ico-rural"></i> <div class="tooltip">Tranquil Location</div></li>';
						}
						if(data.attributes['Saturday Changeover']) {
						 cottage_amenity_icon += '<li> <i class="ico-saturday"></i> <div class="tooltip">Saturday Changeover</div></li>';
						}
						if(data.attributes['Pets Welcome']) {
						 cottage_amenity_icon += '<li> <i class="ico-pets"></i> <div class="tooltip">Pets Welcome</div></li>';
						}
						if(data.attributes['Wi-Fi Internet']) {
						 cottage_amenity_icon += '<li> <i class="ico-wifi"></i> <div class="tooltip">Wi-Fi Internet</div></li>';
						}
						if(data.attributes.Luxurious) {
						 cottage_amenity_icon += '<li> <i class="ico-luxury"></i> <div class="tooltip">Luxurious</div></li>';
						}
						if(data.attributes['Sea Views']) {
						 cottage_amenity_icon += '<li> <i class="ico-sea"></i> <div class="tooltip">Sea Views</div></li>';
						}
						if(data.attributes['Disabled Access']) {
						 cottage_amenity_icon += '<li> <i class="ico-disabled"></i> <div class="tooltip">Disabled Access</div></li>';
						}
						if(data.attributes.Horses) {
						 cottage_amenity_icon += '<li> <i class="ico-horses"></i> <div class="tooltip">Horses</div></li>';
						}
						if(data.attributes['Linen Inclusive']) {
						 cottage_amenity_icon += '<li> <i class="ico-linen"></i> <div class="tooltip">Linen Inclusive</div></li>';
						}
					cottage_amenity_icon += '</ul>';
					$('.cottage-icons').append(cottage_amenity_icon);

					function positionTooltips() {
						$('.section-product .list-icons li .tooltip').each(function() {
							if($(window).width() < $(this).offset().left+$(this).outerWidth()) {
								$(this).css('left', -(($(this).offset().left+$(this).outerWidth()) -$(window).width())-25);
							}
						});
					}
				    $(window).resize(positionTooltips);
					positionTooltips();

					// Update facilities icon classes to -dark on booking page
					if ($('.section-booking').length > 0) { 
					    $('ul.list-icons li i').each(function() {
							var iconclass = $(this).attr('class');
							$(this).removeClass();
							$(this).addClass(iconclass +'-dark');
						});
					};
					var cottage_image_thumbs_html = '';
					var cottage_image_html = '';
					$.each(data.images, function(i, image) {
						//if(i==0){ $('.sm-link-pinterest').attr('href','https://pinterest.com/pin/create/button/?url=http://213.187.241.51%3A3333/cottage%23DUK_WO&media=http%3A//wo.api.carltonsoftware.co.uk/image/normal/1000x750/ny2dbc--dukes_garden_view.jpg&description='); };
						if(i==0){ $('.sm-link-pinterest').attr('href','//pinterest.com/pin/create/button/?media=' +image.url+ '&description='+data.brands.WO.teaser+'&url='+location.href); };
						cottage_image_thumbs_html += '<div class="slide-image"><img src="'+image.url+'" height="" width="" alt="'+image.alt+'"></div>';
						cottage_image_html += '<div class="slide-image"><img src="'+image.url+'" height="" width="" alt="'+image.alt+'"></div>';
						$('.cottage-image').html('<img src="'+image.url+'" height="" width="" alt="'+image.alt+'">')
					});


					$('.slider .slides').append(cottage_image_html);
					$('.slider.slider-product-thumbs .slides').append(cottage_image_thumbs_html);

					// init datepicker
					if( $('.product-calendar').length ) {
						$('.product-calendar').datepicker({
							dayNamesMin: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
							firstDay: 1,
							minDate: '+1',
							defaultDate: '+1',
							beforeShowDay: function(date){
								var date_string = jQuery.datepicker.formatDate('yy-mm-dd', date);
								return [data.calendar[date_string].available];
							}
						});
					}

					// init datepicker for the cottage page
					if( $('.product-calendar-cott').length ) {
						$('.product-calendar-cott').datepicker({
							dayNamesMin: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
							firstDay: 1,
							minDate: '+1',
							defaultDate: '+1',
							beforeShowDay: function(date){
								var date_string = jQuery.datepicker.formatDate('yy-mm-dd', date);
								return [data.calendar[date_string].available];
							}
						});
					}

					// Init Map
					if ( $('.product-map').length ) {
						var map;
						var myLat = $('#product-map').data('lat');
						var myLng = $('#product-map').data('lng');
						var center = new google.maps.LatLng(myLat, myLng);

						function initialize() {
							var mapOptions = {
							    zoom: 15,
							    center: center
							};

							map = new google.maps.Map(document.getElementById('product-map'),
						    	mapOptions);
							var geocoder = new google.maps.Geocoder();
						    var address = data.address.addr1 + ' ' + data.address.addr2 + ' ' + data.address.town + ' ' + data.address.county + ' ' + data.address.postcode; 
						    geocoder.geocode( { 'address': address}, function(results, status) {
						      if (status == google.maps.GeocoderStatus.OK) {
						        map.setCenter(results[0].geometry.location);
						        var marker = new google.maps.Marker({
						            map: map,
						            position: results[0].geometry.location
						        });
						      } else {
						        //alert("Geocode was not successful for the following reason: " + status);
						      }
						    });
						}

						google.maps.event.addDomListener(window, 'load', initialize);
						google.maps.event.addDomListener(window, 'resize', initialize);
						initialize();
					}

					$(document).on('click', '.tabs-nav a', function(e) {
						e.preventDefault();
						$('.tabs-body > div').hide();
						$($(this).attr('href')).show();
						$('.tabs-nav li').removeClass('current');
						$(this).parents('li').addClass('current');

						if($(this).attr('href') === '#tab-map' && $('.product-map').length) initialize();
					});

			}
		});
	}
// Icon active toggle search page

	$( ".form-icons .list-icons li" ).click(function() {
		$( this ).toggleClass( "icon-selected" );
	});

// BUZZ
	window.buzz = new Buzz('Woolacombe');

		window.buzz.get_feed(function(data) {
		$.each_ordered(data,function(year){
			$.each_ordered(this,function(month){
				$.each_ordered(this,function(day){
					$.each_ordered(this,function(time){
						$.each(this, function(i) {
							/*console.log (this);*/
							var html = '<div class="feed-item">'
										+'<div class="feed-item-image">'
											+'<a href="">'
												+'<img src="' + (this.full_picture)+'" />'
											//+'<img src="http://" />'
											+'</a>'
										+'</div><!-- /.feed-item-image -->'
										+'<div class="feed-item-content">'
											+'<h4>'
												+''
											+'</h4>'
											+'<p>'+stripslashes(this.text)+'</p>'
											+'<ul class="list-feed-actions">'
												+'<!--<li>'
													+'<a href="#" class="facebook-like">'
														+'<i class="ico-facebook-like"></i>'
														+'<span>Like</span>'
													+'</a>'
												+'</li>'
												+'<li>'
													+'<a href="#" class="facebook-share">Share</a>'
												+'</li-->'
											+'</ul><!-- /.list-feed-actions -->'
										+'</div><!-- /.feed-item-content -->'
									+'</div><!-- /.feed-item -->';
							if(this.type == 'twitter' && $('.feed-twitter .feed-body .feed-item').length < 4) {
								$('.feed-twitter .feed-body').append(html);
								$(".feed-time-image img").attr("src","https://pbs.twimg.com/profile_images/1052205496/woolacombe_20Baggy.jpg");
							} else if ($('.feed-facebook .feed-body .feed-item').length < 3) {
								$('.feed-facebook .feed-body').append(html); 
							}
							});
							$(".feed-twitter .feed-item .feed-item-image img").attr("src","https://pbs.twimg.com/profile_images/1052205496/woolacombe_20Baggy.jpg");
						});
						});
					});
				});
			});

if ($('.hasDatepicker').length > 0) { 
    console.log('date picker loaded')
}
});