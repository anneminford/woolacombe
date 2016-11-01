
function reset_focus() {
	$("body, html").animate({ 
        scrollTop: $('.intro-inner').offset().top
    }, 600);
}

function check_facilities(property) {
	$.each(window.facilities, function(k, v) {
		console.log('Facility: ' + v + ' Bool: ' + property.attributes[v]);
		if(property.attributes[v] == false) {
			window.all_facilities = false;
		}
	});
}

function getUrlVar(variable) {
	var result = false;

	window.location.search.substring(1).split('&').forEach(function(param) {
		if(param.split("=")[0]===variable) result=decodeURI(param.split("=")[1]);
	});

	return result;
}
function roll_out_properties(properties) {
	/* Loop through the data, generating a HTML template using data from the object (named v in this case) */
	$('.search-results').fadeOut(function() {
		$('.search-results .product-item').remove();
		$.each(properties, function(i, v) {
			if(window.advanced) {	
				window.all_facilities = true;
				check_facilities(v);
				if(window.all_facilities == false) {
					// Eliminate any without the correct facilities.
					return false;
				}	
			}
			var icon_html = '<ul class="list-icons">';
					
					if(v.attributes['Family orientated']) {
					 icon_html += '<li> <i class="ico-family-dark"></i><div class="tooltip">Family orientated</div></li>';
					}
					if(v.attributes['Traditional Cottages']) {
					 icon_html += '<li> <i class="ico-traditional-dark"></i><div class="tooltip">Traditional Cottages</div></li>';
					}
					if(v.attributes['Friday Changeover']) {
					 icon_html += '<li> <i class="ico-friday-dark"></i><div class="tooltip">Friday Changeover</div></li>';
					}
					if(v.attributes['Walk to the Beach']) {
					 icon_html += '<li> <i class="ico-beach-dark"></i><div class="tooltip">Walk to the Beach</div></li>';
					}
					if(v.attributes['BBQ area']) {
					 icon_html += '<li> <i class="ico-BBQ-dark"></i><div class="tooltip">BBQ area</div></li>';
					}
					if(v.attributes['Tranquil Location']) {
					 icon_html += '<li> <i class="ico-tranquil-dark"></i><div class="tooltip">Tranquil Location</div></li>';
					}
					if(v.attributes['Walk to Amenities']) {
					 icon_html += '<li> <i class="ico-amenities-dark"></i><div class="tooltip">Walk to Amenities</div></li>';
					}
					if(v.attributes['Rural Views']) {
					 icon_html += '<li> <i class="ico-rural-dark"></i><div class="tooltip">Tranquil Location</div></li>';
					}
					if(v.attributes['Saturday Changeover']) {
					 icon_html += '<li> <i class="ico-saturday-dark"></i><div class="tooltip">Saturday Changeover</div></li>';
					}
					if(v.attributes['Pets Welcome']) {
					 icon_html += '<li> <i class="ico-pets-dark"></i><div class="tooltip">Pets Welcome</div></li>';
					}
					if(v.attributes['Wi-Fi Internet']) {
					 icon_html += '<li> <i class="ico-wifi-dark"></i><div class="tooltip">Wi-Fi Internet</div></li>';
					}
					if(v.attributes.Luxurious) {
					 icon_html += '<li> <i class="ico-luxury-dark"></i><div class="tooltip">Luxurious</div></li>';
					}
					if(v.attributes['Sea Views']) {
					 icon_html += '<li> <i class="ico-sea-dark"></i><div class="tooltip">Sea Views</div></li>';
					}
					if(v.attributes['Disabled Access']) {
					 icon_html += '<li> <i class="ico-disabled-dark"></i><div class="tooltip">Disabled Access</div></li>';
					}
					if(v.attributes.Horses) {
					 icon_html += '<li> <i class="ico-horses-dark"></i><div class="tooltip">Horses</div></li>';
					}
					if(v.attributes['Linen Inclusive']) {
					 icon_html += '<li> <i class="ico-linen-dark"></i><div class="tooltip">Linen Inclusive</div></li>';
					}

			icon_html += '</ul>';
					var html = '<div class="product-item">'
		+'<div class="product-item-image test">'
		+'<a href="/cottage#'+v.id+'"> <img src="'+v.images[0].url+'" height="251" width="290" alt=""> </a> </div>'
		+'<!-- /.product-item-image -->'
		+'<div class="product-item-content">'
		  +'<h4>'+v.name+'</h4>'
		  +'<h6>'+v.address.town+'<br />'
		  +'Sleeps: '+v.accommodates+', Bedrooms: '+v.bedrooms+'<br />'
		  +'From £'+v.brands.WO.pricing.ranges['2016'].low+' to £'+v.brands.WO.pricing.ranges['2016'].high+'</h6>'
		  +'<p>'+v.brands.WO.teaser+'</p>'
		  +icon_html
		            +' <a href="/cottage#'+v.id+'" class="button button-black">Viewing &amp; Booking</a> </div>'
		+'<!-- /.product-item-content -->'
		+'</div>';
				$('.search-results').append(html); /* Append the elements to the search results container. */
		});
		reset_focus();
		$('.search-results').fadeIn();
	});
} 	

