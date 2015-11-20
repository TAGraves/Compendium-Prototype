$(function () {

	var createCookie = function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};


	var firstFn = function (e) {
		e.preventDefault();
		$('section.school_selection').show();
		$('a.schoolpicker').unbind('click').click(secondFn);
		return false;
	};

	var secondFn = function (e) {
		e.preventDefault();
		$('section.school_selection').hide();
		$('a.schoolpicker').unbind('click').click(firstFn);
		return false;
	};

	$('a.schoolpicker').click(firstFn);

	$('.school_selection a').click(function (e) {
		e.preventDefault();
		var text = $(this).text();
		createCookie('exp_selectedSchool',text,200);
		window.location.reload(true);
		return false;
	});

	$('a.profile').click(function () {
		createCookie('exp_selectedSchool','',-1);
	});

	$('a.report_problem').click(function (e) {
		e.preventDefault();
		$('.problem_reporter').show();
	});

	$('a.problem_sender').click(function (e) {
		e.preventDefault();
		$('.current_url').val(window.location.href);
		if (typeof jQuery.fn.ajaxForm !== "undefined") {
			$('#contact_form').ajaxForm({
				success: function(data) {
					var y = $('a.problem_xer').clone(true);
					$('.problem_reporter').html('<h2>Thank you for your report! We\'ll investigate it promptly. Until then, please refresh the page and try again.</h2>');
					$(y).appendTo('.problem_reporter');
				}
			});
		}
		$('#contact_form').submit();
	});

	$('a.problem_xer').click(function (e) {
		e.preventDefault();
		$('.problem_reporter').hide();
	});
});