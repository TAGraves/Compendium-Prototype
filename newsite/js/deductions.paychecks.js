cp.data_entry.paychecks = {
    create_tables: function () {
        var str = 
            '<table class="fixed_header">' +
                '<thead>' +
                    '<tr>' +
                        '<th title="" class="first student_name">STUDENT&nbsp;NAME</th>' +
                        '<th title="" class="middle food_candy">FOOD&#47;CANDY</th>' +
                        '<th title="" class="middle talking">TALKING</th>' +
                        '<th title="" class="middle out_of_seat">OUT&nbsp;OF&nbsp;SEAT</th>' +
                        '<th title="" class="middle off_task">OFF&nbsp;TASK</th>' +
                        '<th title="" class="last notes">NOTES</th>' +
                    '</tr>' +
                '</thead>' +
            '</table>' +
            '<table class="data_table">' +
                '<tbody>' +
                '</tbody>' +
            '</table>';
            return str;
    },
    deduction_html: function (row_name, row_id, column_id, value) {
        var str =                     
            '<td class="middle ' + row_name + '">' +
                '<span class="table_text money_lost"></span>' +
                '<div class="modal_cell slider_container">' +
                    '<div class="slider"></div>' +
                    '<span class="money_deduct">-$' +
                        '<input class="money_loser" name="paychecks_deduction_fields[' + row_id + '][col_id_' + column_id + ']" type="text" maxlength="3" value="' + value + '" />' +
                    '</span>' +
                    '<div class="slider_footer">' +
                        '<a href="#" class="button done_button"></a><a href="#" class="button reset_button"></a>' +
                    '</div>' +
                '</div>' +
            '</td>';
        return str;
    },
    deduction_closer: function () {
        var currentVal = "";

        $('td.middle').click(function (){
            if (!$('.modal_cell').is(':visible')) {
                currentVal = $(this).find('div.slider_container').find('input').val();
                $(this).find('div.slider_container').show();
                if ($(this).find('input.money_loser').val() === "0") {
                    $(this).find('div.slider').slider('value',1).parent().find('input').val(1);
                }  
            }
        });

        $('div.slider_footer a.done_button').click(function (e) {
            e.preventDefault();
                var val = $(this).parent().parent().find('input').val();
                if (val === "0" || val === "") {
                    $(this).parent().parent().parent().find('span.money_lost').text("-$").addClass('no_money');
                } else {
                    $(this).parent().parent().parent().find('span.money_lost').text("-$" +val).removeClass('no_money');
                }
                $(this).parent().parent().find('div.slider').slider('value',val)
                $('.modal_cell').hide();
            return false;
        }).click();

        $('div.slider_footer a.reset_button').click(function (e) {
            e.preventDefault();
            $(this).parent().parent().find('div.slider').slider('value',currentVal).parent().find('input').val(currentVal);
            $('.modal_cell').hide();
            return false;
        });

    },
    go_button: function () {
        cp.data_entry.get_class_list("get_paycheck_deductions", cp.data_entry.paychecks.go_sorter);
    },
    go_sorter: function (bool,data) {
        if (bool) {
            cp.data_entry.paychecks.process_previous_list(data);
        } else {
            cp.data_entry.paychecks.process_class_list(data);
        }
    },
    init: function () {
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
                        'paychecks_deduction_fields',
                        'row_new_' + i,
                        {
                            student_id: '20',
                            teacher_id: '21',
                            student_name: '22',
                            class_id: '23'
                        },
                        {
                            student_id: data.students[i].id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.students[i].first_name + ' ' + data.students[i].last_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                     cp.data_entry.paychecks.deduction_html('food_candy', 'row_new_' + i, '14', '0') +
                     cp.data_entry.paychecks.deduction_html('talking', 'row_new_' + i, '15', '0') +
                     cp.data_entry.paychecks.deduction_html('out_of_seat', 'row_new_' + i, '16', '0') +
                     cp.data_entry.paychecks.deduction_html('off_task', 'row_new_' + i, '17', '0') +
                     cp.data_entry.module.notes.html('paychecks_deduction_fields', 'row_new_' + i , '19' , '') + 
                '</tr>'
            );
        });
        $('.ajax_loading').remove();
        cp.data_entry.module.header.functionality();
        cp.data_entry.paychecks.reset_data();
        cp.data_entry.paychecks.setup_table();
        cp.data_entry.paychecks.deduction_closer();
        cp.data_entry.table_hover.cell();
        cp.data_entry.module.notes.functionality(11);
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
                        'paychecks_deduction_fields',
                        'row_id_' + data.entries[i].row_id,
                        {
                            student_id: '20',
                            teacher_id: '21',
                            student_name: '22',
                            class_id: '23'
                        },
                        {
                            student_id: data.entries[i].student_id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.entries[i].student_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                    cp.data_entry.paychecks.deduction_html('food_candy', 'row_id_' + data.entries[i].row_id, '14', data.entries[i].food_candy) +
                     cp.data_entry.paychecks.deduction_html('talking', 'row_id_' + data.entries[i].row_id, '15', data.entries[i].talking) +
                     cp.data_entry.paychecks.deduction_html('out_of_seat', 'row_id_' + data.entries[i].row_id, '16', data.entries[i].out_of_seat) +
                     cp.data_entry.paychecks.deduction_html('off_task', 'row_id_' + data.entries[i].row_id, '17', data.entries[i].off_task) +
                     cp.data_entry.module.notes.html('paychecks_deduction_fields', 'row_id_' + data.entries[i].row_id , '19' , data.entries[i].notes) + 
                '</tr>'
            );
        });
        $('.ajax_loading').remove();
        cp.data_entry.module.header.functionality();
        cp.data_entry.paychecks.reset_data();
        cp.data_entry.paychecks.setup_table();
        cp.data_entry.paychecks.deduction_closer();
        cp.data_entry.table_hover.cell();        
        cp.data_entry.module.notes.functionality(11);
    },

    reset_data: function () {
        $('section.options_buttons .reset_button').click(function (e) {
            e.preventDefault();
            $('td.middle').find('span.money_lost').text("");
            $('input.money_loser').val("0");
            cp.data_entry.module.notes.reset();
            return false;
        });
    },
    setup_table: function () {
        $("div.slider").slider({
            range: "min",
            value: 0,
            step: .1,
            min: 0,
            max: 5,
            slide: function( event, ui ) {
                ui.value = Math.round(ui.value);
                $(this).parent().find('input').val(ui.value);
                window.meh = this;
            }
        });
    }
};

$(function () {
    cp.data_entry.paychecks.init();

});
