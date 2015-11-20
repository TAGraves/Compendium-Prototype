var cp = {};

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
        $.getJSON("http://mycompendium.net/admin_ajax/get_student_missions/"+sClass, function (data) {
            var str = "";
            $.each(data.results, function (i) {
                var res = data.results[i];
                str = str + cp.missions.createMission(res, "View Mission", 'row_id_');
            });
            var pseudo_data = {
                "entry_id" : "0",
                "entry_url" : "",
                "name" : "New Mission",
                "category" : "",
                "description" : "",
                "unlock" : "",
                "points" : "30",
                "mission_id" : (function () {
                    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                    var string_length = 25;
                    var randomstring = '';
                    for (var i=0; i<string_length; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        randomstring += chars.substring(rnum,rnum+1);
                    }
                    return randomstring;
                } () ),
                "mission_class" : cp.data_entry.selected_id,
                "entries" : []
            };
            str = str + cp.missions.createMission(pseudo_data, "View Mission", 'row_new_');
            $('section.data').append(str);
            cp.missions.name_function();
            cp.missions.category_picker();
            cp.missions.select_category();
            cp.missions.slider();
            cp.missions.open_mission_edit();
            cp.data_entry.submit_data();
            cp.data_entry.delete_mission();
            $('.ajax_loading').remove();
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
                        alert('You successfully added a new entry with entry_id '+data.entry_id);
                        cp.data_entry.get_class_list();
                    } else {
                        $this.parent().prev().children().show();
                        alert('Failed with the following errors: '+data.errors.join(', '));
                    }
                }
            }).submit();
            return false;
        });
    },
    delete_mission: function () {
        $('section.option_buttons a.reset_button').click(function (e) {
            e.preventDefault();
            var $this = $(this);
            var id = $this.parent().parent().parent().find('input[name="entry_id"]').val();
            var confirmer = confirm("Press \"OK\" to delete this mission. This cannot be undone!");
            if (confirmer === true) {
                $.ajax({
                    url: 'http://mycompendium.net/admin_ajax/delete_mission/' + id,
                    dataType: 'text',
                    success: function (data) {
                        if (data === 'success') {
                            alert('Entry deleted!');
                            $this.parent().parent().parent().remove();
                        } else {
                            alert('Entry couldn\'t be deleted for an unknown reason. If problem persists, contact Mangen & Associates.');
                        }
                    }
                });
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
    table_functions: function () {
        var currentText = "";
        var text_length = 30;
        $('table td.notes').click(function () {
            if (!$('.modal_cell').is(':visible')) {
                currentText = $(this).find('div.textarea_container').find('textarea').val();
                $(this).find('div.textarea_container').show().find('textarea').focus();
            }
        });

        $('div.textarea_container div a.done_button').click(function (e) {
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
        }).click();

        $('div.textarea_container div a.reset_button').click(function (e) {
            e.preventDefault();
            $(this).parent().parent().find('textarea').val(currentText);
            $('.modal_cell').hide();
            return false;
        });        

        /*var firstOffset = $('table.fixed_header').eq(0).offset().top;
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

        });*/

    }

};

cp.missions = {
    category_picker: function () {
        $('a.input_dropdown').click(function(e){
            e.preventDefault();
            var $this = $(this);
            $this.addClass('active_selector');
            $('section.category_selections').show(1, function () {
                $('body').one('click',function () {
                    $('section.category_selections').hide();
                    $this.removeClass('active_selector');
                })
            });
            return false;
        });
    },
    name_function : function () {
        $('.mission_name input').keyup(function () {
            var val = $(this).val();
            $(this).parent().parent().prev().find('.name span').text(val);
        });
    },
    cell_toggle: {
        assign :{
            check: function (ele) {
                ele.removeClass('unchecked');
                ele.addClass('checked');
                cp.missions.cell_toggle.status.lock(ele.next());
            },
            uncheck: function (ele) {
                ele.removeClass('checked');
                ele.addClass('unchecked');
                cp.missions.cell_toggle.status.disable(ele.next());
                cp.missions.cell_toggle.complete.uncheck(ele.next().next().next());
            }
        },
        complete: {
            check: function (ele) {
                ele.removeClass('unchecked');
                ele.addClass('checked');
                cp.missions.cell_toggle.status.unlock(ele.prev().prev());
                cp.missions.cell_toggle.assign.check(ele.prev().prev().prev());
            },
            uncheck: function (ele) {
                ele.removeClass('checked');
                ele.addClass('unchecked');
            }
        },
        status: {
            disable: function (ele) {
                ele.removeClass('locked');
                ele.removeClass('unlocked');
                ele.addClass('disabled');
            },
            lock: function (ele) {
                if (ele.next().next().hasClass('unchecked')) {
                    ele.removeClass('disabled');
                    ele.removeClass('unlocked');
                    ele.addClass('locked');
                }
            },
            unlock: function (ele) {
                    ele.removeClass('disabled');
                    ele.removeClass('locked');
                    ele.addClass('unlocked');
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
    createMission: function (data, toggler, row_id) {
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
                            '<span>' + data.name + '</span>' +
                        '</section>' +
                        '<section class="toggler">' +
                            '<div class="circletri"></div>' +
                            '<span>' + toggler + '</span>' +
                        '</section>' +
                    '</a>' +
                    cp.missions.createMissionDetail(data, row_id) +
                '</section>' +
            '</form>';
        return str;

    },
    createMissionDetail: function (data, row_id) {
        var str = 
            '<section class="edit_mission">' +
                '<section class="mission_name mission_row">' +
                    '<section class="label">Name the mission:</section>' +
                    '<input type="text" name="mission_name" value="' + data.name + '" >' +
                '</section>' +
                '<section class="mission_category mission_row">' +
                    '<section class="label">Categorize it:</section>' +
                    '<div class="selections_fix">' +
                        '<a href="#" class="input_dropdown"><span>' + data.category + '</span></a>' +
                        '<section class="category_selections">' +
                            '<a href="#"><span>Academic</span></a>' +
                            '<a href="#"><span>Personal Skills</span></a>' +
                            '<a href="#"><span>Paychecks</span></a>' +
                            '<a href="#"><span>Attendance</span></a>' +
                            '<a href="#"><span>General</span></a>' +
                        '</section>' +
                        '<input type="hidden" name="mission_category" value="' + data.category + '">' +
                    '</div>' +
                '</section>' +
                '<section class="mission_description mission_row">' +
                    '<section class="label">Briefly describe it:</section>' +
                    '<textarea name="mission_description" value="' + data.description + '">' + data.description + '</textarea>' +
                '</section>' +
                '<section class="mission_unlock mission_row">' +
                    '<section class="label">Choose an automatic unlock date:</section>' +
                    '<input type="text" name="mission_automatic_unlock" value="' + data.unlock + '">' +
                '</section>' +
                '<section class="reward_points">' +
                    '<span class="label">Reward Points:</span>' +
                    '<div class="slider"></div>' +
                    '<span class="value">' + data.points + '</span>' +
                    '<span class="plus">+</span>' +
                    '<input type="hidden" name="mission_reward_points" value="' + data.points + '">' +
                '</section>' +
                //cp.missions.createMissionTable(data, row_id) +
            '</section>' + 
            '<section class="option_buttons">' +
                '<a href="#" class="button done_button"><span>Done!</span></a>';
                if (data.entry_id !== '0') {
                    str = str + '<a href="#" class="button reset_button"><span>Reset</span></a>';
                }
            str = str + '</section>';
        return str;
    },
    createMissionTable: function (data, row_id) {
        var str = 
        '<table class="fixed_header">' +
            '<thead>' +
                '<tr>' +
                    '<th title="" class="first student_name">STUDENT&nbsp;NAME</th>' +
                    '<th title="" class="assign">ASSIGN</th>' +
                    '<th title="" class="status">STATUS</th>' +
                    '<th title="" class="notes">NOTES</th>' +
                    '<th title="" class="complete">COMPLETE</th>' +
                '</tr>' +
            '</thead>' +
        '</table>' +
        '<table class="data_table">' +
            '<tbody>';
        $.each(data.entries, function (i) {
            var evenOrOdd;
            if((i+1)%2 == 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            str = str + cp.missions.createTableRow(evenOrOdd, data.entries[i], row_id);
        });
        str = str + '</tr></tbody></table>';
        return str;
    },
    createTableRow: function (evenOrOdd, entry, row_id) {
        var str = 
            '<tr class="' + evenOrOdd + '">' +
                '<td class="student_name">' +
                    '<span class="table_text">' + entry.student_name + '</span>' +
                    '<input type="hidden" name="mission_table[row_order][]" value="' + entry.row_id + '" >' +
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
                        '<textarea name="mission_table[' + row_id + entry.row_id + '][col_id_52]" value="' + entry.notes +'">' + entry.notes + '</textarea>' +
                        '<div>' +
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
    open_mission_edit: function () {
        $('section.mission a.header').click( function (e) {
            e.preventDefault();
            if ($(this).parent().find('section.edit_mission').hasClass('open')) {
                $('section.content section.open').removeClass('open');
                $('.active_mission').removeClass('active_mission').find('span').text('View Mission');
            } else {
                $('section.content section.open').removeClass('open');
                $('.active_mission').removeClass('active_mission').find('span').text('View Mission');
                $(this).parent().find('section.edit_mission').addClass('open');                    
                $(this).parent().find('section.option_buttons').addClass('open');
                $(this).find('.toggler').addClass('active_mission').find('span').text('Close Mission');
            }
            return false;
        });
    },
    select_category: function () {
        $('section.category_selections a').click( function (e) {
            e.preventDefault();
            var category_name = $(this).find('span').text();
            $(this).parent().prev().find('span').text(category_name).parent().removeClass('active_selector');
            $(this).parent().next().val(category_name);
            $('section.category_selections').hide();
            return false;
        });
    },
    slider: function () {
        $(".slider").slider({           
            range: "min",
            step: .1,
            value: 30,
            min: 0,
            max: 60,
            slide: function( event, ui ) {
                var $this = $(this),
                    value = (ui.value % 5) >= 2.5 ? parseInt(ui.value / 5) * 5 + 5 : parseInt(ui.value / 5) * 5;
                $this.parent().find('span.value').text(String(value));
                $this.parent().find('input').val(String(value));
            }
        });
    }
};

$(function () {
    cp.missions.init();
});
