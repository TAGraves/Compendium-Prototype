var LP = {
	ajaxRegistration: function () {
	    $('#publishForm').on('submit', function(event){
	    	var $this = $(this);
	        event.preventDefault();
	        if ($("#usernamePick").val() === "") {
	        	$("#register_2 .errors span").remove();
	        	$("#register_2 .errors").prepend("<span>Please enter a username!</span>");
				var bcolor = $("#usernamePick").css("border-color");
				$("#usernamePick").css("border-color","red").one("focus",function() {
					$("#usernamePick").css("border-color", bcolor);
					$("#register_2 .errors span").remove();
				});
	       	} else if ($("#Passwd1").val() === "") {
	        	$("#register_2 .errors span").remove();
	        	$("#register_2 .errors").prepend("<span>Please enter a password!</span>");
				var bcolor = $("#Passwd1").css("border-color");
				$("#Passwd1").css("border-color","red").one("focus",function() {
					$("#Passwd1").css("border-color", bcolor);
					$("#register_2 .errors span").remove();
				});
	       	} else if ($("#Passwd2").val() === "") {
	        	$("#register_2 .errors span").remove();
	        	$("#register_2 .errors").prepend("<span>Please confirm your password!</span>");
				var bcolor = $("#Passwd2").css("border-color");
				$("#Passwd2").css("border-color","red").one("focus",function() {
					$("#Passwd2").css("border-color", bcolor);
					$("#register_2 .errors span").remove();
				});
	       	} else if ($("#Passwd2").val() !== $("#Passwd1").val()) {
	        	$("#register_2 .errors span").remove();
	        	$("#register_2 .errors").prepend("<span>Your passwords don't match!</span>");
				var bcolor = $("#Passwd2").css("border-color");
				$("#Passwd2").css("border-color","red").one("focus",function() {
					$("#Passwd2").css("border-color", bcolor);
					$("#register_2 .errors span").remove();
				});
	       	} else if ($("#email").val() === "") {
	        	$("#register_2 .errors span").remove();
	        	$("#register_2 .errors").prepend("<span>Please enter your email!</span>");
				var bcolor = $("#email").css("border-color");
				$("#email").css("border-color","red").one("focus",function() {
					$("#email").css("border-color", bcolor);
					$("#register_2 .errors span").remove();
				});
	       	} else if ($("#tos").attr("checked") !== "checked") {
	        	$("#register_2 .errors span").remove();
	        	$("#register_2 .errors").prepend("<span>Please check the box to confirm you understand the terms and conditions!</span>");
				var bcolor = $("#tos").css("border-color");
				$("#tos").css("border-color","red").one("change",function() {
					$("#tos").css("border-color", bcolor);
					$("#register_2 .errors span").remove();
				});
	       	} else {
	        	$.post(LP.url, $this.serialize(), function(response) {
	        		/*var $response = $(response);
	        		if ($response.filter('title').text() === "Error") {
	        			$("#register_2 .errors span").remove();
	        			$("#register_2 .errors").prepend("<span>"+$response.find("li").eq(0).text()+"</span>");
	        		} else if ($response.filter('title').text() === "Registration Complete") {
	        			LP.registrationProcess.form2Finish();
	        		} else {
	        			$("#register_2 .errors span").remove();
	        			$("#register_2 .errors").prepend("<span>We're sorry, something went wrong. Please try again.</span>");
	        		}*/
	        		console.log(response);
	        	});
	        }
	        return false;
	    });
	},
	enableScrollable: function () {
		$("#scrollable").scrollable();
		LP.api = $("#scrollable").data("scrollable");
	},
	enableNavigation: function () {
		$("#dd_navigation_register").click(function(e) {
			e.preventDefault();
			LP.api.seekTo(1);
			$(".dd_navigation_active").removeClass("dd_navigation_active");
			$(this).addClass("dd_navigation_active");
			return false;
		});

		$("#dd_navigation_login").click(function(e) {
			e.preventDefault();
			LP.api.seekTo(0);
			$(".dd_navigation_active").removeClass("dd_navigation_active");
			$(this).addClass("dd_navigation_active");
			return false;
		});

		$(".login_problems").click(function(e) {
			e.preventDefault();
			LP.api.seekTo(4);
			return false;
		})
	},
	init: function() {
		LP.ajaxRegistration();
		LP.enableScrollable();
		LP.enableNavigation();
		LP.setUpRegistration();
	},
	setUpRegistration: function () {	
		$("#Registration").keypress(function (e) {
			if (e.which === 45) {
				return false;
			}
		}).keyup(function (e) {
			var $this = $(this),
				value = $this.val();
			if (value.length === 4 && value.match(/-/g) === null) {
				$this.val(value + "-");
			} 
		});

		$("#register_1 input[type='submit']").click(function () {
			var nameCheck = $("#Name").val() != "";
			var rightCodeCheck = $("#rightCode").attr("checked") === "checked";
			if (!nameCheck) {
				$("#register_1 .errors").text("Please input a name!");
				var bcolor = $("#Name").css("border-color");
				$("#Name").css("border-color","red").one("focus",function() {
					$("#Name").css("border-color", bcolor);
				});
			} else {
				var regNumber = $("#Registration").val().replace("-","");
				$.get(LP.url + "login/validateRegistration/"+regNumber, function(response){
					fixedResponse = $.trim(response);
					if (fixedResponse === "true") {
						LP.registrationProcess.form1Finish();
					} else {
						$("#register_1 .errors").text("Registration code not recognized. Please try again. If problems persist, contact your school administrator.");			
						var bcolor = $("#Registration").css("border-color");
						$("#Registration").css("border-color","red").one("focus",function() {
							$("#Registration").css("border-color", bcolor)
						});
					}
				});
			}
			return false;
		});

	},
	registrationProcess: {
		form1Finish: function () {
			//$(".spec1").click(function(e) {
				//e.preventDefault();
	        	$("input[name='first_name']").val($("#Name").val());
				$("#register_2").css("visibility","visible");
				$("input[name='key']").val($("#Registration").val().replace("-",""));
				$("#folder").css("height","481px");/*.effect("size", { 
					to: {
						height: 481
					},
					scale: "content"
				}, function() {*/
					LP.api.seekTo(2);

				//});
				//return false;
			//});
		},
		form2Finish: function () {
				//$("input.special").click(function(e) {
					//e.preventDefault();
					$("#register_2").css("height","320px");
					$("#folder").removeClass("newstuff").css("height","320px");
						LP.api.seekTo(3);
				/*				$("#folder").effect("size", { 
						to: {
							height: 320
						},
						scale: "content"
					}, function() {

					});*/
					//return false;
				//});
		},
		form3Finish: function () {
		//	$(".finish").click(function(e) {
				//e.preventDefault();
				LP.api.seekTo(0);
				$(".dd_navigation_active").removeClass("dd_navigation_active");
				$("#dd_navigation_login").addClass("dd_navigation_active");
		//	});
		}
	},
	url: "http://mycompendium.net/"
};

$(function() {
	LP.init();
})
