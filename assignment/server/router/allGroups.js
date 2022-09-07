var fs = require('fs');

module.exports = function(req, res) {
    let gArray;
    
    fs.readFile('./server/data/groups.json', 'utf8', function(err, data) {
        //above path is in respect to where we run server.js
        if (err) throw err;
        console.log(data)
        gArray = JSON.parse(data)
        res.send({'groups': gArray})
    });
}