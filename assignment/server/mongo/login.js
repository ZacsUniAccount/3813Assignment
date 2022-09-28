module.exports = function(db,app){
    app.post('/api/login', function(req,res){
        console.log("login is running")
        if (!req.body) {return res.sendStatus(400)}
        console.log(req.body)
        user = req.body;
        const collection = db.collection('users');

        collection.find({'username':user.username}).toArray((err, data) => {
            info = data[0]
            console.log(info)
            if (data.length == 0) {
                res.send({result:null, "err":"no matching username"})
            } else {
                if (info.password == user.password){
                    res.send({'result': info})
                } else {
                    res.send({result:null, err:"no matching password"})
                }
            }
        })
        })
}