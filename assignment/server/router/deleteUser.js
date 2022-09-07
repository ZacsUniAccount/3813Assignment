const { json } = require('express');
var fs = require('fs');

module.exports = function(req, res) {   
    selectedUser = req.body.user;

    fs.readFile('./server/data/users.json', 'utf8', function(err, data) {
        //above path is in respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data);
        //Check the user exists
        let i = userArray.findIndex(user => (selectedUser == user.username));
        if (i == -1){ res.send({'msg': 'Error: User not found'}) } else {
            userArray.splice(i, 1)
            let uArray = JSON.stringify(userArray)
            fs.writeFile('server/data/users.json', uArray, 'utf-8', function(err) {
                if (err) throw err;
                res.send({'msg': 'User ' + selectedUser + ' has been removed!'})
            })
        }
    });
}