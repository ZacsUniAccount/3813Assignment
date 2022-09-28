module.exports = function(db,app){
    app.post('/api/add', function(req,res){
        console.log("add")
        if (!req.body) {return res.sendStatus(400)}
        console.log(req.body)
        user = req.body;
        const collection = db.collection('users');

        collection.find({'username':user.username}).count((err,count) => {
            if (count == 0){
                collection.insertOne(user,(err,dbres)=> {
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num':num,err:null})
                })
            } else {
                res.send({num:0, err:"duplicate item"})
            }
        })
    })
}