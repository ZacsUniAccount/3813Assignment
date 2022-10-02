var fs = require('fs');
//
//Module to create a new group
//
module.exports = function (req, res) {
    console.log(req.body);
    let groupobj = req.body
    let g = req.body.title;
    let gArray = [];

    fs.readFile('./server/data/groups.json', 'utf8', function (err, data) { //Reads the groups JSON file
        //above path is in respect to where we run server.js
        if (err) throw err;
        let groupArray = JSON.parse(data); //Turn file into an object
        let i = groupArray.findIndex(group => (group.title == g)); //Check if the group being created already exists
        if (i == -1) {
            gArray = JSON.parse(data);
            gArray.push(groupobj); //Add the new group to the object

            gArrayjson = JSON.stringify(gArray); //Let the object be a string
            fs.writeFile('server/data/groups.json', gArrayjson, 'utf-8', function (err) { //rewrite the groups JSON file with the new object
                if (err) throw err;
                res.send({ "valid": true, "msg": "Successfully created group" }); //Send a confirmation message
            });
        } else {
            res.send({ "valid": false, "msg": "A group with this name already exists" }); //If the group already exists send back an error message
        }
    });
}