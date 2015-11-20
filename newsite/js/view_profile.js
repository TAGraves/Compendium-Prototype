$(function () {
	$('section.student a.header').click( function (e) {
        e.preventDefault();
        if ($(this).parent().find('section.view_student').hasClass('open')) {
            $('section.content section.open').removeClass('open');
            $('.active_student').removeClass('active_student').find('span').text('View Student');
        } else {
            $('section.content section.open').removeClass('open');
            $('.active_student').removeClass('active_student').find('span').text('View Student');
            $(this).parent().find('section.view_student').addClass('open');                    
            $(this).find('.toggler').addClass('active_student').find('span').text('Close Student');
        }
        return false;
    });

    $('a.done_button').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.prev().val() === "" || $this.prev().prev().val() === "") {
            alert('Please fill in a category and note!');
        } else {
            $this.hide().after('<div class="ajax_loading"></div>');
            $this.prev().prev().prev().prev().val(eeDatas.currentID);
            $this.parent().ajaxForm({
            dataType: 'json',
            success: function(data) {
                if(data.success) {
                    var note = $this.prev().val();
                    if (note.length + eeDatas.currentID.length > 45) {
                        note = (eeDatas.currentID + ': ' +note).substring(0,45) + "...";
                    }  else {
                        note = eeDatas.currentID + ': ' +note;
                    }
                    var category = $this.prev().prev().val();
                    var date = new Date();
                    date = date.toString().substr(4,11);
                    $this.parent().parent().parent().prepend(
                         '<section class="entry">' +
                            '<span class="entry_type">' + date + '</span>' +
                            '<span class="author">\/\/ '+ category +'</span>' +
                             '<span class="entry_text">' + note + '</span>' +
                        '</section>'
                    );
                    $this.show();
                    $('.ajax_loading').remove();
                    $this.prev().val("").prev().val("");
                } else {
                    alert('Sorry, something went wrong. Please try again.');
                }
            }
            }).submit();
        }
        return false;
    });

    var lengther = 0, completed = 0, notesObj = {};
    $.each(teacherObj.class_info, function () {
        var that = this;
        var thisGrade = that.grade.toLowerCase().replace(" ","_");
        var pageGrade = window.location.href.split('view_profiles/')[1].split('/')[0].split('#')[0];
        if (thisGrade === pageGrade && that.school === eeDatas.currentSchool) {
            ++lengther;
            if (lengther === 1) {
                $('input[name="notes_class"]').val(that.id);
            }
            $.getJSON('http://mycompendium.net/admin_ajax/get_student_notes/'+that.id, function (data) {
                $.each(data.entries, function (i) {
                    if (typeof notesObj[data.entries[i]['student']] === "undefined") {
                        notesObj[data.entries[i]['student']] = [];
                    }
                    notesObj[data.entries[i]['student']].push(data.entries[i]);
                });
                if (++completed === lengther) {
                    $('section.student').each(function () {
                        var $this = $(this);
                        var id = $this.attr('id').split('stu-')[1];
                        if (typeof notesObj[id] !== "undefined") {
                            notesObj[id].sort(function(a,b){
                                var alc = a.entry_date, 
                                    blc = b.entry_date;
                                return alc > blc ? 1 : alc < blc ? -1 : 0;
                            });
                            $.each(notesObj[id], function (i) {
                                if (notesObj[id][i].notes.length + notesObj[id][i].teacher.length > 45) {
                                    note = (notesObj[id][i].teacher + ': ' + notesObj[id][i].notes).substring(0,45) + '...';
                                } else {
                                    note = notesObj[id][i].teacher + ': ' + notesObj[id][i].notes;
                                }
                                var date = new Date();
                                date.setTime(notesObj[id][i].entry_date + '000');
                                date = date.toString().substr(4,11);
                                $this.find('section.log').prepend(
                                    '<section class="entry">' +
                                        '<span class="entry_type">' + date + '</span>' +
                                        '<span class="author">\/\/ '+ notesObj[id][i].type +'</span>' +
                                         '<span class="entry_text">' + note + '</span>' +
                                    '</section>'
                                );
                            });
                        }
                    });
                }
            });
        };
    });

});