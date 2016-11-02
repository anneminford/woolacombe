$(document).ready(function() {

	// set initial state on duration field types
	$("#field-3-days").prop("checked", true);

	// Booking Form back button
	$('a.back').click(function(){
		event.preventDefault();
		parent.history.back();
		return false;
	});

	// Booking Form add new party member
   	$('.copy-member').click(function(){
   		event.preventDefault();
   		var partyCount = $('.party-addition').length + 1;
      	$('.party-addition:first').clone().attr('id', partyCount++).insertAfter($('div.party-addition:last'));
		$( '.party-addition').each(function( index ) {
		  	var changeTitle = $( this ).attr('id');
		  	$(this).find('h4').text('Party Details Member ' + changeTitle);
		  	var partyIndex = $(this).attr('id') - 1;
		  	$(this).find('#firstnameparty').attr('name', 'party['+ partyIndex +']'+'[firstName]');
		  	$(this).find('#titleparty').attr('name', 'party['+ partyIndex +']'+'[title]');
		  	$(this).find('#surnameparty').attr('name', 'party['+ partyIndex +']'+'[surname]');
		  	$(this).find('#partyage').attr('name', 'party['+ partyIndex +']'+'[age]');
		  	$(this).find('#partytype').attr('name', 'party['+ partyIndex +']'+'[type]');
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
                // "party[][title]": {
                // 	required: true,
                // 	do_not_select:'sel'
                // },
                // "party[][firstName]":"required",
                // "party[][surname]":"required",
                // "party[][age]": {
                // 	required:true,
                // 	do_not_select:'sel'
                // },
                // "party[][type]":"required"
                },
                 errorPlacement: function(error, element) {   },
                 messages: {
                // firstname: "Please enter your first name.", CUSTOMISE THE ERRORS IF NECESSARY
                },
                errorContainer: $('#errorContainer'),
               // errorLabelContainer: $('#errorContainer ul'), SHOW THE INDIVIDUAL ERRORS IN LIST
                // wrapper: 'li'

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
	var root = 'http:\/\/' + window.location.host;
	$(".open-search").attr("href", root + '/' + 'search');

	// Overlay basic search construct url for search
	$(document).on('click','.search-by-location-basic',function(e) {
        e.preventDefault();
		var results = $('.form-search form').serialize();
    	var dateFormat = $('.calendar').datepicker('option', 'dateFormat');
		var datepicker_date = $('.calendar').datepicker({ dateFormat: 'yy-mm-dd' }).val();
		var datepicker_formatted = datepicker_date.replace(/\//g, '-');
		var url = '/search-results?date=' + datepicker_formatted + '&' + results;
		window.location.href = url;
    });
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

					$('.cottage-title').text(data.name);
					$('.breadcrumb-cottage').text(data.name);
					$('.cottage-town').text(data.address.town);
					$('.cottage-sleeps').text(data.accommodates);
					$('.cottage-beds').text(data.bedrooms);
					$('.cottage-teaser').text(data.brands.WO.teaser);
					$('.cottage-description-full').html(data.brands.WO.description);
					var cottage_amenity_icon = '<ul class="list-icons">';				
						if(data.attributes['Family orientated']) {
						 cottage_amenity_icon += '<li> <i class="ico-family" title="Family orientated"></i> </li>';
						}
						if(data.attributes['Traditional Cottages']) {
						 cottage_amenity_icon += '<li> <i class="ico-traditional" title="Traditional Cottages"></i> </li>';
						}
						if(data.attributes['Friday Changeover']) {
						 cottage_amenity_icon += '<li> <i class="ico-friday" title="Friday Changeover"></i> </li>';
						}
						if(data.attributes['Walk to the Beach']) {
						 cottage_amenity_icon += '<li> <i class="ico-beach" title="Walk to the Beach"></i> </li>';
						}
						if(data.attributes['BBQ Area']) {
						 cottage_amenity_icon += '<li> <i class="ico-BBQ" title="BBQ Area"></i> </li>';
						}
						if(data.attributes['Tranquil Location']) {
						 cottage_amenity_icon += '<li> <i class="ico-tranquil" title="Tranquil Location"></i> </li>';
						}
						if(data.attributes['Walk to Amenities']) {
						 cottage_amenity_icon += '<li> <i class="ico-amenities" title="Walk to Amenities"></i> </li>';
						}
						if(data.attributes['Rural Views']) {
						 cottage_amenity_icon += '<li> <i class="ico-rural" title="Rural Views"></i> </li>';
						}
						if(data.attributes['Saturday Changeover']) {
						 cottage_amenity_icon += '<li> <i class="ico-saturday" title="Saturday Changeover"></i> </li>';
						}
						if(data.attributes['Pets Welcome']) {
						 cottage_amenity_icon += '<li> <i class="ico-pets" title="Pets Welcome"></i> </li>';
						}
						if(data.attributes['Wi-Fi Internet']) {
						 cottage_amenity_icon += '<li> <i class="ico-wifi" title="Wi-Fi Internet"></i> </li>';
						}
						if(data.attributes.Luxurious) {
						 cottage_amenity_icon += '<li> <i class="ico-luxury" title="Luxurious"></i> </li>';
						}
						if(data.attributes['Sea Views']) {
						 cottage_amenity_icon += '<li> <i class="ico-sea" title="Sea Views"></i> </li>';
						}
						if(data.attributes['Disabled Access']) {
						 cottage_amenity_icon += '<li> <i class="ico-disabled" title="Disabled Access"></i> </li>';
						}
						if(data.attributes.Horses) {
						 cottage_amenity_icon += '<li> <i class="ico-horses" title="Horse riding"></i> </li>';
						}
						if(data.attributes['Linen Inclusive']) {
						 cottage_amenity_icon += '<li> <i class="ico-linen" title="Linen Inclusive"></i> </li>';
						}
					cottage_amenity_icon += '</ul>';
					$('.cottage-icons').append(cottage_amenity_icon);
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
						if(i==0){ $('.sm-link-pinterest').attr('href','http://pinterest.com/pin/create/button/?media=' +image.url+ '&description='+data.brands.WO.teaser+'&url='+location.href); };
						cottage_image_thumbs_html += '<div class="slide-image"><img src="'+image.url+'" height="" width="" alt="'+image.alt+'"></div>';
						cottage_image_html += '<div class="slide-image"><img src="'+image.url+'" height="" width="" alt="'+image.alt+'"></div>';
						$('.cottage-image').html('<img src="'+image.url+'" height="" width="" alt="'+image.alt+'">')
					});


					$('.slider .slides').append(cottage_image_html);
					$('.slider.slider-product-thumbs .slides').append(cottage_image_thumbs_html);


					// Init Map
					if ( $('.product-map').length ) {
						console.log('here');
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
						    console.log('map ok');
						}

						google.maps.event.addDomListener(window, 'load', initialize);
						google.maps.event.addDomListener(window, 'resize', initialize);
						initialize();
					}
					// Tabs
					(function(){
					    // This class will be added to active tab link 
					    // and the content container
					    var activeTabClass = 'current';
					    
					    $('.tabs-nav a').on('click', function(event) {
					        var $tabLink = $(this);
					        var $targetTab = $($tabLink.attr('href'));
					 
					        $tabLink
					            .parent() // go up to the <li> element
					            .add($targetTab)
					            .addClass(activeTabClass)
					                .siblings()
					                .removeClass(activeTabClass);
					        
					        event.preventDefault();

					        initialize();
					        
					    });
					})();
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
							if(this.type == 'twitter' && $('.feed-twitter .feed-body .feed-item').length < 3) {
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
			})
			
});