function rebind_paging() {
	$('.paging .paging-prev').click(function(e) {
		e.preventDefault();
		get_results_by_page(window.current_page-1);
	});

	$('.paging ul li a').click(function(e) {
		e.preventDefault();
		get_results_by_page(Number($(this).text()));
	});

	$('.paging .paging-next').click(function(e) {
		e.preventDefault();
		get_results_by_page(window.current_page+1);
	});
}

function generate_pagination(search_results) {
	window.current_page = search_results.page;
	window.pages = Math.ceil(search_results.totalResults / search_results.pageSize);
	$('.section-paging').fadeOut(function() {
		$('.section-paging .paging').remove();
		var pager = '<div class="paging">';
		if(window.pages > 1 && window.current_page != 1) {
			pager += '<a href="#" class="paging-prev">&lt;</a>';
		}
	    pager += '<ul>';
	    for (var i = 1; i <= window.pages; i++) {
	    	var current = (i == window.current_page ? ' class="current"' : '');
	    	pager += '<li'+current+'><a href="#">'+i+'</a></li>';
	    };
	    pager += '</ul>';
	    if(window.pages > 1 && window.current_page != window.pages) {
	    	pager += '<a href="#" class="paging-next">&gt;</a> </div>';
	    }
	    $('.section-paging').append(pager);
	    $('.section-paging').fadeIn();
	    rebind_paging();
	});
}

function get_results_by_page(page, offers) {
	if(!window.location_code) window.location_code = '';

	var type = 'search_properties_by_location';
	var facilities = '';

	if(window.advanced) type = 'search_properties_by_location_advanced';
	if(!window.facilities) window.facilities = [];

	var data = {
		type: type,
		location: window.location_code,
		page: page
	};

	data.filters = {};
	if(window.location_code) {
		data.filters['location'] = window.location_code;
	} else {
		data.filters['location'] = '';
	}
	if(window.party) data.filters['accommodates'] = '>'+window.party;
	if(window.start) data.filters['fromDate'] = window.start;
	if(window.start) data.filters['nights'] = window.nights;

	if(offers) {
		data.specialOffer = offers;
		data.filters.specialOffer = offers;
	}

	if(window.facilities) {
		window.facilities.forEach(function(facility) {
			if(facility) data.filters[facility]='true';
		});
	}

	if(window.searchId) data.searchId = window.searchId;

	$.ajax({ /* We make our ajax call to get the objects from the search back. */
		url: '//woolacombe.appira.com/index.php',
		method: 'GET',
		dataType: 'jsonp',
		data: data,
		success: function(data) {
			window.searchId = data.searchId;

			if(data.results) { /* Check it returned some results for us to loop over. */
				roll_out_properties(data.results);
				generate_pagination(data);
			}
		}
	});
}

