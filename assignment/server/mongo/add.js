//This module is responsible for adding users to the mongodb

module.exports = function (db, app) {
    app.post('/api/add', function (req, res) {
        console.log("add")
        if (!req.body) { return res.sendStatus(400) } //Check that the body contains a value
        console.log(req.body)
        user = req.body;
        const collection = db.collection('users');

        //open the database and check if the username exists. If it doesn't add a new user
        collection.find({ 'username': user.username }).count((err, count) => {  //count matching usernames
            if (count == 0) { //if it doesnt exist
                collection.insertOne(user, (err, dbres) => { //insert the new login details
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({ 'num': num, err: null })
                })
            } else { //If it does
                res.send({ num: 0, err: "duplicate item" }) //Do not add the details, inform the client the username already exists
            }
        })
    })
}