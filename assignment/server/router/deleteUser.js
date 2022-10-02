const { json } = require('express');
var fs = require('fs');
// This module needs updating into mongo
//This module deletes users from a JSON file
//
module.exports = function(req, res) {   
    console.log("deleteUser running");
    selectedUser = req.body.user;

    fs.readFile('./server/data/users.json', 'utf8', function(err, data) { //Read the users JSON file
        //above path is in respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data); //Turn the file into an array of objects
        //Check the user exists
        let i = userArray.findIndex(user => (selectedUser == user.username)); //Check the user exists
        if (i == -1){ res.send({'msg': 'Error: User not found'}) } else { //If they dont, send back an error message
            userArray.splice(i, 1)// If they do exist, cut them out of the array
            let uArray = JSON.stringify(userArray) //Turn the object back into string
            fs.writeFile('server/data/users.json', uArray, 'utf-8', function(err) { //Write the string back to the file
                if (err) throw err;
                res.send({'msg': 'User ' + selectedUser + ' has been removed!'}) //Send confirmation message
            })
        }
    });
}