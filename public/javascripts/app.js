$(document).ready(function() {
    //on
    $('#Submit').on('click', function (e) {
        e.preventDefault();
        var newStudent = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val()
        };
        document.getElementById('NewStudent').reset();
        $.ajax({
            method: 'POST',
            url: '/students',
            data: newStudent
        }).done(function (data) {
            $.ajax({
                method: 'GET',
                url:'/students'
            }).done(function(data){
                $studentsUl = $('#contents');
                $studentsUl.empty();
                data.forEach(function(student){
                    $studentLi = $('<li>');
                    $studentLi.text(student.firstname + ' ' + student.lastname);
                    $studentsUl.append($studentLi);
                    $('#Total').text(data.length);
                })
            }).fail(function(){
                alert('FAIL!')
            }).always(function(){
                console.log('Second Ajax done.');
            })
        }).fail(function () {
            alert('FAIL!')
        }).always(function () {
            console.log('Ajax done')
        });
    });
});
