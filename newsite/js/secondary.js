$(function () {
    var reach_tooltip_show = true;
    //left nav
    $('a.navigation_block').click(function (e) {
        e.preventDefault();
        var $ele = $(this).parent(),
            open = $ele.hasClass('open');
        if (open) {
            $(this).next().hide(1, function (){
                $ele.removeClass('open').addClass('closed');
            });
        } else {
            $(this).next().show(1, function (){
                $ele.removeClass('closed').addClass('open');
            });
        }
        return false;
    });

    //datepicker
    $('input.datepicker').datepicker({ 
        currentText: "Today",
        dateFormat: "D - M d, yy",
        altField: '.entry_date_h_input',
        altFormat: "yy-mm-dd 05:00 P'M'"
    });
    $('a.date_selector').click(function (e) {
        e.preventDefault();
        $('input.datepicker').datepicker('show');
        return false;
    });

    //choose class
    $('a.class_selector').click(function(e){
        e.preventDefault();
        $('section.class_selections').show(1, function () {
            $('body').one('click',function () {
                $('section.class_selections').hide();
            })
        });
        return false;
    });

    //get class
    $('a.go_button').click(function(e){
        e.preventDefault();
        var sClass = $('a.class_selector span').text();
        if (sClass === "Pick a class...") {
            alert('Error: You must choose a class!');
        } else if ($('input.datepicker').val() === "...And a date.") {
            alert('Error: You must pick a date!');
        } else {
            $(this).hide();
            $('input.datepicker').datepicker('disable');
            $.getJSON("http://mycompendium.net/admin_ajax/get_students_from_class/"+sClass, function (data) {
                if (data.students[0].error !== undefined) {
                    alert("Error: " + data.students[0].error);
                } else {
                    data.students.sort(function(a,b){
                        var alc = a.last_name.toLowerCase(), 
                            blc = b.last_name.toLowerCase();
                        return alc > blc ? 1 : alc < blc ? -1 : 0;
                    });

                    $.each(data.students, function (i) {
                        var evenOrOdd;
                        if((i+1)%2 == 0) {
                            evenOrOdd = "even";
                        } else {
                            evenOrOdd = "odd";
                        }
                        $('section.data form table tbody').append('<tr class="'+evenOrOdd+'"><td class="student_name">'+data.students[i].first_name + ' ' + data.students[i].last_name + '<input type="hidden" name="paychecks_addition_fields[row_order][]" value="row_new_' + i + '" /><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_11]" value="' + data.students[i].id + '" /><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_12]" value="' + eeDatas.currentID + '" /><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_13]" value="' +data.students[i].first_name + ' ' + data.students[i].last_name + '" /></td><td class="brainstretch unchecked"><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_2]" value="0"  /></td><td class="lifework unchecked"><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_1]" value="0"  /></td><td class="supplies unchecked"><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_3]" value="0"  /></td><td class="reach"><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_6]" value="0"  /></td><td class="at_bat unchecked"><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_7]" value="0"  /></td><td class="planner unchecked"><input type="hidden" name="paychecks_addition_fields[row_new_' + i + '][col_id_8]" value="0"  /></td></tr>');
                        if((i+1)%15 === 0) {
                            $('section.data form table tbody').append('<tr><th title="" class="first student_name">STUDENT&nbsp;NAME</th><th title="$1 if Brainstretch is 100% completed" class="brainstretch">BRAINSTRETCH</th><th title="$1 if all homework is completed" class="lifework">LIFEWORK</th><th title="$1 if student brought 2 sharpened pencils" class="supplies">SUPPLIES</th><th title="You can only give one student REACH money each day."class="reach"><span title="You can only give one student REACH money each day.">REACH</span></th><th title="$1 if student transitions from stretch break to class according to procedure." class="at_bat">AT&nbsp;BAT</th><th title="$1 if student completely filled out planner" class="last planner">PLANNER</th></tr>');
                            $('th').qtip({
                                position: {
                                    at: "top center",
                                    my: "bottom center"
                                },
                                style: {
                                    width: 127,
                                    tip: {
                                        corner: "bottomMiddle",
                                        border: "1px solid #ccc",
                                        width: 16,
                                        height: 13
                                    }
                                }
                            });
                        }
                    });
                    $('td').click(function() {
                        var $this = $(this);
                        if (!$this.hasClass('student_name') && !$this.hasClass('reach')) {
                            $this.toggleClass('unchecked checked');
                            if ($this.hasClass('unchecked')) {
                                $this.find('input').val('0');
                            } else {
                                $this.find('input').val('1');
                            }
                        }
                    });

                    $('td.reach').click(function() {
                        if (reach_tooltip_show) {
                            $('th.reach span').trigger('qtipShow');
                            reach_tooltip_show = false;
                        }
                        var $this = $(this);
                        if (!$this.hasClass('reach_selected')) {
                            $('.reach_selected').removeClass('reach_selected').find('input').val('0');            
                            $(this).addClass('reach_selected').find('input').val('1');
                        } else {
                            $('.reach_selected').removeClass('reach_selected').find('input').val('0');
                        }
                    });

                    $('.reset_button').click(function (e) {
                        e.preventDefault();
                        $('td.checked').addClass('unchecked').removeClass('checked');
                        $('.reach_selected').removeClass('reach_selected');
                        $('td:not(".student_name") input').val('0');   
                        return false;
                    })

                    $('td.student_name').toggle(function () {
                        var $this = $(this);
                        $this.parent().children(':not(".student_name, .reach")').removeClass('unchecked').addClass('checked').find('input').val('1');
                    }, function () {
                        var $this = $(this);
                        $this.parent().children(':not(".student_name, .reach")').removeClass('checked').addClass('unchecked').find('input').val('0');
                    });

                    $('a.done_button').click(function () {
                        e.preventDefault();
                        $('#safecracker_form').ajaxForm({
                            dataType: 'json',
                            success: function(data) {
                                if (data.success) {
                                    alert('You successfully added a new entry with entry_id '+data.entry_id)
                                } else {
                                    alert('Failed with the following errors: '+data.errors.join(', '));
                                }
                            }
                        }).submit();
                        return false;
                    });
                }
            });
        }
        return false;
    })

    $('section.class_selections a').click(function(e) {
        e.preventDefault();
        var text = $(this).find('span').text();
        $('a.class_selector span').text(text);
        $('section.class_selections').hide();
        return false;
    })

    //table tootltip
$('th.reach span').qtip({
    show: {
        event: "qtipShow"
    },
    hide: {
        event: "qtipHide"
    },
    position: {
        at: "top center",
        my: "bottom center"
    },
    style: {
        width: 127,
        tip: {
            corner: "bottomMiddle",
            border: "1px solid #ccc",
            width: 16,
            height: 13
        }
    },
    content: {
        title: {
                text: '<a href="#" class="x_button"><div class="cross horizontal"></div><div class="cross vertical"></div></a>'
        }
    }
});

$('th').qtip({
    position: {
        at: "top center",
        my: "bottom center"
    },
    style: {
        width: 127,
        tip: {
            corner: "bottomMiddle",
            border: "1px solid #ccc",
            width: 16,
            height: 13
        }
    }
});

$('body').on('click', 'a.x_button', function (e) {
    e.preventDefault();
    $($(this).parent().parent().parent().data().qtip.elements.target[0]).trigger('qtipHide');
    return false;
});

    //table hovers
    $('td').hover(function() {
        var $this = $(this),
            $thisParent = $this.parent(),
            $thisIndex = $thisParent.children().index($this);
        if (!$this.hasClass('student_name')) {
            $this.addClass('hovered');
            $this.prev().addClass('hovered_lefter');
            $thisParent.prev().children().eq($thisIndex).addClass('hovered_topper');
            $thisParent.children().eq(0).addClass('active_hover');
            $('th').eq($thisIndex).addClass('active_hover');
            if ($thisParent.is(':first-child')) {
                $thisParent.parent().prev().find('th').eq($thisIndex).addClass('hovered_topper');
            }
        }
    }, function() {
        var $this = $(this),
            $thisParent = $this.parent(),
            $thisIndex = $thisParent.children().index($this);
        if (!$this.hasClass('student_name')) {
            $this.removeClass('hovered');
            $this.prev().removeClass('hovered_lefter');
            $thisParent.prev().children().eq($thisIndex).removeClass('hovered_topper');
            $thisParent.children().eq(0).removeClass('active_hover');
            $('th').eq($thisIndex).removeClass('active_hover');
            if ($thisParent.is(':first-child')) {
                $thisParent.parent().prev().find('th').eq($thisIndex).removeClass('hovered_topper');
            }

        }
    });
});