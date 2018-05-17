var friendData = require("../data/friends");

module.exports = function(app) {
    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    //A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function(req, res) {
        var newFriend = req.body,
            userAnswers = newFriend.scores, // Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
            scoresArr = [];

        //With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
        friendData.forEach(function(element, index) {
            var totalDifference = 0;

            userAnswers.forEach(function(score, scoreIndex) {
                var userScore = Number(score),
                    friendScore = Number(element.scores[score]),
                    absValueDiff = (userScore - friendScore);
                totalDifference += absValueDiff;
            });

            totalDifference = Math.abs(totalDifference);
            scoresArr.push(totalDifference);
        });

        friendData.push(newFriend); // push to friendData array

        var bestMatch = Math.min.apply(Math, scoresArr), // get min value of scoresArr
            bestMatchIndex = scoresArr.indexOf(bestMatch), // get the index value of the bestMatch
            bestFriend = friendData[bestMatchIndex]; // assign bestFriend to pass back to the .done ajax function on the client side

        res.json(bestFriend); // here we send back the bestFriend data to the .done() function in the ajax call
    });
};