var fs = require('fs');

module.exports = function(req, res) {
    console.log(req.body)
    var u = req.body.username;
    /*var p = req.body.pwd;
    c = u + ' ' + p;
    console.log(c)*/

    fs.readFile('./server/data/users.json', 'utf8', function(err, data) {
        //above path is in respect to where we run server.json
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
                res.send({user: userArray[i]});
                console.log(true)
            }
    });
}