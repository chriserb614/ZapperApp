$(document).ready(function() {
    
    // $(document).on(‘click’, ‘someyourContainer .dropdown-menu’, function (e) {
    //     e.stopPropagation();
    // });

    $('#addFriendBTN').on('click', function() {
        var friendId = $(this).attr('title');
        $('#addFriendBTN').css('display', 'none');
        $('#friendSuccess').css('visibility', 'visible');

        $.ajax({
            method: 'POST',
            url: '/users/' + friendId,
            data: {
                recevingId: friendId
            },
            success: function(data) {
                console.log(data)
            },
            error: function(err) {
                console.log("err is " + err);
            }
        });
    });

    $('.friendBTN').on('click', function() {

        var recevingId = $(this).attr('title');

        switch (this.id) {

            case "acceptFriendBTN" :

                $('#friendAlert').hide();
                $('#friendAdded').show();

                $.ajax({
                    method: "POST",
                    url: '/users/' + recevingId + '/addFriend',
                    data: {
                        recevingId: recevingId
                    },
                    success: function(data) {
                        console.log(data);
                        console.log("success");
                    },
                    error: function(err) {
                        console.log("err is " + err);
                    }
                });

                break;
            case "declineFriendBTN" :

                $('#friendAlert').hide();
                $('#friendDeclined').show();
                break;
        }
    });


});