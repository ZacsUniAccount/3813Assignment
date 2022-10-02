var fs = require('fs');
//THIS MODULE IS NO LONGER USED. INSTEAD WE USE THE MONGO VERSION
//This module adds users to the users arrasy
//
module.exports = function(req, res) {
    console.log("newUser running");
    console.log(req.body);
    userobj = req.body;
    let u = userobj.username;
    let uArray = [];
    
    fs.readFile('./server/data/users.json', 'utf8', function(err, data) {
        //above path is in respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data);
        let i = userArray.findIndex(user => (user.username == u));
            if (i == -1) {
                //fs.readFile('./server/data/users.json', 'utf8', function(err, data) {
                    if (err) throw err;
                    uArray = JSON.parse(data);
                    uArray.push(userobj);
            
                    uArrayjson = JSON.stringify(uArray);
                    fs.writeFile('server/data/users.json', uArrayjson, 'utf-8', function(err) {
                        if (err) throw err;
                        res.send({"valid": true, "msg": "Successfully created user"});
                    });
                //});
            } else {
                res.send({"valid": false, "msg": "A user with this name already exists"});
            }
    });

    
}