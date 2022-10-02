var fs = require('fs');
//
// This module gets all users usernames and sends them to the client
//
module.exports = function(req, res) {
    console.log("allUsers running");
    let uArray = [];
    
    fs.readFile('./server/data/users.json', 'utf8', function(err, data) { //Read the users JSON file
        //above path is in respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data); //Turn the file into an object
        userArray.forEach(user => { //Add each object username to an array
            uArray.push(user.username)
        });
        res.send({'users': uArray}) //send the array back to the client
    });
}