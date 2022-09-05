var fs = require('fs');

module.exports = function(req, res) {
    let userobj = {
        "username": req.body.username,
        "birthdate": req.body.userbirthdate,
        "age": req.body.userage,
        "email": req.body.useremail,
        "password": req.body.userpwd
    }
    let uArray = [];
    fs.readFile('server/data/extendedUsers.json', 'utf8', function(err, data) {
        if (err) throw err;
        uArray = JSON.parse(data);
        uArray.push(userobj);
        console.log(userobj)

        uArrayjson = JSON.stringify(uArray);
        fs.writeFile('server/data/extendedUsers.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
            res.send(uArray);
        });
    });
}