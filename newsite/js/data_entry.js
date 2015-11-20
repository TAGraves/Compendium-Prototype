var cp = {
    data_entry: {
        addSubjectPicker: function (class_name , class_id) {
            $(  '<a href="#">' +
                    '<span>' + class_name + '</span>' +
                '</a>')
             .appendTo('section.subject_selections')
             .click(function (e) {
                e.preventDefault();
                $('a.subject_selector span').text(class_name);
                $('a.date_selector div.tbd_opacer').hide();
                $('section.subject_selections').hide();
                cp.data_entry.selected_id = $(this).data('class_id');
                return false;
             }).data('class_id',class_id);
        },
        selected_id: "noclass",
        setup_pickers: function () {
            var seen = {};
            $.each(teacherObj.classes, function (i) {
                var id = teacherObj.classes[i];
                if (typeof teacherObj.class_info[id] !== "undefined") {
                    var txt = teacherObj.class_info[id].grade;
                    if (!seen[txt]) {
                        $(  '<a href="#">' +
                                '<span>' + txt + '</span>' +
                            '</a>')
                         .appendTo('section.class_selections')
                         .click(function (e) {
                            e.preventDefault();
                            $('section.subject_selections a').remove();
                            $.each(teacherObj.classes, function (ii) { 
                                var idid = teacherObj.classes[ii];
                                if (typeof teacherObj.class_info[idid] !== "undefined" && teacherObj.class_info[idid].grade === teacherObj.class_info[id].grade && teacherObj.class_info[idid].school === teacherObj.class_info[id].school) {
                                    cp.data_entry.addSubjectPicker(teacherObj.class_info[idid].name, idid);
                                }
                            });
                            $('a.class_selector span').text(txt);
                            $('a.subject_selector div.tbd_opacer').hide();
                            $('section.class_selections').hide();
                            return false;
                          });
                          seen[txt] = true;
                    }
                }
            });
        },
        classpicker: function () {
            $('a.class_selector').click(function(e){
                e.preventDefault();
                var $this = $(this);
                $this.addClass('active_tbd');
                $('section.class_selections').show(1, function () {
                    $('body').one('click',function () {
                        $('section.class_selections').hide();
                        $this.removeClass('active_tbd');
                    })
                });
                return false;
            });

            $('a.subject_selector').click(function(e){
                e.preventDefault();
                var $this = $(this);
                $this.addClass('active_tbd');
                if ($(this).find('div.tbd_opacer').is(':hidden')) {
                    $('section.subject_selections').show(1, function () {
                        $('body').one('click',function () {
                            $('section.subject_selections').hide();
                            $this.removeClass('active_tbd');
                        })
                    });
                }
                return false;
            });
        },
        datePicked: false,
        datepicker: function () {
            if (cp.weekpicker) {
                var startDate,
                    endDate;
                
                var selectCurrentWeek = function() {
                    window.setTimeout(function () {
                        $('.ui-datepicker-current-day a').addClass('ui-state-active')
                    }, 1);
                }
                
                $('input.datepicker').datepicker( {
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    onClose: function () {
                        $('a.date_selector').removeClass('active_tbd');
                    },
                    onSelect: function(dateText, inst) { 
                            var date = $(this).datepicker('getDate');
                            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
                            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
                            $('input.paychecks_date').val(Date.parse($.datepicker.formatDate( dateFormat, startDate, inst.settings )))
                            $('.datepicker').val("Week of " + $.datepicker.formatDate( dateFormat, startDate, inst.settings ));
                            selectCurrentWeek();
                        if (!cp.data_entry.datePicked) {
                            cp.data_entry.datePicked = true;
                            cp.data_entry.realClass();
                        }

                    },
                    beforeShowDay: function(date) {
                        var cssClass = '';
                        if(date >= startDate && date <= endDate)
                            cssClass = 'ui-datepicker-current-day';
                        return [true, cssClass];
                    },
                    onChangeMonthYear: function(year, month, inst) {
                        selectCurrentWeek();
                    }
                });
                
                $('.ui-datepicker-calendar tr').live('mousemove', function() { $(this).find('td a').addClass('ui-state-hover'); });
                $('.ui-datepicker-calendar tr').live('mouseleave', function() { $(this).find('td a').removeClass('ui-state-hover'); });

            } else {
                $('input.datepicker').datepicker({ 
                    currentText: "Today",
                    dateFormat: "D - M d, yy",
                    onClose: function () {
                        $('a.date_selector').removeClass('active_tbd');
                    },
                    onSelect: function (dateText) {
                        if (!cp.data_entry.datePicked) {
                            cp.data_entry.datePicked = true;
                            window.GrateData = Date.parse($(this).datepicker('getDate')); !!!!
                            cp.data_entry.realClass();
                        }
                    }
                });
            }

            $('a.date_selector').click(function (e) {
                e.preventDefault();
                var $this = $(this);

                if ($(this).find('div.tbd_opacer').is(':hidden')) {
                    $this.addClass('active_tbd');
                    $('input.datepicker').datepicker('show');
                }
                return false;
            });

        },
        get_class_list: function (entry_type,callback) {
            cp.data_entry.realClass = function () {
                    if (cp.weekpicker) {
                        var selected_date = Date.parse($('input.datepicker').val().replace('Week of ',''));                        
                    } else {
                        var selected_date = Date.parse($('input.datepicker').datepicker('getDate'))
                    }
                    sClass = cp.data_entry.selected_id;
                    $('section.data table, section.mission').remove();
                    $('.option_buttons').hide();
                    $('section.data').append('<div class="ajax_loading"></div>');
                    $('input[name="entry_date"]').val(new Date().toISOString().substring(0,10) + " 05:00 PM");
                    $.getJSON("http://mycompendium.net/admin_ajax/"+entry_type+"/"+selected_date+"/"+sClass, function (data) {
                        cp.data_entry.datePicked = false;
                        if (data.action === "get_students") {
                            $.getJSON("http://mycompendium.net/admin_ajax/get_students_from_class/"+sClass, function (newdata) {
                                if (newdata.students[0].error !== undefined) {
                                    alert("Error: " + newdata.students[0].error);
                                    $this.show()
                                } else {
                                    newdata.students.sort(function(a,b){
                                        var alc = a.last_name.toLowerCase(), 
                                            blc = b.last_name.toLowerCase();
                                        return alc > blc ? 1 : alc < blc ? -1 : 0;
                                    });
                                   $('section.option_buttons').show();
                                    callback(false, newdata);
                                }
                            });
                        } else {
                            $('section.option_buttons').show();
                            callback(true, data);
                        }
                    });
            }
        },
        init: function () {
            cp.data_entry.setup_pickers();
            cp.data_entry.classpicker();
            cp.data_entry.datepicker();
            cp.data_entry.left_menu();
            cp.data_entry.submit_data();
        },
        left_menu: function () {
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
        },
        module: {
            header: {
                functionality: function () {
                    var firstOffset = $('table.fixed_header').eq(0).offset().top;
                    $(window).scroll(function () {
                        var scrollTop = $(this).scrollTop();
                        var thead = $('table.fixed_header');
                        var offset = thead.offset().top;
                        if ( scrollTop < firstOffset && thead.css('position') === "fixed" ) {
                            thead.css('position','static');
                            $('.data table').eq(1).css('marginTop','0px');
                        } else if ( scrollTop >= firstOffset && thead.css('position') === "static" ) {
                            thead.css('position','fixed').css('top','0px');
                            $('.data table').eq(1).css('marginTop', (thead.height() + thead.height()/2) + 'px');
                        } 
                    });
                    $(window).bind('touchmove', function () {
                        $(window).unbind('scroll');
                        var scrollTop = $(this).scrollTop();
                        var thead = $('table.fixed_header');
                        var offset = thead.offset().top;
                        if ( scrollTop < firstOffset && thead.css('position') === "fixed" ) {
                            thead.css('position','static').css('top','1px');
                            $('.data table').eq(1).css('marginTop','0px');
                        } else if ( scrollTop >= firstOffset && thead.css('position') === "static" ) {
                            thead.css('position','fixed').css('top','0px');
                            $('.data table').eq(1).css('marginTop', (thead.height() + thead.height()/2) + 'px');
                        } 

                    });
                }
            },
            notes: {
                functionality: function (text_length) {
                    var currentText = "";
                    $('table td.notes').each(function () {
                        if ($(this).data('notes-done') !== true) {
                            $(this).click(function () {
                                if (!$('.modal_cell').is(':visible')) {
                                    currentText = $(this).find('div.textarea_container').find('textarea').val();
                                    $(this).find('div.textarea_container').show().find('textarea').focus();
                                }
                            }).data('notes-done',true);
                        }
                    });

                    $('div.textarea_container div a.done_button').each (function () {
                        if ($(this).data('notes-done') !== true) {
                            $(this).click(function (e) {
                                e.preventDefault();
                                    var txt = $(this).parent().parent().find('textarea').val();
                                    if (txt === "") {
                                        $(this).parent().parent().parent().find('span').text("x").removeClass('has_notes').addClass('no_notes');
                                    } else {
                                        if (txt.length > text_length) {
                                            txt = txt.substring(0,text_length) + "...";
                                        }
                                        $(this).parent().parent().parent().find('span').removeClass('no_notes').addClass('has_notes').text(txt);
                                    }
                                    $('.modal_cell').hide();
                                return false;
                            }).click().data('notes-done',true);
                        }
                    });

                    $('div.textarea_container div a.reset_button').each(function () {
                        if ($(this).data('notes-done') !== true) {
                            $(this).click(function (e) {
                                e.preventDefault();
                                $(this).parent().parent().find('textarea').val(currentText);
                                $('.modal_cell').hide();
                                return false;
                            }).data('notes-done',true);
                        }
                    });
                },
                html: function (namer, row_id, column_id, notes) {
                    var str =
                        '<td class="notes">' +
                            '<span class="table_text no_notes">x</span>' +
                            '<div class="textarea_container modal_cell">' +
                                '<textarea name="' + namer + '[' + row_id + '][col_id_' + column_id + ']" value="' + notes +'">' + notes + '</textarea>' +
                                '<div>' +
                                    '<a href="#" class="button done_button"></a>' +
                                    '<a href="#" class="button reset_button"></a>' +
                                '</div>' +
                            '</div>' +
                        '</td>';
                    return str;
                },
                reset: function () {
                    $('textarea').val("").parent().parent().find('span').text("x").removeClass('has_notes').addClass('no_notes');
                }
            },
            student_name: {
                html: function (student_name, namer, row_id, column_ids, values) {
                    var str = 
                            '<td class="student_name">' +
                                '<span class="table_text">' + student_name + '</span>' +
                                '<input type="hidden" name="' + namer + '[row_order][]" value="' + row_id + '" >' +
                                '<input type="hidden" name="' + namer + '[' + row_id + '][col_id_' + column_ids.student_id + ']" value="' + values.student_id + '" >' +
                                '<input type="hidden" name="' + namer + '[' + row_id + '][col_id_' + column_ids.teacher_id + ']" value="' + values.teacher_id + '" >' +
                                '<input type="hidden" name="' + namer + '[' + row_id + '][col_id_' + column_ids.student_name +']" value="' +values.student_name + '" >' +
                                '<input type="hidden" name="' + namer + '[' + row_id + '][col_id_' + column_ids.class_id + ']" value="' + values.class_id + '" />' +
                            '</td>';
                    return str;
                }
            },
        },
        submit_data: function () {
            $('section.option_buttons a.done_button').click(function (e) {
                e.preventDefault();
                $('section.data table').hide();
                $('section.data').append('<div class="ajax_loading"></div>');
                $('#safecracker_form').ajaxForm({
                    dataType: 'json',
                    success: function(data) {
                        $('.ajax_loading').remove();
                        if (data.success) {
                            alert('Entry added!');
                            $('section.data table tbody tr').remove();
                            $('section.data table, section.mission').remove();
                            $('.option_buttons').hide();
                        } else {
                            $('section.data table').show();
                            alert('Sorry, something went wrong. Please refresh the page and try again.');
                        }
                    }
                }).submit();
                return false;
            });

        },
        table_hover: {
            cell: function () {
                $('.data_table td').each(function () {
                    if ($(this).data('hover-done') !== true) {
                        $(this).hover(function() {
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
                        }).data('hover-done',true);
                    }
                });
            },
            header: function () {
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
        }
    }
};

$(function () {
    cp.data_entry.init();
});