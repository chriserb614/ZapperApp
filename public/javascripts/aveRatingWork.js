$(document).ready(function() {
    //console.log($('[rate="1"]'))
    //renderStar($('#aveRate').text())
    // $('#1Star,#2Star,#3Star,#4Star,#5Star').addClass("fas")
    $('[rate="0"]').html(`<i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>`)
    $('[rate="1"]').html(`<i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>`)
    $('[rate="2"]').html(`<i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>`)
    $('[rate="3"]').html(`<i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>`)
    $('[rate="4"]').html(`<i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x' style='color: #e5c100'></i>`)
    $('[rate="5"]').html(`<i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>
                        <i class='far fa-star fa-1x fas' style='color: #e5c100'></i>`)


    /*  function renderStar(num) {
         $('#1Star,#2Star,#3Star,#4Star,#5Star').addClass("fas")
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
     } */
})