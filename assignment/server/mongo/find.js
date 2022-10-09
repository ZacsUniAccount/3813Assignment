

module.exports = function(db, app){
    app.get('/api/find', function(req, res){
        const collection = db.collection('users'); //Set the collection to find from
        userlist = []
        console.log("Finding users")

        collection.find({}).toArray().then(function(docs) {
            docs.forEach(user => {
                userlist.push(user.username)
            });
            res.send({err: null, users: userlist})
        })
    })
}