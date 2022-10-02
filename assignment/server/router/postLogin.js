var fs = require('fs');
// THIS MODULE IS NO LONGER USED, THE MONGODB VERSION IS USED INTEAD
//This module checks login credentials
//
const testmode = false
module.exports = function(req, res) {
    console.log("postLogin running");
    console.log(req.body)
    var u = req.body.username;
    /*var p = req.body.pwd;
    c = u + ' ' + p;
    console.log(c)*/

    if (testmode == true) {
        file = "./server/data/testUsers.json"
    } else {
        file = "./server/data/users.json"
    }
    fs.readFile(file, 'utf8', function(err, data) {
        //above path is in respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data);
        //console.log(userArray);
        let i = userArray.findIndex(user =>
            ((user.username == u)/* && (user.password == p)*/));
            if (i == -1) {
                res.send({"valid": false});
                console.log('false')
            } else {
                userArray[i].valid = true;
                res.send({user: userArray[i], "valid": true});
                console.log(true)
            }
    });
}