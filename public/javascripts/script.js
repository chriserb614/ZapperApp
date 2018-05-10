$(document).ready(function() {
    $('#button').click(function(){
        var selectAgeRange = $('#agerange').val()
        var selectType = $('#type').val()
        var selectGenre = $('#genre').val()
        var selectLength = $('#length').val()

        var myObject = {
            selectAgeRange: selectAgeRange,
            selectType: selectType,
            selectGenre: selectGenre,
            selectLength: selectLength,
        }

        console.log(myObject);
        
        $.ajax({
            method: 'POST',
            url: 'users/searchFeed',
            data: myObject,
            success: function() {
               console.log('posted to SearchFeed');
               
            },
            error: function(err) {
                console.log(err);
            }
        }).then(function(data){
            console.log(data);
            
        }).catch(function(err){
            console.log(err);
            
        })
    })
    
    console.log("connected")
});