$(document).ready(function() {
    

    $('#addFriendBTN').on('click', function() {
        var friendId = $(this).attr('title');

        $.ajax({
            method: 'POST',
            url: '/users/' + friendId,
            data: {
                recevingId: friendId
            },
            success: function() {
                $('#addFriendBTN').css('display', 'none');
            },
            error: function(err) {
                console.log("err is " + err);
            }
        });
    });

    $('#acceptFriendBTN').on('click', function() {
        var friendId = $(this).attr('title');

        $.ajax({
            method: 'POST',
            url: '/users/' + friendId,
            data: {
                recevingId: friendId
            },
            success: function() {
                $('#addFriendBTN').css('display', 'none');
            },
            error: function(err) {
                console.log("err is " + err);
            }
        });
    });


});