$(document).ready(function() {
    //on click run two ajax requests
    $('#Submit').on('click', function (e) {
        e.preventDefault();
        //collect values from the form
        var $first = $('#firstName').val();
        var $last = $('#lastName').val();
        //if there are values add to object that will be sent to server
        if($first != '' && $last != '') {
            var newStudent = {
                firstName: $first,
                lastName: $last
            };
            //reset form and send first POST request to add data to the server
            document.getElementById('NewStudent').reset();
            $.ajax({
                method: 'POST',
                url: '/students',
                data: newStudent
            }).done(function (data) {
                //when first request is done send second request for all data for students and append to dom - numbered
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
            //if there is no data in the form on button click this will happen
            alert('Add student names first.');
        }
    });
});
