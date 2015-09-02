$(document).ready(function() {
    //on
    $('#Submit').on('click', function (e) {
        e.preventDefault();
        var $first = $('#firstName').val();
        var $last = $('#lastName').val();
        if($first != '' && $last != '') {
            var newStudent = {
                firstName: $first,
                lastName: $last
            };
            document.getElementById('NewStudent').reset();
            $.ajax({
                method: 'POST',
                url: '/students',
                data: newStudent
            }).done(function (data) {
                $.ajax({
                    method: 'GET',
                    url: '/students'
                }).done(function (data) {
                    $studentsUl = $('#contents');
                    $studentsUl.empty();
                    data.forEach(function (student, index) {
                        $studentLi = $('<li>');
                        $studentLi.text((index + 1) + '. ' + student.firstname + ' ' + student.lastname);
                        $studentsUl.append($studentLi);
                    });
                    $('#Total').text(data.length);
                }).fail(function () {
                    alert('FAIL!')
                }).always(function () {
                    console.log('Second Ajax done.');
                })
            }).fail(function () {
                alert('FAIL!')
            }).always(function () {
                console.log('Ajax done')
            });
        } else {
            alert('Add student names first.');
        }
    });
});
