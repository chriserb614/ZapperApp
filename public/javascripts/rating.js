$(document).ready(function() {
    
    var clickedValue = 0;

    // one star events
    $('#1Star').mouseenter(function() {
        $('#1Star').replaceWith("<i class='fas fa-star fa-2x' style='color: #e5c100'></i>")
        $('#starTitle').html($('#1Star').attr('title'))
    });

    $('#1Star').mouseleave(function() {
        $('#1Star').replaceWith("<i class='far fa-star fa-2x' style='color: #e5c100'></i>")
        $('#starTitle').html('');
    });

    $('#1Star').on('click', function() {
        clickedValue = 1;
        console.log('Clicked value is ' + clickedValue)
    });


    // $('#rate').on('click', function() {
        
    //     var critique = $('#critique').val();
    //     var workId = $('#workId').attr('title');

    //     var valid = true;

    //     if(clickedValue === 0 || clickedValue > 5) {
    //         valid = false;
    //         $('#error').html("<div class='alert alert-danger'> Please give a rating and review before you submit.</div>");
    //     } else {
    //         $('#error').html('');
    //     }

    //     if (valid === true) {
    //         $.ajax({
    //             url: '/reviews/' + workId,
    //             type: "POST",
    //             data: {
    //                 rating: clickedValue,
    //                 critique: critique
    //             }
    //         });
    //     } else {
    //         return false;
    //     }

    // });
});