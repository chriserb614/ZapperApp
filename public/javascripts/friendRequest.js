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

    $('.friendBTN').on('click', function() {
        switch (this.id) {

            case "acceptFriendBTN" :
                alert("you've accepted the friend")
                break;
            case "declineFriendBTN" :
                alert('Friendship declined!')
                break;
        }
    });


});