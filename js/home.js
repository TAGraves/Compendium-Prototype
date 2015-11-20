( function () {
	"use strict";
	var cp = {

		init: function () {
			/*cp.loading( function () {
				window.clearInterval(window.intervall);
				$( "#chalkboard_meter_number" ).css( "visibility" , "hidden" ).css( "width" , "0px" );
				$( "#chalkboard_level_banner" ).fadeTo( 1000 , 0 , function () {
					$( "#chalkboard_level_banner" ).css( "background-image" , "url(images/chalkboard_level_banner.png)" ).fadeTo( 1000 , 100 , function () {
					 	$( "#detail_display" ).show( "slide" , {
					 		direction: "right"
					 	}, 1000 , function () {
					 		$(this).effect("bounce", {
					 			direction: "right",
					 			distance: 300,
					 			times: 3
					 		}, 1000, function () {

				cp.setupProgressBars.setUpAllBars();
				cp.meterOpening();
				cp.sideMenuClickSetup();
					 		});
					 	} );
					 } );
				});
			} );*/
			cp.setupProgressBars.setUpAllBars();
			cp.meterOpening();
			cp.sideMenuClickSetup();
		},

		loading: function ( callback ) {
			window.setTimeout( callback , 3000 );
			window.intervall = window.setInterval( function () {
				$( "#chalkboard_meter_number" ).css( "visibility" , "visible" ).css("width", $( "#chalkboard_meter_number" ).width() + 39 );
			}, 300 );
		},

		meterOpening: function (callback , optional ) {
			if ( optional === true ) {
				$( "#ol_meter_number, .lb_meter span" ).css( 'visibility' , 'visible' ).hide().show( "blind" , {
					direction: "horizontal", 
					mode: "show"
				} , 2500 , callback );
			} else {
				$( "#chalkboard_meter_number, #ol_meter_number, .lb_meter span" ).css( 'visibility' , 'visible' ).hide().show( "blind" , {
					direction: "horizontal", 
					mode: "show"
				} , 2500 , callback );
				$( "#chalkboard_level_display" ).css( 'visibility' , 'visible' ).hide().show( "puff" , 2000);//fadeIn( 3000 , callback );
			}
		},

		replaceContent: function ( newCategory ) {
				var cacheSelector = $( "#detailed_progress" );
				cacheSelector.hide( "slide" , { direction: "left" }, 1000 , function () {
					cacheSelector.find( "*" ).remove();
					//cacheSelector.load( "pages/" + newCategory + ".html" , function () {
					if (newCategory !== "Math") {
					cacheSelector.html('<div class="dp_category_text" id="dp_category_math">Math</div> <div id="overall_level"> <div id="overall_level_text">My Math Level</div> <div id="overall_level_display"> <div id="overall_level_number">5</div> <div id="overall_level_meter"><span id="ol_meter_number">30</span>%</div> </div> <div id="overall_level_subtext"> <div class="ols" id="ols_level">I have <span class="level_number">gained .5</span> levels this year.</div> <div class="ols" id="ols_goal">I should be <span class="level_number">level 6</span> by the end of the year</div> <div class="ols" id="ols_gain">I should <span class="level_number">gain .7 more</span> levels this year.</div> </div> <div id="overall_level_details"> <a href="#" id="ol_details_button">Details</a> </div> </div> <div id="level_breakdown"> <div class="lb_category" id="lb_rcomprehension"> <div class="data_column"> <div class="lb_text" id="rcomprehension_text">Arithmetic</div> <div class="lb_ltext">Level</div> <div class="lb_display" id="rcomprehension_display"> <div class="lb_percent" id="rcomprehension_percent">70%</div> <div class="lb_meter" id="rcomprehension_meter"><span id="rcomprehension_meter_number"></span></div> <div class="lb_number" id="rcomprehension_number">5</div> </div> </div> <div class="lb_details" id="rcomprehension_details"> <a href="#" id="rcomprehension_details_button">Details</a> </div> </div> <div class="lb_category" id="lb_rengagement"> <div class="data_column"> <div class="lb_text" id="rengagement_text">Geometry</div> <div class="lb_ltext">Level</div> <div class="lb_display" id="rengagement_display"> <div class="lb_percent" id="rengagement_percent">90%</div> <div class="lb_meter" id="rengagement_meter"><span id="rengagement_meter_number"></span></div> <div class="lb_number" id="rengagement_number">4</div> </div> </div> <div class="lb_details" id="rengagement_details"> <a href="#" id="rengagement_details_button">Details</a> </div> </div> <div class="lb_category" id="lb_rfluency"> <div class="data_column"> <div class="lb_text" id="rfluency_text">Something</div> <div class="lb_ltext">Level</div> <div class="lb_display" id="rfluency_display"> <div class="lb_percent" id="rfluency_percent">50%</div> <div class="lb_meter" id="rfluency_meter"><span id="rfluency_meter_number"></span></div> <div class="lb_number" id="rfluency_number">5</div> </div> </div> <div class="lb_details" id="rfluency_details"> <a href="#" id="rfluency_details_button">Details</a> </div> </div> </div>');	 }
					else {
								cacheSelector.html('<div class="dp_category_text" id="dp_category_reading">Reading</div> <div id="overall_level"> <div id="overall_level_text">My Reading Level</div> <div id="overall_level_display"> <div id="overall_level_number">4</div> <div id="overall_level_meter"><span id="ol_meter_number">70</span>%</div> </div> <div id="overall_level_subtext"> <div class="ols" id="ols_level">I have <span class="level_number">gained 1</span> level this year.</div> <div class="ols" id="ols_goal">I should be <span class="level_number">level 6</span> by the end of the year</div> <div class="ols" id="ols_gain">I should <span class="level_number">gain 1.5 more</span> levels this year.</div> </div> <div id="overall_level_details"> <a href="#" id="ol_details_button">Details</a> </div> </div> <div id="level_breakdown"> <div class="lb_category" id="lb_rcomprehension"> <div class="data_column"> <div class="lb_text" id="rcomprehension_text">Comprehension</div> <div class="lb_ltext">Level</div> <div class="lb_display" id="rcomprehension_display"> <div class="lb_percent" id="rcomprehension_percent">70%</div> <div class="lb_meter" id="rcomprehension_meter"><span id="rcomprehension_meter_number"></span></div> <div class="lb_number" id="rcomprehension_number">5</div> </div> </div> <div class="lb_details" id="rcomprehension_details"> <a href="#" id="rcomprehension_details_button">Details</a> </div> </div> <div class="lb_category" id="lb_rengagement"> <div class="data_column"> <div class="lb_text" id="rengagement_text">Engagement</div> <div class="lb_ltext">Level</div> <div class="lb_display low_level" id="rengagement_display"> <div class="lb_percent" id="rengagement_percent">30%</div> <div class="lb_meter" id="rengagement_meter"><span id="rengagement_meter_number"></span></div> <div class="lb_number" id="rengagement_number">3</div> </div> </div> <div class="lb_details" id="rengagement_details"> <a class="low_level" href="#" id="rengagement_details_button">Details</a> </div> </div> <div class="lb_category" id="lb_rfluency"> <div class="data_column"> <div class="lb_text" id="rfluency_text">Fluency</div> <div class="lb_ltext">Level</div> <div class="lb_display" id="rfluency_display"> <div class="lb_percent" id="rfluency_percent">99%</div> <div class="lb_meter" id="rfluency_meter"><span id="rfluency_meter_number"></span></div> <div class="lb_number" id="rfluency_number">4</div> </div> </div> <div class="lb_details" id="rfluency_details"> <a href="#" id="rfluency_details_button">Details</a> </div> </div> </div>');
					}
					$( ".lb_meter span, #ol_meter_number" ).css( "visibility" , "hidden" );
						cacheSelector.show( "slide" , { direction: "right" }, 1000 , function () {
							cp.setupProgressBars.subBars();
							cp.meterOpening( function () {}, true );
						} );
					//} );
				} );
		},

		setupProgressBars: {
			
			chalkBar: function () {
				var totalLength = 395,
					element = $( "#chalkboard_meter_number" ),
					percentage = ( parseInt( element.text() ) / 100 ),
					fillLength = totalLength * percentage;
				
				element.css( "width" , fillLength + "px");

			},
			
			overallBar: function () {
				var totalLength = 435,
					element = $( "#ol_meter_number" ),
					percentage = ( parseInt( element.text() ) / 100 ),
					fillLength = totalLength * percentage;
				
				element.css( "width" , fillLength + "px");
			},

			setUpAllBars: function () {
				cp.setupProgressBars.chalkBar();
				cp.setupProgressBars.overallBar();
				cp.setupProgressBars.subBars();
			},

			subBars: function () {
				$( ".lb_meter span" ).each( function () {				
					var totalLength = 334,
						element = $( this ),
						percentage = ( parseInt( element.parent().prev().text().replace( "%" , "" ) ) / 100 ),
						fillLength = totalLength * percentage;
				
					element.css( "width" , fillLength + "px");
				} )
			}
		},

		sideMenuClickSetup: function () {
			$( ".pn_item_active .progress_navigation_selections" ).show();

			$( ".pn_item a" ).click( function () {
				var $this = $( this );
				$( ".pn_item_active" ).removeClass( "pn_item_active" ).find( ".progress_navigation_selections" ).slideUp( 200 , function () {
					$this.parent().find( ".progress_navigation_selections" ).slideDown( 400 );
				} );
				$this.parent().addClass( "pn_item_active" );
				return false;
			} );

			$( ".progress_navigation_selections a" ).unbind( "click" ).click( function () {
				var $this = $( this );
				$( ".pn_selections_active" ).removeClass( "pn_selections_active" );
				$this.addClass(" pn_selections_active" );
				cp.replaceContent( $this.find( "span" ).text().toLowerCase() );
				return false;
			} );
		}

	};

	$( function () {
		window.setTimeout( cp.init , 1000 );
		$("#dd_navigation_goals").click( function () {
			$(".dd_navigation_active").removeClass("dd_navigation_active");
			$(this).addClass("dd_navigation_active");
			$("#track_progress").hide("slide", 1000, function () {
				$(this).css("background-image","url(images/track_objectives.png)").show("slide");
			});
		} );
		$("#dd_navigation_development").click( function () {
			$(".dd_navigation_active").removeClass("dd_navigation_active");
			$(this).addClass("dd_navigation_active");
			$("#track_progress").hide("slide", 1000, function () {
				$(this).css("background-image","url(images/track_progress.png)").show("slide");
			});
		} );
	} );
} () );