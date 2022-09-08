var fs = require('fs');

module.exports = function(req, res) {
    console.log(req.body);
    let groupobj = req.body
    let g = req.body.title;
    let gArray = [];
    
    fs.readFile('./server/data/groups.json', 'utf8', function(err, data) {
        //above path is in respect to where we run server.js
        if (err) throw err;
        let groupArray = JSON.parse(data);
        let i = groupArray.findIndex(group => (group.title == g));
            if (i == -1) {
                //fs.readFile('./server/data/users.json', 'utf8', function(err, data) {
                    if (err) throw err;
                    gArray = JSON.parse(data);
                    gArray.push(groupobj);
            
                    gArrayjson = JSON.stringify(gArray);
                    fs.writeFile('server/data/groups.json', gArrayjson, 'utf-8', function(err) {
                        if (err) throw err;
                        res.send({"valid": true, "msg": "Successfully created group"});
                    });
                //});
            } else {
                res.send({"valid": false, "msg": "A group with this name already exists"});
            }
    });

    
}