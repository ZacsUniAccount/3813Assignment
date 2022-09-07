var fs = require('fs');

module.exports = function(req, res) {
    let uArray = [];
    
    fs.readFile('./server/data/users.json', 'utf8', function(err, data) {
        //above path is in respect to where we run server.js
        if (err) throw err;
        let userArray = JSON.parse(data);
        userArray.forEach(user => {
            uArray.push(user.username)
        });
        res.send({'users': uArray})
    });
}