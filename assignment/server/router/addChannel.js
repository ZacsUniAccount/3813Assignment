var fs = require('fs');

module.exports = function(req, res) {
    console.log("addCHannel running")
    //console.log(req.body);  //{ group: 'group1', channel: { title: 'asas', users: [] } }
    let g = req.body.group;
    let channel = req.body.channel
    
    fs.readFile('./server/data/groups.json', 'utf8', function(err, data) {
        //above path is in respect to where we run server.js
        if (err) throw err;
        let groupArray = JSON.parse(data);
        let i = groupArray.findIndex(group => (group.title == g));
        if (i == -1) {console.log("Cannot add channel to group, as group does not exist")} else {
            let selectedGroup = groupArray[i]
            let x = selectedGroup.channel.findIndex(c => c.title == channel.title)
            if (x != -1) { res.send({"msg": "Channel already exists"}) } else {
                //console.log(selectedGroup)
                selectedGroup.channel.push(channel)
                fs.writeFile('server/data/groups.json', JSON.stringify(groupArray), 'utf-8', function(err) {
                    if (err) throw err;
                    res.send({"valid": true, "msg": "Successfully created group"});
                });
            }
        }

    })
/*
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
*/
    
}