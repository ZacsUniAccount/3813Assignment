module.exports = function(db,app){
    app.get('/api/read', function(req, res){
        console.log("read")
        const collection = db.collection('assignment');
        collection.find({}).toArray((err,data) =>{
            res.send(data)
        })
    })
}