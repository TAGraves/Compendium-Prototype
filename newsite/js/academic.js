cp.weekpicker = true;
cp.data_entry.academic = {
    academic_html: function (row_id, add_subtract) {

        if ( parseInt(add_subtract) < 0 ) {
            is_negative = "negative";
            raw_sign = "-";
            raw_value = add_subtract.split("-")[1];
        } else {
            is_negative = "";
            raw_sign = "+";
            raw_value = add_subtract;
        }

        var str =                     
            '<td class="add_subtract">' +
                '<div class="slider"></div>' +
                '<span class="plus_minus ' + is_negative + '">' + raw_sign + '</span>' +
                '<span class="value ' + is_negative + '">' + raw_value + '</span>' +
                '<input type="hidden" name="academic_scores[' + row_id + '][col_id_40]" value="' + add_subtract + '" />' +
            '</td>';
        return str;
    },
    create_tables: function () {
        var str = 
            '<table class="fixed_header">' +
                '<thead>' +
                    '<tr>' +
                        '<th title="" class="first student_name">STUDENT&nbsp;NAME</th>' +
                        '<th title="" class="add_subtract">ADD/SUBTRACT&nbsp;POINTS</th>' +
                        '<th title="" class="notes">NOTES</th>' +
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
        cp.data_entry.get_class_list("get_academic_scores", cp.data_entry.academic.go_sorter);
    },
    go_sorter: function (bool,data) {
        if (bool) {
            cp.data_entry.academic.process_previous_list(data);
        } else {
            cp.data_entry.academic.process_class_list(data);
        }
    },
    init: function () {
        cp.data_entry.academic.go_button();
    },
    process_class_list: function (data) {
        $('section.data form').append(cp.data_entry.academic.create_tables());
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
                        'academic_scores',
                        'row_new_' + i,
                        {
                            student_id: '42',
                            teacher_id: '43',
                            student_name: '44',
                            class_id: '45'
                        },
                        {
                            student_id: data.students[i].id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.students[i].first_name + ' ' + data.students[i].last_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                     cp.data_entry.academic.academic_html('row_new_' + i, '0') +
                     cp.data_entry.module.notes.html('academic_scores', 'row_new_' + i , '41' , '') + 
                '</tr>'
            );
        });
        $('.ajax_loading').remove();
        cp.data_entry.table_hover.cell();
        cp.data_entry.module.notes.functionality(24);
        cp.data_entry.academic.setup_slider();
        cp.data_entry.academic.reset_data();
        cp.data_entry.module.header.functionality();
    },
    process_previous_list: function (data) {
        $('section.data form').append(cp.data_entry.academic.create_tables());
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
                        'academic_scores',
                        'row_id_' + data.entries[i].row_id,
                        {
                            student_id: '42',
                            teacher_id: '43',
                            student_name: '44',
                            class_id: '45'
                        },
                        {
                            student_id: data.entries[i].student_id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.entries[i].student_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                     cp.data_entry.academic.academic_html('row_id_' + data.entries[i].row_id, data.entries[i].add_subtract) +
                     cp.data_entry.module.notes.html('academic_scores', 'row_id_' + data.entries[i].row_id , '41' , data.entries[i].notes) + 
                '</tr>'
            );
        });
        $('.ajax_loading').remove();
        cp.data_entry.table_hover.cell();
        cp.data_entry.module.notes.functionality(24);
        cp.data_entry.academic.setup_slider();
        $('.slider').each(function () {
            var $this = $(this),
                value = $this.parent().find('input').val();
            $this.slider('value',value);
            if (parseInt(value) < 0) {
                $this.find('.ui-slider-range').addClass('range-negative');
            }
        });
        cp.data_entry.academic.reset_data();
        cp.data_entry.module.header.functionality();

    },
    setup_slider : function () {
        $(".slider").slider({           
            range: "min",
            step: .1,
            value: 0,
            min: -5,
            max: 5,
            slide: function( event, ui ) {
                var $this = $(this),
                    value = Math.round(ui.value);
                if (value < 0) {
                    $this.parent().find('span.plus_minus').text('-').addClass('negative');
                    $this.parent().find('span.value').text(String(value).split('-')[1]).addClass('negative');
                    $this.parent().find('input').val(value);
                    $this.find('.ui-slider-range').addClass('range-negative');
                } else {
                    $this.parent().find('span.plus_minus').text('+').removeClass('negative');
                    $this.parent().find('span.value').text(String(value)).removeClass('negative');
                    $this.parent().find('input').val(value);
                    $this.find('.ui-slider-range').removeClass('range-negative');
                }
            }
        });
    },
    reset_data: function () {
        $('section.option_buttons .reset_button').click(function (e) {
            e.preventDefault();
            $('.slider').slider('value',0).find('.ui-slider-range').removeClass('range-negative').parent().parent().find('input').val('0').parent().find('span.plus_minus').removeClass('negative').text('+').parent().find('span.value').removeClass('negative').text('0');
            cp.data_entry.module.notes.reset();
            return false;
        });
    }
};

$(function () {
    cp.data_entry.academic.init();
    cp.data_entry.academic.setup_slider();
});
