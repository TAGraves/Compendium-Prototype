$(function () {
	var error = function (ele,txt,fn) {
		$('.serror').hide();
		ele.text(txt).show();
		fn();
	};
	$('.sign_in').click(function (e) {
		e.preventDefault();
		if (!$(this).hasClass('active_tab')) {
			$('.active_tab').removeClass('active_tab');
			$(this).addClass('active_tab');
			$('.box_option').hide();
			$('.login').show();
		}
		return false;
	});

	$('.sign_up').click(function (e) {
		e.preventDefault();
		if (!$(this).hasClass('active_tab')) {
			$('.active_tab').removeClass('active_tab');
			$(this).addClass('active_tab');
			$('.box_option').hide();
			$('.register_1').show();
		}
		return false;
	});

	$('.code_box, .my_code').click(function () {
		if ($('.checkmark').hasClass('checked')) {
			$('.checkmark').removeClass('checked');
		} else {
			$('.checkmark').addClass('checked');
		$('.unchecker').removeClass('error');
		}
	});

	$('.login_submit').click(function (e) {
		e.preventDefault();
		if ($('.username input').val() === "") {
			error($('.username input').prev(),'Please enter your username',function () {
				$('.username input').addClass('error');
			});
		} else if ($('.password input').val() === "") {
			error($('.password input').prev(),'Please enter your password',function () {
				$('.password input').addClass('error');
			});
		} else {
			$('#sign_in_form').submit();
		}
	})

	$('.registration_1').click(function (e) {
		e.preventDefault();
		if ($('.registration_code input').val() === "") {
			error($('.registration_code input').prev(),'Please enter a registration code!',function () {
				$('.registration_code input').addClass('error');
			});
		} else if (!$('.checkmark').hasClass('checked')) {
			error($('.code_box_error'),'Please check the box to confirm your registration code!', function () {
				$('.unchecker').addClass('error');
			});
		} else {
			var regNumber = $('.registration_code input').val();
			$.getJSON("http://mycompendium.net/login/prepareRegistration/FROM/"+regNumber, function(response){
				if(response.error) {
					error($('.registration_code input').prev(),response.error,function () {
						$('.registration_code input').addClass('error');
					});
				} else {	        	
					$("input[name='first_name']").val(response.first_name);
					$("input[name='last_name']").val(response.last_name);
					$("input[name='profile_id']").val(response.id);
					$("input[name='key']").val(regNumber);
					$("input[name='email']").val(response.id.replace(/ /g,'_') + "@mycompendium.net");
					$('.sign_in').unbind('click');
					$('.box_option').hide();
					$('.register_2').show();
				}
			});
		}
		return false;
	});

	$('#publishForm').ajaxForm(function(respo) {
		if (typeof respo === "string") {
			var response = $.parseJSON(respo);
		} else {
			var response = respo;
		}
		if (response.success == true) {
			window.location.href = "http://mycompendium.net/";
		} else {
			var err = $(response.error).find('li').eq(0).text();
			if (err.match(/password/) !== null) {
				error($('.pick_password_1').prev(), err, function () {
					$('.pick_password_1').addClass('error');
				});
			} else if (err.match(/username/) !== null) {
				error($('.pick_username input').prev(), err, function () {
					$('.pick_username input').addClass('error');
				});
			} else if (err.match(/email/) !== null) {
				error($('.pick_username input').prev(), "Your registration key has already been used.", function () {});
			} else {
				alert(err);
				window.location.reload(true);
			}

		}
    });

	$('.registration_2').click(function (e) {
		e.preventDefault();
		if ($('.pick_username input').val() === "") {
			error($('.pick_username input').prev(),'Please choose a username!',function () {
				$('.pick_username input').addClass('error');
			});
		}  else if ($('.pick_password_1 input').val() === "") {
			error($('.pick_password_1').prev(),'Please choose a password!',function () {
				$('.pick_password_1 input').addClass('error');
			});
		}  else if ($('.pick_password_2 input').val() === "") {
			error($('.pick_password_1').prev(),'Please confirm your password!',function () {
				$('.pick_password_2 input').addClass('error');
			});
		}  else if ($('.pick_password_1 input').val() !== $('.pick_password_2 input').val()) {
			error($('.pick_password_1').prev(),'Your passwords didn\'t match!',function () {
				$('.pick_password_2 input').addClass('error');
			});
		} else {
			$('#publishForm').submit();
		}
		return false;
	})

	$('input').keyup(function (){
		$(this).removeClass('error');
	});
	
	$(window).keyup(function (e) {
		if ($('.code_box').is(e.target) && e.keyCode !== 9) {
			$('.code_box').click();
		} else if (e.keyCode === 13) {
			$('.submit a:visible').click();
		}
	});

	$('.login input[name="username"]').focus();
});