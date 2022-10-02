var fs = require('fs');
//
//This module to add channels to a group
//
module.exports = function (req, res) {
    console.log("addChannel running")
    let g = req.body.group; // g = Group
    let channel = req.body.channel

    fs.readFile('./server/data/groups.json', 'utf8', function (err, data) { //Open the JSON file holding the group information
        //above path is in respect to where we run server.js
        if (err) throw err;
        let groupArray = JSON.parse(data);
        let i = groupArray.findIndex(group => (group.title == g)); //Find the index of the given group in the JSON file
        if (i == -1) { console.log("Cannot add channel to group, as group does not exist") } else { //If it doesnt exist, give an error message
            let selectedGroup = groupArray[i] //If it does exist remember which index it is
            let x = selectedGroup.channel.findIndex(c => c.title == channel.title) //Attempt to find the index of the channel being added
            if (x != -1) { res.send({ "msg": "Channel already exists" }) } else { //If it already exists, give an error message
                selectedGroup.channel.push(channel) //If it does not exist, add the channel to the group
                fs.writeFile('server/data/groups.json', JSON.stringify(groupArray), 'utf-8', function (err) { //Write the object back to the JSON file 
                    if (err) throw err;
                    res.send({ "valid": true, "msg": "Successfully created group" }); //Send a validation message
                });
            }
        }
    })
}