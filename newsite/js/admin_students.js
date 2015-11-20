$(function () {
	var alreadyDone = {};
	var currentPage = window.location.href.split('/admin_students/')[1].split('/');
	if (typeof currentPage[0] === "undefined") {
		currentPage[0] = "";
	}
	if (typeof currentPage[1] === "undefined") {
		currentPage[1] = "";
	}
	$.each(teacherObj.classes, function (i, value) {
		if (typeof teacherObj.class_info[value] !== "undefined") {
			if (teacherObj.class_info[value].school === eeDatas.currentSchool && typeof alreadyDone[teacherObj.class_info[value].grade] === "undefined") {
				alreadyDone[teacherObj.class_info[value].grade] = true;
				if (teacherObj.class_info[value].grade.replace(/ /g, '_').toLowerCase() === currentPage[1]) {
					var closer = "open";
					if (currentPage[0] === 'add_students') {
						var opener1 = 'sub_block active';
						var opener2 = "sub_block";
					} else if (currentPage[0] === 'view_profiles') {
						var opener1 = "sub_block";
						var opener2 = 'sub_block active';
					}
				} else {
					var closer = "closed";
					var opener1 = "sub_block";
					var opener2 = "sub_block";
				}
				var str = '<section class="navigation_item ' + closer + '">' +
                    '<a href="#" class="navigation_block">' +
                        '<span>' + teacherObj.class_info[value].grade.toUpperCase() + '</span>' +
                        '<div class="arrow"></div>' +
                    '</a>' +
                    '<section class="sub_item">' +
                        '<a href="http://mycompendium.net/admin_students/add_students/' + teacherObj.class_info[value].grade.replace(/ /g, '_').toLowerCase() + '" class="' + opener1 + '"><span>Add/Edit Students</span></a>' +
                        '<a href="http://mycompendium.net/admin_students/view_profiles/' + teacherObj.class_info[value].grade.replace(/ /g, '_').toLowerCase() + '" class="' + opener2 + '"><span>View Profiles</span></a>' +
                        '<a target="_blank" href="http://mycompendium.net/admin_students/print_profiles/' + teacherObj.class_info[value].grade.replace(/ /g, '_').toLowerCase() + '" class="sub_block"><span>Print Profiles</span></a>' +
                    '</section>' +
                '</section>';
                $('.data_entry_navigation').append(str);
				//$('.navigation_block span:contains("' + teacherObj.class_info[value].grade.toUpperCase() + '")').parent().parent().removeClass('hidden');
			}
		}
	});
	//$('section.hidden').remove();
});