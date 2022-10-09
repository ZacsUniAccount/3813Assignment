var fs = require('fs');
const allUsers = require('../mongo/find');
//
//This module checks a user exists and them to a group
//
module.exports = function (req, res) {
    let u = req.body.user; //User
    let uArray = [];
    let g = req.body.group //Group
    let used = false //Assume the user does not exist until proven otherwise

    //Firstly, check the user being added exists
    fs.readFile('./server/data/users.json', 'utf8', function (err, data) { //Read the JSON file with users
        //above path is in respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data);
        userArray.forEach(user => { //Add each user to an array
            uArray.push(user.username)
        });
        uArray.forEach(user => { //Loop through the array
            if (user == u) { //Check whether the user passed in matches a user in the array
                used = true //Set used to true
            }
        })

        //If the user exists
        if (used) {
            fs.readFile('./server/data/groups.json', 'utf8', function (err, data) { //Read the group JSON file
                //above path is in respect to where we run server.js
                if (err) throw err;
                let groupArray = JSON.parse(data); //Turn the file into an object
                let i = groupArray.findIndex(group => (group.title == g)); //Check the group being added to exists
                if (i == -1) { alert("Cannot add channel to group, as group does not exist") } else { //If it doesn't, send an error message
                    let selectedGroup = groupArray[i] //If it does, save the index of the group
                    selectedGroup.users.push(u) //Add the user to the group
                    fs.writeFile('server/data/groups.json', JSON.stringify(groupArray), 'utf-8', function (err) { //Write the object back to the file
                        if (err) throw err;
                        res.send({ "valid": true, "msg": "Successfully added to group" }); //Send a validation message
                    });
                }
            })
        } else {
            res.send({ "msg": "User does not exist" }) //If user does not exist, send an error message
        }
    });
}

