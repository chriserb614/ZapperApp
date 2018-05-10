$(document).ready(function() {

    var clickedValue = 0;

    // one star events
    function removeStar(num) {
        if (num < 1) {

            $('#1Star,#2Star,#3Star,#4Star,#5Star').removeClass("fas")
        } else if (num < 2) {
            $('#2Star,#3Star,#4Star,#5Star').removeClass("fas")
        } else if (num < 3) {
            $('#3Star,#4Star,#5Star').removeClass("fas")
        } else if (num < 4) {
            $('#4Star,#5Star').removeClass("fas")
        } else if (num < 5) {
            $('#5Star').removeClass("fas")
        }
    }
    $('#1Star').hover(function() {
            $('#1Star').addClass("fas")
        },
        function() {
            removeStar(clickedValue)
        });
    $('#2Star').hover(function() {
            $('#1Star,#2Star').addClass("fas")
        },
        function() {
            removeStar(clickedValue)
        });
    $('#3Star').hover(function() {
            $('#1Star,#2Star,#3Star').addClass("fas")
        },
        function() {
            removeStar(clickedValue)
        });
    $('#4Star').hover(function() {
            $('#1Star,#2Star,#3Star,#4Star').addClass("fas")
        },
        function() {
            removeStar(clickedValue)
        });
    $('#5Star').hover(function() {
            $('#1Star,#2Star,#3Star,#4Star,#5Star').addClass("fas")
        },
        function() {
            removeStar(clickedValue)
        });

    $(document).on('click', '#1Star', function() {

        if (clickedValue === $('#1Star').attr('Value')) {
            clickedValue = 0
        } else {
            clickedValue = $('#1Star').attr('Value')
        }
        removeStar(clickedValue)
        $('#starRating').val(clickedValue)
        console.log('Clicked value is ' + $('#starRating').val())

    });
    $(document).on('click', '#2Star', function() {
        if (clickedValue === $('#2Star').attr('Value')) {
            clickedValue = 0
        } else {
            clickedValue = $('#2Star').attr('Value')
            $('#1Star,#2Star').addClass("fas")
        }
        removeStar(clickedValue)
        $('#starRating').val(clickedValue)
        console.log('Clicked value is ' + clickedValue)
    });
    $(document).on('click', '#3Star', function() {
        if (clickedValue === $('#3Star').attr('Value')) {
            clickedValue = 0
        } else {
            clickedValue = $('#3Star').attr('Value')
            $('#1Star,#2Star,#3Star').addClass("fas")
        }
        removeStar(clickedValue)
        $('#starRating').val(clickedValue)
        console.log('Clicked value is ' + clickedValue)
    });
    $(document).on('click', '#4Star', function() {
        if (clickedValue === $('#4Star').attr('Value')) {
            clickedValue = 0
        } else {
            clickedValue = $('#4Star').attr('Value')
            $('#1Star,#2Star,#3Star,#4Star').addClass("fas")
        }
        removeStar(clickedValue)
        $('#starRating').val(clickedValue)
        console.log('Clicked value is ' + clickedValue)
    });
    $(document).on('click', '#5Star', function() {
        if (clickedValue === $('#5Star').attr('Value')) {
            clickedValue = 0
        } else {
            clickedValue = $('#5Star').attr('Value')
            $('#1Star,#2Star,#3Star,#4Star,#5Star').addClass("fas")
        }
        removeStar(clickedValue)
        $('#starRating').val(clickedValue)
        console.log('Clicked value is ' + clickedValue)

    });

});