var fs = require('fs');
const allUsers = require('./allUsers');

module.exports = function (req, res) {
    let u = req.body.user;
    let uArray = [];
    let g = req.body.group
    let Array = [];
    let allusers = []
    let used = false

    var fs = require('fs');

    console.log(u)
    console.log("addGroupUser running");


    console.log("adding users")

    fs.readFile('./server/data/users.json', 'utf8', function (err, data) {
        //above path is in respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data);
        userArray.forEach(user => {
            uArray.push(user.username)
        });
        console.log("----------")
        console.log(uArray)
        uArray.forEach(user => {
            console.log("1: " + user + " | 2: " + u)
            if (user == u) {
                used = true
                console.log("match!")
            }
        })

        if (used) {
            fs.readFile('./server/data/groups.json', 'utf8', function (err, data) {
                //above path is in respect to where we run server.js
                if (err) throw err;
                let groupArray = JSON.parse(data);
                let i = groupArray.findIndex(group => (group.title == g));
                if (i == -1) { alert("Cannot add channel to group, as group does not exist") } else {
                    let selectedGroup = groupArray[i]
                    selectedGroup.users.push(u)
                    fs.writeFile('server/data/groups.json', JSON.stringify(groupArray), 'utf-8', function (err) {
                        if (err) throw err;
                        res.send({ "valid": true, "msg": "Successfully added to group" });
                    });
                }
            })
        } else {
            res.send({ "msg": "User does not exist" })
        }

    });



}

