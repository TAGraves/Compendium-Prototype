function asyncInnerHTML(HTML, callback) {
    var temp = document.createElement('div'),
        frag = document.createDocumentFragment();
    temp.innerHTML = HTML;
    (function(){
        if(temp.firstChild){
            frag.appendChild(temp.firstChild);
            setTimeout(arguments.callee, 0);
        } else {
            callback(frag);
        }
    })();
}

cp.weekpicker = true;
cp.data_entry.personal = {
    create_tables: function (data) {
        var tstr = [], str = [], str2 = [], str3 = [], str4 = [], str5 = [];
                str.push('<form id="safecracker_form" method="post" action="http://mycompendium.net/admin_data_entry/personal_skill_scores" enctype="multipart/form-data">');
                str2.push('<div class="hiddenFields">');
                    str2.push('<input type="hidden" name="ACT" value="9">');
                    str2.push('<input type="hidden" name="RET" value="http://mycompendium.net/admin_data_entry/personal_skill_scores">');
                    str2.push('<input type="hidden" name="URI" value="admin_data_entry/personal_skill_scores">');
                    str2.push('<input type="hidden" name="XID" value="' + eeDatas.xid + '">');
                    str2.push('<input type="hidden" name="return_url" value="admin_data_entry/personal_skill_scores">');
                    str2.push('<input type="hidden" name="author_id" value="' + eeDatas.author_id + '">');
                    str2.push('<input type="hidden" name="channel_id" value="9">');
                    str2.push('<input type="hidden" name="entry_id" value="' + data.entry_id + '">');
                    str2.push('<input type="hidden" name="site_id" value="1">');
                    str2.push('<input type="hidden" name="return" value="admin_data_entry/personal_skill_scores">');
                    str2.push('<input type="hidden" name="json" value="1">');
                    str2.push('<input type="hidden" name="allow_comments" value="y">');
                    str2.push('<input type="hidden" name="title" value="Personal Skills">');
                    str2.push('<input type="hidden" name="entry_date" value="' + new Date().toISOString().substring(0,10) + ' 05:00 PM">');                    
                    str2.push('<input type="hidden" name="personal_date" value="' + $('input.paychecks_date').val() + '">');
                    str2.push('<input type="hidden" name="url_title" class="url_title">');
                str2.push('</div>');
                str3.push('<section class="mission">');
                    str3.push('<a href="#" class="header">');
                        str3.push('<section class="name">');
                            str3.push('<span>Self-Discipline</span>');
                        str3.push('</section>');
                        str3.push('<section class="toggler">');
                            str3.push('<div class="circletri"></div>');
                            str3.push('<span>Show table</span>');
                        str3.push('</section>');
                    str3.push('</a>');
                    str3.push('<section class="edit_mission">');
                        str3.push('<table class="fixed_header">');
                            str3.push('<thead>');
                                str3.push('<tr>');
                                    str3.push('<th title="" class="first student_name">STUDENT NAME');
                                    str3.push('<th title="" class="middle sustained_effort">SUSTAINED EFFORT');
                                    str3.push('<th title="" class="middle self_motivation">SELF MOTIVATION');
                                    str3.push('<th title="" class="middle responsibility">RESPONSIBILITY');
                                    str3.push('<th title="" class="middle following_rules">FOLLOWING RULES');
                                    str3.push('<th title="" class="last notes">NOTES');
                                str3.push('</tr>');
                            str3.push('</thead>');
                        str3.push('</table>');
                        str3.push('<table class="data_table">');
                            str3.push('<tbody>');
                            str3.push(cp.data_entry.personal.generate_self_discipline(data));
                            str3.push('</tbody>');
                        str3.push('</table>');
                    str3.push('</section>');
                str3.push('</section>');
                str4.push('<section class="mission">');
                    str4.push('<a href="#" class="header">');
                        str4.push('<section class="name">');
                            str4.push('<span>Communication</span>');
                        str4.push('</section>');
                        str4.push('<section class="toggler">');
                            str4.push('<div class="circletri"></div>');
                            str4.push('<span>Show table</span>');
                        str4.push('</section>');
                    str4.push('</a>');
                    str4.push('<section class="edit_mission">');
                        str4.push('<table class="fixed_header">');
                            str4.push('<thead>');
                                str4.push('<tr>');
                                    str4.push('<th title="" class="first student_name">STUDENT NAME');
                                    str4.push('<th title="" class="middle elocution">ELOCUTION');
                                    str4.push('<th title="" class="middle enthusiasm">ENTHUSIASM');
                                    str4.push('<th title="" class="middle non_verbal_delivery">NON-VERBAL DELIVERY');
                                    str4.push('<th title="" class="middle conversational_courtesy">COURTESY');
                                    str4.push('<th title="" class="last notes">NOTES');
                                str4.push('</tr>');
                            str4.push('</thead>');
                        str4.push('</table>');
                        str4.push('<table class="data_table">');
                            str4.push('<tbody>');
                            str4.push(cp.data_entry.personal.generate_communication(data));
                            str4.push('</tbody>');
                        str4.push('</table>');
                    str4.push('</section>');
                str4.push('</section>');
                str5.push('<section class="mission">');
                    str5.push('<a href="#" class="header">');
                        str5.push('<section class="name">');
                            str5.push('<span>Teamwork</span>');
                        str5.push('</section>');
                        str5.push('<section class="toggler">');
                            str5.push('<div class="circletri"></div>');
                            str5.push('<span>Show table</span>');
                        str5.push('</section>');
                    str5.push('</a>');
                    str5.push('<section class="edit_mission">');
                        str5.push('<table class="fixed_header">');
                            str5.push('<thead>');
                                str5.push('<tr>');
                                    str5.push('<th title="" class="first student_name">STUDENT NAME');
                                    str5.push('<th title="" class="middle participation">PARTICIPATION');
                                    str5.push('<th title="" class="middle working_with_others">WORKING WITH OTHERS');
                                    str5.push('<th title="" class="middle problem_solving">PROBLEM SOLVING');
                                    str5.push('<th title="" class="middle leadership">LEADERSHIP');
                                    str5.push('<th title="" class="last notes">NOTES');
                                str5.push('</tr>');
                            str5.push('</thead>');
                        str5.push('</table>');
                        str5.push('<table class="data_table">');
                            str5.push('<tbody>');
                                str5.push(cp.data_entry.personal.generate_teamwork(data));
                            str5.push('</tbody>');
                        str5.push('</table>');
                    str5.push('</section>');
                str5.push('</section>');
                str.push('</form>');
                tstr.push(str);
                tstr.push(str2);
                tstr.push(str3);
                tstr.push(str4);
                tstr.push(str5);
            return tstr;
    },    
    personal_html: function (row_name, row_id, column_id, value) {
        var str =                     
            '<td class="middle ' + row_name + '" onclick="cp.data_entry.personal.slider_middle(this)">' +
                '<span class="table_text money_lost">' + value + '</span>' +
                '<div class="modal_cell slider_container">' +
                    '<div class="slider"></div>' +
                    '<span class="money_deduct">' +
                        '<input class="money_loser" name="personal_scores[' + row_id + '][col_id_' + column_id + ']" type="text" maxlength="2" value="' + value + '" />' +
                    '</span>' +
                    '<div class="slider_footer">' +
                        '<a href="#" class="button done_button" onclick="if (window.event) {window.event.cancelBubble = true;} else {arguments[0].stopPropagation();} cp.data_entry.personal.slider_save(this);" ></a><a href="#" class="button reset_button" onclick="if (window.event) {window.event.cancelBubble = true;} else {arguments[0].stopPropagation();} cp.data_entry.personal.slider_reset(this);"></a>' +
                    '</div>' +
                '</div>' +
            '';
        return str;
    },
    generate_self_discipline: function (data) {
        var str = "";
        $.each(data.entries, function (i) {
            var evenOrOdd;
            if((i+1)%2 == 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            str = str +
                '<tr class="'+evenOrOdd+'">' +
                     cp.data_entry.module.student_name.html(
                        data.entries[i].student_name,
                        'personal_scores',
                        data.row_id + data.entries[i].row_id,
                        {
                            student_id: '71',
                            teacher_id: '72',
                            student_name: '73',
                            class_id: '74'
                        },
                        {
                            student_id: data.entries[i].student_id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.entries[i].student_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                     cp.data_entry.personal.personal_html('sustained_effort', data.row_id + data.entries[i].row_id, '58', data.entries[i].sustained_effort) +
                     cp.data_entry.personal.personal_html('self_motivation', data.row_id+ + data.entries[i].row_id, '59', data.entries[i].self_motivation) +
                     cp.data_entry.personal.personal_html('responsibility', data.row_id + data.entries[i].row_id, '60', data.entries[i].responsibility) +
                     cp.data_entry.personal.personal_html('following_rules', data.row_id + data.entries[i].row_id, '61', data.entries[i].following_rules) +
                     cp.data_entry.module.notes.html('personal_scores', data.row_id + data.entries[i].row_id , '70' , data.entries[i].notes) + 
                '</tr>';
        });
        return str;
    },
    generate_communication: function (data) {
        var str = "";
        $.each(data.entries, function (i) {
            var evenOrOdd;
            if((i+1)%2 == 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            str = str +
                '<tr class="'+evenOrOdd+'">' +
                    '<td class="student_name">' +
                        '<span class="table_text">' + data.entries[i].student_name + '</span>' +
                    '' +
                     cp.data_entry.personal.personal_html('elocution', data.row_id + data.entries[i].row_id, '62', data.entries[i].elocution) +
                     cp.data_entry.personal.personal_html('enthusiasm', data.row_id+ + data.entries[i].row_id, '63', data.entries[i].enthusiasm) +
                     cp.data_entry.personal.personal_html('non_verbal_delivery', data.row_id + data.entries[i].row_id, '64', data.entries[i].non_verbal_delivery) +
                     cp.data_entry.personal.personal_html('conversational_courtesy', data.row_id + data.entries[i].row_id, '65', data.entries[i].conversational_courtesy) +
                     cp.data_entry.module.notes.html('personal_scores', data.row_id + data.entries[i].row_id , '75' , data.entries[i].notes_2) + 
                '</tr>';
        });
        return str;
    },
    generate_teamwork: function (data) {
        var str = "";
        $.each(data.entries, function (i) {
            var evenOrOdd;
            if((i+1)%2 == 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            str = str +
                '<tr class="'+evenOrOdd+'">' +
                    '<td class="student_name">' +
                        '<span class="table_text">' + data.entries[i].student_name + '</span>' +
                    '' +
                     cp.data_entry.personal.personal_html('participation', data.row_id + data.entries[i].row_id, '66', data.entries[i].participation) +
                     cp.data_entry.personal.personal_html('working_with_others', data.row_id+ + data.entries[i].row_id, '67', data.entries[i].working_with_others) +
                     cp.data_entry.personal.personal_html('problem_solving', data.row_id + data.entries[i].row_id, '68', data.entries[i].problem_solving) +
                     cp.data_entry.personal.personal_html('leadership', data.row_id + data.entries[i].row_id, '69', data.entries[i].leadership) +
                     cp.data_entry.module.notes.html('personal_scores', data.row_id + data.entries[i].row_id , '76' , data.entries[i].notes_3) + 
                '</tr>';
        });
        return str;
    },
    go_button: function () {
        cp.data_entry.get_class_list("get_personal_skills", cp.data_entry.personal.go_sorter);
    },
    go_sorter: function (bool,data) {
        $('form').remove();
        if (bool) {
            cp.data_entry.personal.process_previous_list(data);
        } else {
            cp.data_entry.personal.process_class_list(data);
        }
    },
    init: function () {
        cp.data_entry.personal.go_button();
    },
    process_previous_list: function (data) {
        var str = cp.data_entry.personal.create_tables(data);
        asyncInnerHTML(str[0].join(''), function(fragment1){
            $('section.data').prepend(fragment1);
            asyncInnerHTML(str[1].join(''), function(fragment2){
                $('form').append(fragment2);
                asyncInnerHTML(str[2].join(''), function(fragment3){
                    $('form').append(fragment3);
                    cp.data_entry.table_hover.cell();
                    cp.data_entry.module.notes.functionality(11);
                    cp.data_entry.personal.slider();
                    asyncInnerHTML(str[3].join(''), function(fragment4){
                        $('form').append(fragment4);
                        cp.data_entry.table_hover.cell(); 
                        cp.data_entry.module.notes.functionality(11);
                        cp.data_entry.personal.slider();
                        asyncInnerHTML(str[4].join(''), function(fragment5){
                            $('form').append(fragment5);
                            cp.data_entry.table_hover.cell();
                            cp.data_entry.personal.slider();
                            cp.data_entry.module.notes.functionality(11);
                            asyncInnerHTML("<div></div>", function(fragment6){
                                $('.ajax_loading').remove();
                                cp.data_entry.personal.open_skill();
                            });
                        });
                    });
                });
            });
        });
    },
    process_class_list: function (data) {
        var sData = {            
            "entry_id" : "0",
            "entry_url" : "",
            "row_id" : "row_new_",
            "entries" : []
        };
        $.each(data.students, function (i) {
            sData.entries.push({
                sustained_effort : "6",
                self_motivation : "6",
                responsibility : "6",
                following_rules : "6",
                notes : "",
                elocution : "6",
                enthusiasm : "6",
                non_verbal_delivery : "6",
                conversational_courtesy : "6",
                notes_2 : "",
                participation : "6",
                working_with_others : "6",
                problem_solving : "6",
                leadership : "6",
                notes_3 : "",
                student_id : data.students[i].id,
                teacher_id: eeDatas.currentID,
                student_name: data.students[i].first_name + " " + data.students[i].last_name,
                class_id: cp.data_entry.selected_id,
                row_id: i
            });
        });
        var str = cp.data_entry.personal.create_tables(sData);
        asyncInnerHTML(str[0].join(''), function(fragment1){
            $('section.data').prepend(fragment1);
            asyncInnerHTML(str[1].join(''), function(fragment2){
                $('form').append(fragment2);
                asyncInnerHTML(str[2].join(''), function(fragment3){
                    $('form').append(fragment3);
                    cp.data_entry.table_hover.cell();
                    cp.data_entry.module.notes.functionality(11);
                    cp.data_entry.personal.slider();
                    asyncInnerHTML(str[3].join(''), function(fragment4){
                        $('form').append(fragment4);
                        cp.data_entry.table_hover.cell(); 
                        cp.data_entry.module.notes.functionality(11);
                        cp.data_entry.personal.slider();
                        asyncInnerHTML(str[4].join(''), function(fragment5){
                            $('form').append(fragment5);
                            cp.data_entry.table_hover.cell();
                            cp.data_entry.personal.slider();
                            cp.data_entry.module.notes.functionality(11);
                            asyncInnerHTML("<div></div>", function(fragment6){
                                $('.ajax_loading').remove();
                                cp.data_entry.personal.open_skill();
                            });
                        });
                    });
                });
            });
        });

    },
    open_skill: function () {
        $('section.mission a.header').click( function (e) {
            e.preventDefault();
            var $this = $(this);
            $(window).unbind('scroll').unbind('touchmove');
            $('table.fixed_header').css('position','static').next().css('marginTop','0px');
            if ($(this).parent().find('section.edit_mission').hasClass('open')) {
                $('section.content section.open').removeClass('open');
                $('.active_mission').removeClass('active_mission').find('span').text('Show Table');
            } else {
                $('section.content section.open').removeClass('open');
                $('.active_mission').removeClass('active_mission').find('span').text('Show Table');
                $(this).parent().find('section.edit_mission').addClass('open');                    
                $(this).parent().find('section.option_buttons').addClass('open');
                $(this).find('.toggler').addClass('active_mission').find('span').text('Hide Table');
                var firstOffset = $this.parent().find('table.fixed_header').eq(0).offset().top;
                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var thead = $this.parent().find('table.fixed_header');
                    var offset = thead.offset().top;
                    if ( scrollTop < firstOffset && thead.css('position') === "fixed" ) {
                        thead.css('position','static');
                        $this.parent().find('table').eq(1).css('marginTop','0px');
                    } else if ( scrollTop >= firstOffset && thead.css('position') === "static" ) {
                        thead.css('position','fixed').css('top','0px');
                        $this.parent().find('table').eq(1).css('marginTop', (thead.height()) + 'px');
                    } 
                }).scroll();
                $(window).bind('touchmove', function () {
                    $(this).scroll();
                    /*$(window).unbind('scroll');
                    var scrollTop = $(this).scrollTop();
                    var thead = $('table.fixed_header');
                    var offset = thead.offset().top;
                    if ( scrollTop < firstOffset && thead.css('position') === "fixed" ) {
                        thead.css('position','static').css('top','1px');
                        $('.data table').eq(1).css('marginTop','0px');
                    } else if ( scrollTop >= firstOffset && thead.css('position') === "static" ) {
                        thead.css('position','fixed').css('top','0px');
                        $('.data table').eq(1).css('marginTop', (thead.height() + thead.height()/2) + 'px');
                    } */

                });
            }
            return false;
        });
    },
    slider: function () {
        $("div.slider").each(function () {
            if ($(this).data('slide-done') !== true) {
                $(this).slider({
                    range: "min",
                    value: 6,
                    step: .1,
                    min: 1,
                    max: 12,
                    slide: function( event, ui ) {
                        ui.value = Math.round(ui.value);
                        $(this).parent().find('input').val(ui.value);
                        window.meh = this;
                    }
                }).data('slide-done',true);
            }
        });
        var currentVal = "";

        cp.data_entry.personal.slider_middle = function (dis) {
            $(dis).attr('onclick','').click(function (e) {
                e.preventDefault();
                if (!$('.modal_cell').is(':visible')) {
                    currentVal = $(this).find('div.slider_container').find('input').val();
                    $(this).find('div.modal_cell').addClass('visible');
                }
                return false;
            }).click();
        };

        cp.data_entry.personal.slider_save = function (dis) {
            $(dis).attr('onclick','').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var val = $(this).parent().parent().find('input').val();
                $(this).parent().parent().parent().find('span.money_lost').text(val);
                $(this).parent().parent().find('div.slider').slider('value',val);
                $(this).parent().parent().removeClass('visible');
                return false;
            }).click();
        };

        cp.data_entry.personal.slider_reset = function (dis) {
            $(dis).attr('onclick','').click(function (e) {                
                e.preventDefault();
                e.stopPropagation();
                $(this).parent().parent().removeClass('visible');
                $(this).parent().parent().find('div.slider').slider('value',currentVal).parent().find('input').val(currentVal);
                return false;
            }).click();
        };

    }

};

$(function () {
    cp.data_entry.personal.init();
});

