var fs = require('fs');
const allUsers = require('./allUsers');
//
// This module is not used
//
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

    checkUsers(u)
        .then(() => addUser())

    function addUser() {
        console.log("adding users")
        if (this.used) {
            fs.readFile('./server/data/groups.json', 'utf8', function (err, data) {
                //above path is in respect to where we run server.js
                if (err) throw err;
                console.log("1")
                let groupArray = JSON.parse(data);
                console.log("2")
                let i = groupArray.findIndex(group => (group.title == g));
                console.log("3")
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
    }

}


function checkUsers(u) {
    console.log("checkuser running")
    let uArray = [];
    return new Promise((resolve) => {
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
                if (user == u) {
                    used = true
                }
            })

        });
        resolve("done")
    })
}

