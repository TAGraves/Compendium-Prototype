cp.weekpicker = true;
cp.data_entry.attendance = {
    create_tables: function () {
        var str = 
            '<table class="fixed_header">' +
                '<thead>' +
                    '<tr>' +
                        '<th title="" class="first student_name">STUDENT&nbsp;NAME</th>' +
                        '<th title="" class="monday">MONDAY</th>' +
                        '<th title="" class="tuesday">TUESDAY</th>' +
                        '<th title="" class="wednesday">WEDNESDAY</th>' +
                        '<th title="" class="thursday">THURSDAY</th>' +
                        '<th title="" class="friday">FRIDAY</th>' +
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
    attendance_html: function (day, row_id, column_id, value) {
        var str =                     
            '<td class="' + day + ' ' + value + '">' +
                '<input type="hidden" name="attendance_record_fields[' + row_id + '][col_id_' + column_id + ']" value="' + value + '">' +
            '</td>';
        return str;
    },

    cell_check_all: function () {
        $('td.student_name').toggle(function () {
            var $this = $(this);
            $this.parent().children(':not(".student_name, .notes")').removeClass('absent').removeClass('tardy').addClass('present').find('input').val('present');
        }, function () {
            var $this = $(this);
            $this.parent().children(':not(".student_name, .notes")').removeClass('present').removeClass('absent').addClass('tardy').find('input').val('tardy');
        }, function () {
            var $this = $(this);
            $this.parent().children(':not(".student_name, .notes")').removeClass('present').removeClass('tardy').addClass('absent').find('input').val('absent');
        });
    },
    cell_toggle_value: function () {
        $('td').click(function() {
            var $this = $(this);
            if ($this.hasClass('present')) {
                $this.removeClass('present').addClass('tardy').find('input').val('tardy');
            } else if ($this.hasClass('tardy')) {
                $this.removeClass('tardy').addClass('absent').find('input').val('absent');
            } else if ($this.hasClass('absent')) {
                $this.removeClass('absent').addClass('present').find('input').val('present');
            }
        });
    },
    go_button: function () {
        cp.data_entry.get_class_list("get_attendance_records", cp.data_entry.attendance.go_sorter);
    },
    go_sorter: function (bool,data) {
        if (bool) {
            cp.data_entry.attendance.process_previous_list(data);
        } else {
            cp.data_entry.attendance.process_class_list(data);
        }
    },
    init: function () {
        cp.data_entry.attendance.go_button();
    },
    process_class_list: function (data) {
        $('section.data form').append(cp.data_entry.attendance.create_tables());
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
                        'attendance_record_fields',
                        'row_new_' + i,
                        {
                            student_id: '36',
                            teacher_id: '37',
                            student_name: '38',
                            class_id: '39'
                        },
                        {
                            student_id: data.students[i].id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.students[i].first_name + ' ' + data.students[i].last_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                     cp.data_entry.attendance.attendance_html('monday', 'row_new_' + i, '30', 'present') +
                     cp.data_entry.attendance.attendance_html('tuesday', 'row_new_' + i, '31', 'present') +
                     cp.data_entry.attendance.attendance_html('wednesday', 'row_new_' + i, '32', 'present') +
                     cp.data_entry.attendance.attendance_html('thursday', 'row_new_' + i, '33', 'present') +
                     cp.data_entry.attendance.attendance_html('friday', 'row_new_' + i, '34', 'present') +
                     cp.data_entry.module.notes.html('attendance_record_fields','row_new_' + i , '35' ,'') + 
                '</tr>'
            );
        });        
        $('.ajax_loading').remove();
        cp.data_entry.module.header.functionality();
        cp.data_entry.table_hover.cell();
        cp.data_entry.module.notes.functionality(11);
        cp.data_entry.attendance.cell_toggle_value();
        cp.data_entry.attendance.reset_data();
        cp.data_entry.attendance.cell_check_all();
    },
    process_previous_list: function (data) {
        $('section.data form').append(cp.data_entry.attendance.create_tables());
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
                        'attendance_record_fields',
                        'row_id_' + data.entries[i].row_id,
                        {
                            student_id: '36',
                            teacher_id: '37',
                            student_name: '38',
                            class_id: '39'
                        },
                        {
                            student_id: data.entries[i].student_id,
                            teacher_id: eeDatas.currentID,
                            student_name: data.entries[i].student_name,
                            class_id: cp.data_entry.selected_id
                        }
                     ) +
                     cp.data_entry.attendance.attendance_html('monday', 'row_id_' + data.entries[i].row_id, '30', data.entries[i].monday) +
                     cp.data_entry.attendance.attendance_html('tuesday', 'row_id_' + data.entries[i].row_id, '31', data.entries[i].tuesday) +
                     cp.data_entry.attendance.attendance_html('wednesday', 'row_id_' + data.entries[i].row_id, '32', data.entries[i].wednesday) +
                     cp.data_entry.attendance.attendance_html('thursday', 'row_id_' + data.entries[i].row_id, '33', data.entries[i].thursday) +
                     cp.data_entry.attendance.attendance_html('friday', 'row_id_' + data.entries[i].row_id, '34', data.entries[i].friday) +
                     cp.data_entry.module.notes.html('attendance_record_fields', 'row_id_' + data.entries[i].row_id , '35' , data.entries[i].notes) + 
                '</tr>'
            );
        });
        $('.ajax_loading').remove();
        cp.data_entry.module.header.functionality();
        cp.data_entry.table_hover.cell();
        cp.data_entry.module.notes.functionality(11);
        cp.data_entry.attendance.cell_toggle_value();
        cp.data_entry.attendance.reset_data();
        cp.data_entry.attendance.cell_check_all();

    },
    reset_data: function () {
        $('section.option_buttons .reset_button').click(function (e) {
            e.preventDefault();
            $('td.tardy, td.absent').addClass('present').removeClass('tardy').removeClass('absent');
            $('td.present input').val('present');
            cp.data_entry.module.notes.reset();
            return false;
        });
    }
};

$(function () {
    cp.data_entry.attendance.init();
});
