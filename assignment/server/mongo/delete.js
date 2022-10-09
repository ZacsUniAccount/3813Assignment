module.exports = function(db, app) {
    app.post('/api/delete', function(req, res) {
        user = req.body.user //Get user to delete
        console.log(user)
        const collection = db.collection('users'); //Set the collection to delete from

        collection.deleteMany({"username": user}, function(err, results) { //delete from collection
            console.log("removed user with name: " + user) //confirm
            res.send({err: null, msg: "Successfully removed user: " + user}) //send back no error
        })
    })   
}