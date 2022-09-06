var fs = require('fs');

module.exports = function(req, res) {
    console.log(req.body);
    userobj = req.body;
    let uArray = [];
    fs.readFile('./server/data/users.json', 'utf8', function(err, data) {
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(uArray)
        uArray.push(userobj);
        console.log(uArray)

        uArrayjson = JSON.stringify(uArray);
        fs.writeFile('server/data/users.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
            res.send(uArray);
        });
    });
}