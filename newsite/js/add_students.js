$(function () {
	var createKey = function (fn) {
		$("#member_form").ajaxForm({
			dataType: 'json',
			success: function(data) {
				if(data.success) {
					var key = data.key;
					$('.registration_key').val(key);
					fn(key);
				} else {
					alert('Sorry, something went wrong. Please try again.');
				}
			}
		}).submit();
	};

	$.each(teacherObj.class_info, function () {
		var that = this;
		var thisGrade = that.grade.toLowerCase().replace(/ /g,"_");
		var pageGrade = window.location.href.split('add_students/')[1].split('/')[0].split('#')[0];
		if (thisGrade === pageGrade && that.school === eeDatas.currentSchool) {
			$('<option value="' + that.id + '">' + that.id + '</option>').appendTo('#class_assignment_classes').attr('selected','selected');
		};
	});


	var assignClass = function (fn) {
		$('.class_assignment_id').val($('#new_stud input[name="preregistration_id"]').val());
		$('#student_class_assignments').ajaxForm({
			dataType: 'json',
			success: function(data) {
				if(data.success) {
					fn();
				} else {
					alert('Sorry, something went wrong. Please try again.');
				}
			}
		}).submit();
	};

	$('#new_stud .done_button').click(function (e) {
		e.preventDefault();
		var $this = $(this);
		$this.hide().after('<div class="ajax_loading"></div>');
		if ($this.parent().parent().find('input[name="preregistration_id"]').val() === "") {
			alert('You must fill in an EMISId!');
			$this.show();
			$('.ajax_loading').remove();
		} else {
			createKey(function (key) {
				assignClass(function () {
					$this.parent().parent().parent().ajaxForm({
						dataType: 'json',
						success: function(data) {
							if(data.success) {
								alert('Student added!');
								$('#new_stud').addClass('safecracker_form').attr('id',key);
								$('input[name~="[row_new_0]"], textarea[name~="[row_new_0]"]').each(function () {
									var attr = $(this).attr('name').replace('[row_new_0]','[row_id_0]');
									$(this).attr('name',attr);
								});
								$this.unbind('click').click(fixerFunction);
								$this.after('Please reload the page in order to edit this form.');
								$('.ajax_loading').remove();
								$('#'+key).find('input[name="entry_id"]').val(data.entry_id);
								var first_name = $('#'+key).find('input[name="preregistration_first_name"]').val();
								var last_name = $('#'+key).find('input[name="preregistration_last_name"]').val();
								$('#'+key).find('a.header').click().find('section.name span').text(first_name + " " + last_name);
								$('#'+key).after(studentClone);
								studentClone = $('#new_stud').clone(true);
							} else {
								alert('Sorry, something went wrong. Please try again.');
							}
						}
					}).submit();
				});
			});
		}
		return false;
	});

	var fixerFunction = function (e) {
		e.preventDefault();
		var $this = $(this);
		$this.hide().after('<div class="ajax_loading"></div>');
			$this.parent().parent().parent().ajaxForm({
				dataType: 'json',
				success: function(data) {
					if(data.success) {
						alert('Student updated!!');
						$this.show();
						$('.ajax_loading').remove();
						var first_name = $this.parent().parent().parent().find('input[name="preregistration_first_name"]').val();
						var last_name = $this.parent().parent().parent().find('input[name="preregistration_last_name"]').val();
						$this.parent().parent().find('a.header').click().find('section.name span').text(first_name + " " + last_name);
					} else {
						alert('Sorry, something went wrong. Please try again.');
					}
				}
			}).submit();

		return false;
	};

	$('.safecracker_form .done_button').click(fixerFunction);

	$('section.student a.header').click( function (e) {
        e.preventDefault();
        if ($(this).parent().find('section.edit_student').hasClass('open')) {
            $('section.content section.open').removeClass('open');
            $('.active_student').removeClass('active_student').find('span').text('View Student');
        } else {
            $('section.content section.open').removeClass('open');
            $('.active_student').removeClass('active_student').find('span').text('View Student');
            $(this).parent().find('section.edit_student').addClass('open');                    
            $(this).parent().find('section.option_buttons').addClass('open');
            $(this).find('.toggler').addClass('active_student').find('span').text('Close Student');
        }
        return false;
    });

    var studentClone = $('#new_stud').clone(true);
});

