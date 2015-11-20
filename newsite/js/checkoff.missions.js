var cp = {
    ilp: {}
};

cp.data_entry = {
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
            cp.data_entry.get_class_list();
            return false;
         }).data('class_id',class_id);
    },
    get_class_list: function () {
        sClass = cp.data_entry.selected_id;
        $('section.mission').remove();
        $('section.data').append('<div class="ajax_loading"></div>');
        $.getJSON("http://mycompendium.net/admin_ajax/get_students_from_class/"+sClass, function (sData) {
            sData.students.sort(function(a,b){
                var alc = a.last_name.toLowerCase(), 
                    blc = b.last_name.toLowerCase();
                return alc > blc ? 1 : alc < blc ? -1 : 0;
            });
            $.getJSON("http://mycompendium.net/admin_ajax/get_student_missions/"+sClass, function (data) {
                var str = "";
                $.each(data.results, function (i) {
                    var res = data.results[i];
                    str = str + cp.missions.createMission(res, "View Mission", sData);
                });
                $('section.data').append(str);
                $('.closer').click(function (e) {
                    var numb = $(this).prev().prev().prev().val();
                    e.preventDefault();
                    $(this).parent().parent().find('.step_num').each(function () {
                        var val = parseInt($(this).val());
                        if (val > numb) {
                            $(this).val(val-1);
                        }
                    });
                    $(this).parent().remove();
                });
                cp.missions.cell_toggle.setup();
                cp.missions.open_mission_edit();
                cp.data_entry.submit_data();
                cp.data_entry.table_hover();
                cp.data_entry.cancel_data();
                $('.ajax_loading').remove();
            });
        });
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
    submit_data: function () {
        $('section.option_buttons a.done_button').click(function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.parent().prev().children().hide().parent().append('<div class="ajax_loading"></div>');
            $this.parent().parent().parent().ajaxForm({
                dataType: 'json',
                success: function(data) {
                    $('.ajax_loading').remove();
                    if (data.success) {
                        alert('Mission updated!');
                        cp.data_entry.get_class_list();
                    } else {
                        $this.parent().prev().children().show();
                        alert('Failed to update. Please refresh the page and try again.');
                    }
                }
            }).submit();
            return false;
        });
    },
    cancel_data: function () {
        $('section.option_buttons a.reset_button').click(function (e) {
            e.preventDefault();
            var confirmer = confirm("Press \"OK\" to reset your data. This cannot be undone!");
            if (confirmer === true) {
                $(this).parent().prev().html(cp.missions.resetter);                
                cp.missions.cell_toggle.setup();
                //cp.data_entry.table_functions();
            }
            return false;
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
        });
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
    table_hover: function () {
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
    table_functions: function (table) {
        var currentText;
        var text_length = 30;
        $(table).find('td.notes').unbind('click').click(function () {
            if (!$('.modal_cell').is(':visible')) {
                currentText = $(this).find('div.ilp').clone(true);
                $(this).find('div.textarea_container').show()/*.find('textarea').focus()*/;
            }
        });

        $(table).find('div.textarea_container').find('a.done_button').each(function () {
            var iClickerFixerYeah = 0;
            $(this).unbind('click').click(function (e) {
                e.preventDefault();
                var $this = $(this);
                    /*var txt = $(this).parent().parent().find('textarea').val();
                    if (txt === "") {
                        $(this).parent().parent().parent().find('span').text("x").removeClass('has_notes').addClass('no_notes');
                    } else {
                        if (txt.length > text_length) {
                            txt = txt.substring(0,text_length) + "...";
                        }
                        $(this).parent().parent().parent().find('span').removeClass('no_notes').addClass('has_notes').text(txt);
                    }*/
                var val = $this.parent().prev().find('.ilp_title').val();
                var val2 = $this.parent().prev().find('.step_desc').eq(0).val();
                if (val2 !== "") {                
                    $this.parent().parent().parent().find('span').removeClass('no_notes').addClass('has_notes').text('ILP Set!');
                    if (val !== "") {
                        if (typeof cp.ilp[val] === "undefined") {
                            $('.ilp_save').append('<option>' + val + '</option>');
                        }
                        cp.ilp[val] = $this.parent().prev().clone(true);
                    }
                }
                /*var serial = "[";
                $this.parent().prev().find('.step').each(function () {
                    var num = $(this).find('.step_num').val();
                    var desc = $(this).find('.step_desc').val();
                    var complete = $(this).find('.step_complete').is(":checked");
                    serial = serial + '{num: ' + num + ', desc: \'' + desc + '\', complete: ' + complete + '},';
                    serial = serial.replace(/'/g,\\').replace(/"/g,\\")
                });
                serial = serial + "]";*/
                var serial = [];
                $this.parent().prev().find('.step').each(function () {
                    var num = $(this).find('.step_num').val();
                    var desc = $(this).find('.step_desc').val();
                    var complete = $(this).find('.step_complete').is(":checked");
                    if ($(this).find('input[name="disabler"]').length) {
                        serial.push({num: num, desc: desc, complete: complete, type: "disabled"});
                    } else {
                        serial.push({num: num, desc: desc, complete: complete});
                    }
                });
                $this.parent().prev().find('.hidden_ilp').val(JSON.stringify(serial));
                if (iClickerFixerYeah === 1) {
                    cp.missions.cell_toggle.assign.check($this.parent().parent().parent().prev().prev());
                } else {
                    iClickerFixerYeah = 1;
                }
                $('.modal_cell').hide();
                return false;
            }).click();
        });

        $(table).find('div.textarea_container').find('a.reset_button').unbind('click').click(function (e) {
            e.preventDefault();
            //$(this).parent().parent().find('textarea').val(currentText);
            $(this).parent().prev().replaceWith(currentText);
            $('.modal_cell').hide();
            return false;
        });

        $(table).find('a.add_step').unbind('click').click(function (e) {
            e.preventDefault();
            var num = parseInt($(this).prev().find('.step_num').val()) + 1;
            $(this).before(
                '<div class="step">' +
                    '<input type="text" maxlength="1" class="step_num" value="' + num + '">' +
                    '<input type="text" tabindex="' + num + '" class="step_desc" placeholder="description">' +
                    '<label>Completed?<input class="step_complete" type="checkbox"></label>' +
                    '<a href="#" class="closer closexx' + num + '">x</a>' +
                '</div>'
            );
            $('.closexx' + num).click(function (e) {
                var numb = $(this).prev().prev().prev().val();
                e.preventDefault();
                $(this).parent().parent().find('.step_num').each(function () {
                    var val = parseInt($(this).val());
                    if (val > numb) {
                        $(this).val(val-1);
                    }
                });
                $(this).parent().remove();
            });
        });        

        var firstOffset = $('table.fixed_header:visible').offset().top;
        $(window).unbind('scroll').scroll(function () {
            var scrollTop = $(this).scrollTop();
            var thead = $('table.fixed_header:visible');
            if (thead.length) {
                var offset = thead.offset().top;
                if ( scrollTop < firstOffset && thead.css('position') === "fixed" ) {
                    thead.css('position','static');
                    $('.data table:visible').eq(1).css('marginTop','0px');
                } else if ( scrollTop >= firstOffset && thead.css('position') === "static" ) {            
                    /*$('.header-helper:visible').css('width',thead.width());
                    $('.header-helper:visible').css('height',thead.height());*/
                    thead.css('position','fixed').css('top','0px');
                    $('.data table:visible').eq(1).css('marginTop', (thead.height() + thead.height()/2 - 10) + 'px');
                }
            }
        }).scroll();
        $(window).unbind('touchmove').bind('touchmove', function () {
            $(this).scroll();
        });

    }

};

cp.missions = {
    cell_toggle: {
        assign :{
            check: function (ele) {
                ele.removeClass('unchecked');
                ele.addClass('checked');
                ele.find('input').val('checked');
                cp.missions.cell_toggle.status.unlock(ele.next());
            },
            uncheck: function (ele) {
                ele.removeClass('checked');
                ele.addClass('unchecked');
                ele.find('input').val('unchecked');
                cp.missions.cell_toggle.status.disable(ele.next());
                cp.missions.cell_toggle.complete.uncheck(ele.next().next().next());
            }
        },
        complete: {
            check: function (ele) {
                ele.removeClass('unchecked');
                ele.addClass('checked');
                ele.find('input').val('checked');
                cp.missions.cell_toggle.status.unlock(ele.prev().prev());
                cp.missions.cell_toggle.assign.check(ele.prev().prev().prev());
            },
            uncheck: function (ele) {
                ele.removeClass('checked');
                ele.addClass('unchecked');
                ele.find('input').val('unchecked');
            }
        },
        status: {
            disable: function (ele) {
                ele.removeClass('locked');
                ele.removeClass('unlocked');
                ele.addClass('disabled');
                ele.find('input').val('disabled');
            },
            lock: function (ele) {
                if (ele.next().next().hasClass('unchecked')) {
                    ele.removeClass('disabled');
                    ele.removeClass('unlocked');
                    ele.addClass('locked');
                    ele.find('input').val('locked');
                }
            },
            unlock: function (ele) {
                    ele.removeClass('disabled');
                    ele.removeClass('locked');
                    ele.addClass('unlocked');
                    ele.find('input').val('unlocked');
            }
        },
        setup: function () {
            $('td.assign').click(function() {
                if ($(this).hasClass('unchecked')) {
                    cp.missions.cell_toggle.assign.check($(this));
                } else {
                    cp.missions.cell_toggle.assign.uncheck($(this));
                }
            });

            $('td.status').click(function () {
                if ($(this).hasClass('locked')) {
                    cp.missions.cell_toggle.status.unlock($(this));
                } else if ($(this).hasClass('unlocked')) {
                    cp.missions.cell_toggle.status.lock($(this));
                }
            });

            $('td.complete').click(function () {
                if ($(this).hasClass('checked')) {
                    cp.missions.cell_toggle.complete.uncheck($(this));
                } else {
                    cp.missions.cell_toggle.complete.check($(this));
                }
            });
        }
    },
    createMission: function (data, toggler, sData) {
        var namer = data.name.substr(0,30);
        var str =
            '<form class="safecracker_form" method="post" action="http://mycompendium.net/admin_data_entry/student_missions" enctype="multipart/form-data">' +
                '<div class="hiddenFields">' +
                    '<input type="hidden" name="ACT" value="9">' +
                    '<input type="hidden" name="RET" value="http://mycompendium.net/admin_data_entry/student_missions">' +
                    '<input type="hidden" name="URI" value="admin_data_entry/student_missions">' +
                    '<input type="hidden" name="XID" value="' + eeDatas.xid + '">' +
                    '<input type="hidden" name="return_url" value="admin_data_entry/student_missions">' +
                    '<input type="hidden" name="author_id" value="' + eeDatas.author_id + '">' +
                    '<input type="hidden" name="channel_id" value="8">' +
                    '<input type="hidden" name="entry_id" value="' + data.entry_id + '">' +
                    '<input type="hidden" name="site_id" value="1">' +
                    '<input type="hidden" name="return" value="admin_data_entry/student_missions">' +
                    '<input type="hidden" name="json" value="1">' +
                    '<input type="hidden" name="allow_comments" value="y">' +
                    '<input type="hidden" name="title" value="Student Missions">' +
                    '<input type="hidden" name="entry_date" value="' + new Date().toISOString().substring(0,10) + ' 05:00 PM">' +
                    '<input type="hidden" name="url_title" class="url_title">' +
                    '<input type="hidden" name="mission_id" value="' + data.mission_id + '">' +
                    '<input type="hidden" name="mission_class" value="' + data.mission_class + '">' +
                '</div>' +
                '<section class="mission">' +
                    '<a href="#" class="header">' +
                        '<section class="name">' +
                            '<span>' + namer + '</span>' +
                        '</section>' +
                        '<section class="toggler">' +
                            '<div class="circletri"></div>' +
                            '<span>' + toggler + '</span>' +
                        '</section>' +
                    '</a>' +
                    '<section class="edit_mission">' +
                        cp.missions.createMissionTable(data, sData) +
                    '</section>' +
                    '<section class="option_buttons">' +
                        '<a href="#" class="button done_button"><span>Done!</span></a>' +
                        '<a href="#" class="button reset_button"><span>Reset</span></a>' +
                    '</section>' +
                '</section>' +
            '</form>';
        return str;

    },
    createMissionTable: function (data, sData) {
        var str = 
        '<span class="description">Description: ' + data.description + '</span>' +
        '<div class="header-helper"></div>' +
        '<table class="fixed_header">' +
            '<thead>' +
                '<tr>' +
                    '<th title="" class="first student_name">STUDENT&nbsp;NAME</th>' +
                    '<th title="" class="assign">ASSIGN</th>' +
                    '<th title="" class="status">STATUS</th>' +
                    '<th title="" class="notes">ILP</th>' +
                    '<th title="" class="complete">COMPLETE</th>' +
                '</tr>' +
            '</thead>' +
        '</table>' +
        '<table class="data_table">' +
            '<tbody>';
        var counter = 0;
        $.each(sData.students, function (i) {
            var evenOrOdd;
            if((i+1)%2 == 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            if (typeof data.entries[sData.students[i].id] === "undefined") {
                var builder = [];
                $.each(data.default_ilp, function (i) {
                    builder.push({
                        num: i+1,
                        desc: data.default_ilp[i],
                        complete: 0,
                        type: "disabled"
                    });
                });
                if (builder.length === 0) {
                    builder.push({num: 1, desc: "", complete: 0});
                }
                var argg = {
                    assign : "unchecked",
                    status : "disabled",
                    notes : builder,
                    complete: "unchecked",
                    student_id : sData.students[i].id,
                    teacher_id : eeDatas.currentID,
                    student_name: sData.students[i].first_name + " " + sData.students[i].last_name,
                    class_name : cp.data_entry.selected_id,
                    row_id : counter++,
                    row_name: 'row_new_'
                };
            } else {
                var argg = data.entries[sData.students[i].id];
            }
            str = str + cp.missions.createTableRow(evenOrOdd, argg);
        });
        str = str + '</tr></tbody></table>';
        return str;
    },
    createTableRow: function (evenOrOdd, entry) {
        var row_id = entry.row_name;
        if (entry.notes !== "") {
            entry.jNotes = entry.notes;
        }
        var supraStr = "";
        if (typeof entry.jNotes !== "undefined") {
            $.each(entry.jNotes, function (i, value){

                if (value.complete === true) {
                    var checker = 'checked="checked"';
                } else {
                    var checker = '';
                }

                if (value.type !== "undefined" && value.type === "disabled") {
                    var typer = ' disabled="disabled"';
                    var closer = '<input type="hidden" value="disabled" name="disabler">';
                } else {
                    var typer='';
                    var closer = '<a href="#" class="closer closexx' + value.num + '">x</a>'
                }

                supraStr = supraStr +'<div class="step">' +
                    '<input type="text" maxlength="1" class="step_num" value="' + value.num + '">' +
                    '<input type="text"' + typer + ' tabindex="1" class="step_desc" value="' + value.desc + '" placeholder="description">' +
                    '<label>Completed?<input class="step_complete" type="checkbox" ' + checker + '></label>' +
                    closer + 
                    '</div>';
            });
        } else {
            supraStr = '<div class="step">' +
                    '<input type="text" maxlength="1" class="step_num" value="1">' +
                    '<input type="text" tabindex="1" class="step_desc" value="" placeholder="description">' +
                    '<label>Completed?<input class="step_complete" type="checkbox"></label>' +
                    '</div>';
        }
        var str = 
            '<tr class="' + evenOrOdd + '">' +
                '<td class="student_name">' +
                    '<span class="table_text">' + entry.student_name + '</span>' +
                    '<input type="hidden" name="mission_table[row_order][]" value="' + row_id + entry.row_id + '" >' +
                    '<input type="hidden" name="mission_table[' + row_id + entry.row_id + '][col_id_54]" value=" ' + entry.student_id + '" >' +
                    '<input type="hidden" name="mission_table[' + row_id + entry.row_id + '][col_id_55]" value="' + entry.teacher_id + '" >' +
                    '<input type="hidden" name="mission_table[' + row_id + entry.row_id + '][col_id_56]" value="' +entry.student_name + '" >' +
                    '<input type="hidden" name="mission_table[' + row_id + entry.row_id + '][col_id_57]" value="' + entry.class_id + '" >' +
                '</td>' +
                '<td class="assign ' + entry.assign + '"><input type="hidden" name="mission_table[' + row_id + entry.row_id + '][col_id_50]" value="' + entry.assign + '"></td>' +
                '<td class="status '+ entry.status +'"><input type="hidden" name="mission_table[' + row_id + entry.row_id + '][col_id_51]" value="' + entry.status + '"></td>' +
                '<td class="notes">' +
                    '<span class="table_text no_notes">x</span>' +
                    '<div class="textarea_container modal_cell">' +
                        '<div class="ilp">' +
                            supraStr +
                            '<a href="#" class="add_step">+ Add Next Step</a>' +
                            '<input type="text" class="ilp_title" placeholder="title">' +
                            '<input type="hidden" class="hidden_ilp" name="mission_table[' + row_id + entry.row_id + '][col_id_52]" value="' + JSON.stringify(entry.notes) +'">' +
                            '<select class="ilp_save"><option>ILP Actions</option></select>' +
                        '</div>' +
                        '<div class="buttons">' +
                            '<a href="#" class="button done_button"></a>' +
                            '<a href="#" class="button reset_button"></a>' +
                        '</div>' +
                    '</div>' +
                '</td>' +
                '<td class="complete ' + entry.complete + '"><input type="hidden" name="mission_table[' + row_id + entry.row_id + '][col_id_53]" value="' + entry.assign + '"></td>' +
            '</tr>';
        return str;
    },
    init: function () {
        cp.data_entry.left_menu();
        cp.data_entry.setup_pickers();
        cp.data_entry.classpicker();
    },
    resetter: "",
    open_mission_edit: function () {
        $('section.mission a.header').click( function (e) {
            e.preventDefault();
            $('table.fixed_header:visible').css('position','static');
            $('.data table:visible').eq(1).css('marginTop','0px');
            if ($(this).parent().find('section.edit_mission').hasClass('open')) {
                $('section.content section.open').removeClass('open');
                $('.active_mission').removeClass('active_mission').find('span').text('View Mission');
            } else {
                $('section.content section.open').removeClass('open');
                $('.active_mission').removeClass('active_mission').find('span').text('View Mission');
                $(this).parent().find('section.edit_mission').addClass('open');                    
                $(this).parent().find('section.option_buttons').addClass('open');
                $(this).find('.toggler').addClass('active_mission').find('span').text('Close Mission');
                cp.missions.resetter = $(this).parent().find('section.edit_mission')[0].innerHTML;
                cp.data_entry.table_functions($(this).parent());
            }
            return false;
        });
    }
};

$(function () {
    cp.missions.init();
    $(document).on("change", '.ilp_save', function () {
        var valst = $(this).val();
        if (valst !== "ILP Actions") {
            var htmls = cp.ilp[valst];
            htmls.attr('id','tempclone');
            $(this).parent().replaceWith(htmls);
            cp.ilp[valst] = $('#tempclone').clone(true);
            $('#tempclone').find('.ilp_title').val('');
            $('#tempcone').removeAttr('id');
        }
    });
});
