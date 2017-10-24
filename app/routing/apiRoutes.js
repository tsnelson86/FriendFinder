var friendsData = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    friendsData.push(req.body);
    var match = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    var userData = req.body;
    var userName = userData.name;
    var userPhoto = userData.photo;
    var userScores = userData.scores;
    var scoreDiff = 0;

    for  (var i=0; i < friendsData.length; i++) {
      scoreDiff = 0;
      for (var j = 0; j < friendsData[i].scores[j]; j++){
        scoreDiff += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
        if (scoreDiff <= match.friendDifference){
          match.name = friendsData[i].customerName;
          match.photo = friendsData[i].photo;
          match.friendDifference = scoreDiff;
        }
      }
    }
    res.json(match);
  });
};