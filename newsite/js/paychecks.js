cp.data_entry.paychecks = {
    addition_html: function (row_name, row_id, column_id, value) {
        var str = 
            '<td class="' + row_name + ' unchecked">' +
                '<input type="hidden" name="paychecks_addition_fields[' + row_id + '][col_id_' + column_id + ']" value="' + value + '">'+
            '</td>';
        return str;
    },
    cell_check_all: function () {
        $('td.student_name').toggle(function () {
            var $this = $(this);
            $this.parent().children(':not(".student_name, .reach")').removeClass('unchecked').addClass('checked').find('input').val('1');
        }, function () {
            var $this = $(this);
            $this.parent().children(':not(".student_name, .reach")').removeClass('checked').addClass('unchecked').find('input').val('0');
        });
    },
    cell_toggle_value: function () {
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
        $('td.brainstretch').css('width',$('th.brainstretch').width() + 1);
        $('td.lifework').css('width',$('th.lifework').width() + 1);
        $('td.supplies').css('width',$('th.supplies').width() + 1);
        $('td.reach').css('width',$('th.reach').width() + 1);
        $('td.at_bat').css('width',$('th.at_bat').width() + 1);
        $('td.planner').css('width',$('th.planner').width() + 1);
    },
    create_tables: function () {
    var str = 
            '<table class="fixed_header">' +
                '<thead>' +
                    '<tr>' +
                        '<th title="" class="first student_name">STUDENT&nbsp;NAME</th>' +
                        '<th title="$1 if Brainstretch is 100% completed" class="brainstretch">BRAINSTRETCH</th>' +
                        '<th title="$1 if all homework is completed" class="lifework">LIFEWORK</th>' +
                        '<th title="$1 if student brought 2 sharpened pencils" class="supplies">SUPPLIES</th>' +
                        '<th title="You can only give one student REACH money each day."class="reach"><span title="You can only give one student REACH money each day.">REACH</span></th>' +
                        '<th title="$1 if student transitions from stretch break to class according to procedure." class="at_bat">AT&nbsp;BAT</th>' +
                        '<th title="$1 if student completely filled out planner" class="last planner">PLANNER</th>' +
                    '</tr>' +
                '</thead>' +
            '</table>' +
            '<table class="data_table">' +
                '<tbody>' +
                '</tbody>' +
            '</table>';
    return str;
    },
    go_button: function () {
        cp.data_entry.get_class_list("get_paycheck_additions", cp.data_entry.paychecks.go_sorter);
    },
    go_sorter: function (bool,data) {
        if (bool) {
            cp.data_entry.paychecks.process_previous_list(data);
        } else {
            cp.data_entry.paychecks.process_class_list(data);
        }
    },
    init: function () {
        cp.data_entry.paychecks.reach_tooltip.setup();
        cp.data_entry.paychecks.go_button();
    },
    process_class_list: function (data) {        
        $('section.data form').append(cp.data_entry.paychecks.create_tables());
        $.each(data.students, function (i) {
            var evenOrOdd;
            if((i+1)%2 == 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            $('section.data form table tbody').append(
                '<tr class="'+evenOrOdd+'">' +
                    cp.data_entry.module.student_name.html(
                        data.students[i].first_name + ' ' + data.students[i].last_name,
                        'paychecks_addition_fields',
                        'row_new_' + i,
                        {
                            student_id: '11',
                            teacher_id: '12',
                            student_name: '13',
                            class_id: '24'
                        },
                        {
                            student_id: data.students[i].id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.students[i].first_name + ' ' + data.students[i].last_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                     cp.data_entry.paychecks.addition_html('brainstretch', 'row_new_' + i, '2', '0') +
                     cp.data_entry.paychecks.addition_html('lifework', 'row_new_' + i, '1', '0') +
                     cp.data_entry.paychecks.addition_html('supplies', 'row_new_' + i, '3', '0') +
                     cp.data_entry.paychecks.addition_html('reach', 'row_new_' + i, '6', '0') +
                     cp.data_entry.paychecks.addition_html('at_bat', 'row_new_' + i, '7', '0') +
                     cp.data_entry.paychecks.addition_html('planner', 'row_new_' + i, '8', '0') +
                '</tr>'
            );
        });
        $('section.data form table tbody tr td.reach').each(function () {
            $(this).removeClass('unchecked');
        });        
        $('.ajax_loading').remove();
        cp.data_entry.module.header.functionality();
        cp.data_entry.table_hover.cell();
        cp.data_entry.paychecks.reach_tooltip.enable();
        cp.data_entry.paychecks.cell_toggle_value();
        cp.data_entry.paychecks.reset_data();
        cp.data_entry.paychecks.cell_check_all();
    },
    process_previous_list: function (data) {
        $('section.data form').append(cp.data_entry.paychecks.create_tables());
        $('input[name="entry_id"]').val(data.entry_id);
        $('input.url_title').val(data.entry_url);
        $.each(data.entries, function (i) {
            var evenOrOdd;
            if((i+1)%2 == 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            $('section.data form table tbody').append(
                '<tr class="'+evenOrOdd+'">' +
                     cp.data_entry.module.student_name.html(
                        data.entries[i].student_name,
                        'paychecks_addition_fields',
                        'row_id_' + data.entries[i].row_id,
                        {
                            student_id: '11',
                            teacher_id: '12',
                            student_name: '13',
                            class_id: '24'
                        },
                        {
                            student_id: data.entries[i].student_id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.entries[i].student_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                     cp.data_entry.paychecks.addition_html('brainstretch', 'row_id_' + data.entries[i].row_id, '2', data.entries[i].brainstretch) +
                     cp.data_entry.paychecks.addition_html('lifework', 'row_id_' + data.entries[i].row_id, '1', data.entries[i].lifework) +
                     cp.data_entry.paychecks.addition_html('supplies', 'row_id_' + data.entries[i].row_id, '3', data.entries[i].supply_check) +
                     cp.data_entry.paychecks.addition_html('reach', 'row_id_' + data.entries[i].row_id, '6', data.entries[i].reach) +
                     cp.data_entry.paychecks.addition_html('at_bat', 'row_id_' + data.entries[i].row_id, '7', data.entries[i].at_bat) +
                     cp.data_entry.paychecks.addition_html('planner', 'row_id_' + data.entries[i].row_id, '8', data.entries[i].planner) +
                '</tr>'
            );
        });
        $('section.data form table tbody tr td:not(".student_name, .reach") input').each(function () {
            if($(this).val() === "1") {
                $(this).parent().removeClass('unchecked').addClass('checked');
            }
        });
        $('section.data form table tbody tr td.reach input').each(function () {
            $(this).parent().removeClass('unchecked');
            if($(this).val() === "1") {
                $(this).parent().addClass('reach_selected');
            }
        });
        $('.ajax_loading').remove();
        cp.data_entry.module.header.functionality();
        cp.data_entry.table_hover.cell();
        cp.data_entry.paychecks.reach_tooltip.enable();
        cp.data_entry.paychecks.cell_toggle_value();
        cp.data_entry.paychecks.reset_data();
        cp.data_entry.paychecks.cell_check_all();

    },
    reach_tooltip: {
        enable: function () {
            $('td.reach').click(function() {
                if (cp.data_entry.paychecks.reach_tooltip.show_bool) {
                    $('th.reach span').trigger('qtipShow');
                    cp.data_entry.paychecks.reach_tooltip.show_bool = false;
                }
                var $this = $(this);
                if (!$this.hasClass('reach_selected')) {
                    $('.reach_selected').removeClass('reach_selected').find('input').val('0');            
                    $(this).addClass('reach_selected').find('input').val('1');
                } else {
                    $('.reach_selected').removeClass('reach_selected').find('input').val('0');
                }
            });

        },
        setup: function () {
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

            $('body').on('click', 'a.x_button', function (e) {
                e.preventDefault();
                $($(this).parent().parent().parent().data().qtip.elements.target[0]).trigger('qtipHide');
                return false;
            });

        },
        show_bool: true
    },
    reset_data: function () {
        $('.reset_button').click(function (e) {
            e.preventDefault();
            $('td.checked').addClass('unchecked').removeClass('checked');
            $('.reach_selected').removeClass('reach_selected');
            $('td:not(".student_name") input').val('0');   
            return false;
        });
    }
};

$(function () {
    cp.data_entry.paychecks.init();
});