;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		var offers = false;
		if($('.search-results.search-by-offers').length) offers = true;

		/* Property filtering */
		if(($('.search-results.search-by-location').length || offers)) { /* We are just checking we only run this on the right pages. */
			window.start = getUrlVar('date');
			window.nights = getUrlVar('duration');
			window.party = getUrlVar('partysizemax');
			window.facilities = [getUrlVar('facility')];
			if(window.start || window.nights || window.party || window.facilities) window.advanced = true;

			get_results_by_page(1, offers);
			window.advanced = false;

			$('#no-size').change(function(){
			    if ($('#no-size').is(':checked') == true){
			      $('#field-party-size').val('').prop('disabled', true);
			   } else {
			     $('#field-party-size').val('1').prop('disabled', false);
			   }
			});

			// overlay search
			$('body').on('change', '#no-size-popup', function(e) {
				    e.preventDefault();		    
	 		    if ($('#no-size-popup').is(':checked') == true){
	 			      $('.list-radios-secondary input').val('').prop('disabled', true).attr('checked', false);
			      $('.list-radios-secondary label').addClass('fadeRadio');
			   }  else {
	 		     $('.list-radios-secondary input').val('1').prop('disabled', false);
			     $('.list-radios-secondary label').removeClass('fadeRadio');
			   };
			});

			$('.search-by-location-advanced').click(function(e) {
				e.preventDefault();
				var params = '';
				var datepicker_date = $('.product-calendar').datepicker('getDate');
				var datepicker_length = $('.form-advanced-search input:radio[name="duration-group"]:checked').val();
				var party = $('.form-advanced-search input[name=field-party-size]').val();
				var type = $('.form-advanced-search select').val();
				var facilities = [];
				$('.form-advanced-search .list-icons li.icon-selected').each(function() {
					facilities.push($('span', this).data('id'));
				});
				window.advanced = true;
				window.start = ("0" + datepicker_date.getDate()).slice(-2) + "-" + ("0"+(datepicker_date.getMonth()+1)).slice(-2) + "-" + datepicker_date.getFullYear();
				window.nights = datepicker_length;
				window.party = party;
				window.type = type;
				window.facilities = facilities;
				get_results_by_page(1, offers);
			});
		}

		/* Highly Esteemed Properties (homepage) */
		if($('.highly-esteemed-cottages').length) {
			$('.highly-esteemed-cottages').each(function(i) {
				var elem = $(this);
				var id = $(this).attr('data-id');
				$.ajax({ /* We make our ajax call to get the objects from the search back. */
					url: '//woolacombe.appira.com/index.php?type=get_property&property='+id,
					method: 'GET',
					dataType: 'jsonp',
					success: function(data) {
						var dom = '<div class="row">'
+'									<div class="six columns">'
+'										<div class="section-image">'
+'											<a href="/cottage#'+data.id+'" style="background-image: url('+data.images[0].url.replace("http:", "")+')">'
//+'												<img src="'+data.images[0].url.replace("http:", "")+'" height="251" width="290" alt="">'
+'											</a>'
+'										</div><!-- /.section-image -->'
+'									</div><!-- /.six columns -->'
+'									'
+'									<div class="six columns">'
+'										<div class="section-entry">'
+'											<h4><a href="/cottage#'+data.id+'">'+data.name+'</a></h4>'
+'											<h6>'+data.address.town+', '+data.address.county+'<br />Sleeps '+data.accommodates+', Bedrooms: '+data.bedrooms+'<br />£'+data.brands.WO.pricing.ranges['2016'].low+'</h6>'
+'											<p>'+data.brands.WO.teaser+'</p>'
+'											<ul class="list-icons">';
											if(data.attributes['Family orientated']) {
											 dom += '<li class="atest"> <i class="ico-family-dark"></i><div class="tooltip">Family orientated</div></li>';
											}
											if(data.attributes['Traditional Cottages']) {
											 dom += '<li> <i class="ico-traditional-dark"></i><div class="tooltip">Traditional Cottages</div> </li>';
											}
											if(data.attributes['Friday Changeover']) {
											 dom += '<li> <i class="ico-friday-dark"></i><div class="tooltip">Friday Changeover</div> </li>';
											}
											if(data.attributes['Walk to the Beach']) {
											 dom += '<li> <i class="ico-beach-dark"></i><div class="tooltip">Walk to the Beach</div> </li>';
											}
											if(data.attributes['BBQ area']) {
											 dom += '<li> <i class="ico-BBQ-dark"></i><div class="tooltip">BBQ area</div> </li>';
											}
											if(data.attributes['Tranquil Location']) {
											 dom += '<li> <i class="ico-tranquil-dark"></i><div class="tooltip">Tranquil Location</div> </li>';
											}
											if(data.attributes['Walk to Amenities']) {
											 dom += '<li> <i class="ico-amenities-dark"></i><div class="tooltip">Walk to Amenities</div> </li>';
											}
											if(data.attributes['Rural Views']) {
											 dom += '<li> <i class="ico-rural-dark"></i><div class="tooltip">Rural Views</div> </li>';
											}
											if(data.attributes['Saturday Changeover']) {
											 dom += '<li> <i class="ico-saturday-dark"></i><div class="tooltip">Saturday Changeover</div> </li>';
											}
											if(data.attributes['Pets Welcome']) {
											 dom += '<li> <i class="ico-pets-dark"></i><div class="tooltip">Pets Welcome</div> </li>';
											}
											if(data.attributes['Wi-Fi Internet']) {
											 dom += '<li> <i class="ico-wifi-dark"></i><div class="tooltip">Wi-Fi Internet</div> </li>';
											}
											if(data.attributes.Luxurious) {
											 dom += '<li> <i class="ico-luxury-dark"></i><div class="tooltip">Luxurious</div> </li>';
											}
											if(data.attributes['Sea Views']) {
											 dom += '<li> <i class="ico-sea-dark"></i><div class="tooltip">Sea views</div> </li>';
											}
											if(data.attributes['Disabled Access']) {
											 dom += '<li> <i class="ico-disabled-dark"></i><div class="tooltip">Disabled Access</div> </li>';
											}
											if(data.attributes.Horses) {
											 dom += '<li> <i class="ico-horses-dark"></i><div class="tooltip">Horses</div> </li>';
											}
											if(data.attributes['Linen Inclusive']) {
											 dom += '<li> <i class="ico-linen-dark"></i><div class="tooltip">Linen Inclusive</div> </li>';
											}
											dom += '</ul>'
+'										</div><!-- /.section-entry -->'
+'									</div><!-- /.six columns -->'
+'								</div><!-- /.row -->';
						$(elem).html(dom);
					}
				});
			});
		}

		// Clone Product Overview
		if( $('.product-overview').length ) {
			$('.product-overview').clone().addClass('product-overview-cloned').insertAfter('.slider-product-thumbs');

			$('.product-overview-cloned input').each(function() {
				$(this).attr('id', $(this).attr('id') + '-cloned');
				$(this).attr('name', $(this).attr('name') + '-cloned');
			});

			$('.product-overview-cloned label').each(function() {
				$(this).attr('for', $(this).attr('for') + '-cloned');
			});
		}

		$win.on('load', function() {
			// Init Sliders
			if( $('.slider').length ) {
				$('.slider-product .owl-carousel').owlCarousel({
					items: 1,
					smartSpeed: 300,
					autoHeight: true,
					mouseDrag: false,
					touchDrag: false,
					pullDrag: false,
					freeDrag: false,
				});

				$('.slider-product-thumbs .owl-carousel').owlCarousel({
					responsive: {
						0: {
							items: 7
						},
						750: {
							items: 9
						},
						1000: {
							items: 7
						},
						1600: {
							items: 12
						}
					},
					nav: true,
					loop: true,
					autoHeight: true,
					smartSpeed: 500,
					onInitialized: function(event) {
						var $carousel = $(event.target);

						$carousel.find('.owl-item').on('click', function() {
							var idx = $(this).index() - $(this).prevAll('.cloned').length;

							$(this).addClass('current').siblings().removeClass('current');
							$('.slider-product .owl-carousel').trigger('to.owl.carousel', [idx, 500]);
						});
					}
				});
			}
		});

		// Toggle Share Dropdown
		$('.share-btn').on('click', function(event) {
			event.preventDefault();

			$(this).next().toggleClass('active');
		});

		// Toggle Mobile Navigation
		$('.nav-button').on('click', function(event) {
			event.preventDefault();

			$('.nav-mobile').toggleClass('active');
		});

		// Init Select
		if( $('.select').length ) {
			$('.select').dropdown();

			$('.fs-dropdown-selected').on('click', function() {
				$(this).parent().removeClass('fs-dropdown-bottom');
			});
		}

		// Init Search Popup
		if( $('.open-search').length ) {
			$('.open-search').magnificPopup({
				type: 'ajax',
				mainClass: 'mfp-green',
				alignTop: true,
				callbacks: {
					ajaxContentAdded: function() {
						$('.nav-mobile').removeClass('active');
						
						$('.close-popup').on('click', function(event) {
							event.preventDefault();

							$.magnificPopup.close();
						});

						// Init Datepicker
						$('.form-search .calendar').datepicker({
							dayNamesMin: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
							firstDay: 1,
							minDate: '+1',
							defaultDate: '+1'
						});
					}				
				}
			});
		}

		// Advanced Search Toggler
		if( $('.toggle-search').length ) {
			var $searchBtn = $('.toggle-search');
			var isActive = false;
			var top = $searchBtn.closest('.section-sidebar').offset().top - 30;

			$searchBtn.text( $searchBtn.data('closed-text') );

			$searchBtn.on('click', function(event) {
				event.preventDefault();

				if( !isActive ) {
					var txt = $(this).data('opened-text');
					$(this).text(txt);
					isActive = true;
				} else {
					var txt = $(this).data('closed-text');
					$(this).text(txt);
					isActive = false;
				}

				$('.section-product-listing-alt .section-sidebar-body').slideToggle(300);
				$('body, html').animate({
					'scrollTop': top
				}, 300);
			});
		}

		// Placeholders
		$.fn.doPlaceholders = function() {
		    if ($.support.placeholder) {
		        return this;
		    }
		 
		    var $fields = this.filter(function () {
		        // Don't re-initialize
		        return !$(this).data('didPlaceholders');
		    });
		 
		    $fields.on('focus blur', function(event) {
		        var placeholder = this.getAttribute('placeholder');
		 
		        if (event.type === 'focus' && placeholder === this.value) {
		            this.value = '';
		        } else if (event.type === 'blur' && this.value === '') {
		            this.value = placeholder;
		        }
		    });
		 
		    // Set the initial value to the title
		    $fields.each(function() {
		        if (this.value === '') {
		            this.value = this.getAttribute('placeholder');
		        }
		    });
		 
		    // Mark the fields as initialized
		    $fields.data('didPlaceholders', true);
		 
		    // Alllow
		    return $fields;
		};
		 
		$.support.placeholder = (function() {
		    return 'placeholder' in document.createElement('input');
		})();
		 
		/* Don't select elements if placeholder is natively supported*/
		if (!$.support.placeholder) {
		    $('input[placeholder], textarea[placeholder]').doPlaceholders();
		}	
		
		

		function getBookingSelection() {
			if(!$('.product-calendar:last').datepicker('getDate')) return false;
			var datepicker_date = $('.product-calendar:last').datepicker('getDate');
			var $radios = $('.list-radios .radio');

			// 1 = Monday
			// 2 = Tuesday
			// 5 = Friday
			// 6 = Saturday
			var day_number = datepicker_date.getDay();
			// disable 4 nights if it's not a Monday or Tuesday
			if(day_number !== 1 && day_number !== 2) {
				$radios.find('[name="duration-group"][value="4"]').removeAttr('data-checked').prop('disabled', true);
			} else {
				$radios.find('[name="duration-group"][value="4"]').prop('disabled', false);
			}
			// disable 3 nights if it's not a Friday or Saturday
			if(day_number !== 5 && day_number !== 6) {
				$radios.find('[name="duration-group"][value="3"]').removeAttr('data-checked').prop('disabled', true);
			} else {
				$radios.find('[name="duration-group"][value="3"]').prop('disabled', false);
			}

			// make sure an options selected that isn't disabled
			if(!$radios.find('[name="duration-group"][data-checked="checked"]').length) {
				$radios.find('[name="duration-group"]').each(function() {
					if(!$(this).attr('disabled')) {
						$(this).attr('data-checked', 'checked');
						return false;
					}
				});
			}

			var datepicker_date_two = $('.product-calendar:last').datepicker('getDate');
			var days = (+$radios.find('[name="duration-group"][data-checked="checked"]:first').val());
			var toDate = new Date(datepicker_date_two.setDate(datepicker_date_two.getDate() + days));

			return {
				from_date: datepicker_date.getFullYear() + "-" + ("0"+(datepicker_date.getMonth()+1)).slice(-2) + "-" + ("0" + datepicker_date.getDate()).slice(-2),
				to_date: toDate.getFullYear() + "-" + ("0"+(toDate.getMonth()+1)).slice(-2) + "-" + ("0" + (toDate.getDate())).slice(-2),
				party: $('#field-party-size').val(),
				pets: 0,
				property: window.location.hash.replace('#',''),
				brand_code: 'WO'
			}
		}

		function bookingEnquiry() {
			var data = getBookingSelection();
			if(!data) {
				$('.booking-price').text('£0.00');
				$('.product-overview-foot button').attr('disabled', true);
				$('.button-orange').text('Contact us for a quote');
				$('.error').html('Select an available date to see pricing.').show();
				return false;
			};
			
			data.type = 'booking_enquiry';

			$.ajax({
				url: '//woolacombe.appira.com/index.php',
				method: 'GET',
				dataType: 'jsonp',
				data: data,
				success: function(data) {
					$('.product-overview-foot button').removeAttr('disabled');
					$('.error').hide();

					if(data.errorCode) {
						$('.product-overview-foot button').attr('disabled', true);
						$('.booking-price').css('display', 'none');
						$('.button-orange').text('Contact us for a quote');
						return $('.error').html(data.errorDescription).show().text('Contact us for a quote'); 
					};
					$('.button-orange').text('Book now');
					$('.booking-price').css('display', 'block');
					$('.booking-price').text('£'+data.price.totalPrice);
				}
			});
		}

		if($('.product-overview-body').length) {
			bookingEnquiry();
			$('#field-party-size').keyup(bookingEnquiry);

			$('.product-overview-body input[type="radio"]').click(function() {
				$('.product-overview-body input[type="radio"]').removeAttr('data-checked');
				$(this).attr('data-checked', 'checked');
			});

			$('.product-overview-body input[type="radio"]').click(bookingEnquiry);
			$('.product-overview-body .product-calendar').change(bookingEnquiry);
		}

		$('.product-overview-foot button').click(function(e) {
			e.preventDefault();
			var data = getBookingSelection();
			data.type = 'create_booking';

			$.ajax({
				url: '//woolacombe.appira.com/index.php',
				method: 'GET',
				dataType: 'jsonp',
				data: data,
				success: function(data) {
					if(data.errorCode) {
						$('.product-overview-foot button').attr('disabled', true);
						return $('.error').html(data.errorDescription).show();
					}

					if(~window.location.href.indexOf('preview')) {
						window.location.href = '//station.locomotive.works/_app/gentle-summer-7034/preview/booking-stage-1?booking='+data.bookingId+window.location.hash;
					} else {
						window.location.href = '/booking-stage-1?booking='+data.bookingId+window.location.hash;
					}

				}
			});
		});

		if(getUrlVar('booking')) {
			(function() {
				$.ajax({
					url: '//woolacombe.appira.com/index.php',
					method: 'GET',
					dataType: 'jsonp',
					data: {
						type: 'get_booking',
						booking: getUrlVar('booking')
					},
					success: function(data) {
						if(data.price) $('.total span').html('£'+data.price.totalPrice);
						if(data.fromDate && data.toDate) {
							$('.date span').html(data.fromDate+' to '+data.toDate);
							if($('.duration').length) $('.duration span').html(Math.round((new Date(data.toDate)-new Date(data.fromDate))/(1000*60*60*24)));
						} else {
							$('.date').hide();
						}
					}
				});
			})();
		}

		$('#register-form').submit(function(e) {
			e.preventDefault();

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
						return $('#register-form .form-actions .button-green').after('<p class="error">'+data.errorDescription+'</p>');
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
								return $('#register-form .form-actions .button-green').after('<p class="error">'+data.errorDescription+'</p>');
							}

							window.location.href = data.redirect;
						}
					});
				}
			});
		});

		$('.fbsharelink').click(function(e) {
			e.preventDefault();
			window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(window.location.href)+'&t='+document.title, 'Facebook Share', 'height=400,width=600');
		});

		$('.plussharelink').click(function(e) {
			e.preventDefault();
			window.open('https://plus.google.com/share?url='+encodeURIComponent(window.location.href)+'&t='+document.title, 'Google Plus Share', 'height=400,width=600');
		});

		$('.twittersharelink').click(function(e) {
			e.preventDefault();
			window.open('http://twitter.com/share?url='+encodeURIComponent(window.location.href), 'Twitter Share', 'height=400,width=600');
		});

		$('.pinterestsharelink').click(function(e) {
			e.preventDefault();
			window.open('http://pinterest.com/pin/create/button/?url='+encodeURIComponent(window.location.href)+'&media='+encodeURIComponent($('.main img:first').attr('src')), 'Pinterest Share', 'height=400,width=600');
		});

		function navWidths() {
			$('.nav li > ul').each(function() {
				if($(this).parents('.container').offset().left-30>1) $(this).css('left', -$(this).parents('.container').offset().left-30);
				$(this).outerWidth($(window).width());
			});

			$('.nav-mobile .locations-nav').css('height', $(window).height()-280);
		}

		$(window).resize(navWidths);
		navWidths();

		$('.nav-mobile .has-drop a').click(function(e) {
			e.preventDefault();
			$('.nav-mobile ul').hide();
			$('.nav-mobile .locations-nav').show();
		});

		$('.nav-mobile .locations-nav .back').click(function(e) {
			e.preventDefault();
			$('.nav-mobile .locations-nav').hide();
			$('.nav-mobile ul:first').show();
		});

		if( $('.form-advanced-search .product-calendar').length ) {
			$('.product-calendar').datepicker({
				dayNamesMin: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
				firstDay: 1,
				minDate: '+1',
				defaultDate: '+1'
			});
		}

	});
})(jQuery, window, document);
