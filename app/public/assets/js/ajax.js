function validateForm() {
    var valid = true;
    var userData = {};
    userData.name = $('#name').val();
    userData.photo = $('#photo').val();
    userData.scores = [];

    //push scores to score array - do this better
    $('.question').each(function(index) {
        userData.scores.push(Number($(this).val()));
    });
    //check if name or photo are filled out
    if (userData.name === '' || userData.photo === '') {
        valid = false;
        return valid;
    }
    //check to make sure scores are not equal to 0
    for (i = 0; i < userData.scores.length; i++) {
        if (userData.scores[i] === 0) {
            valid = false;
            return valid;
        }
    }
    //if everything passes, return true
    return userData;
}

// save the form inputs when submit button clicked
$('body').on('click', '#submit', function(e) {
    e.preventDefault();
    var validated = validateForm();
    if (validated) {
        var userData = validated;
        // set currentURL
        var currentURL = window.location.origin;
        //ajax post to /api/friends
        $.ajax({
            type: "POST",
            url: currentURL + "/api/friends",
            data: userData
        }).done(function(data) {
            // console.log(data); //lines 13-41 in apiRoutes.js is how we get this data
            $('#best-friend-name').text(data.name);
            $('#best-friend-image').attr('src', data.photo);
            $("#results-modal").modal('toggle');
        }).fail(function() {
            console.log('ajax post to /api/friends failed.');
        });
    } else {
        alert('fill out all of the fields in the form please.');
    }
});