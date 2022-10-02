var fs = require('fs');
//
// This module sends all groups back to the user
//
module.exports = function(req, res) {
    console.log("allGroups running");
    let gArray;
    
    fs.readFile('./server/data/groups.json', 'utf8', function(err, data) { //Read the groups JSON file
        //above path is in respect to where we run server.js
        if (err) throw err;
        gArray = JSON.parse(data) //Turn it into an object
        res.send({'groups': gArray}) //Send it back
    });
}