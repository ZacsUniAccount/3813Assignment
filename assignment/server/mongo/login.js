//Module to connect to the database and check whether login credientials match a user

module.exports = function (db, app) {
    app.post('/api/login', function (req, res) {
        console.log("login is running")
        if (!req.body) { return res.sendStatus(400) } //Check login details were entered and received
        console.log(req.body)
        user = req.body;
        const collection = db.collection('users');

        //Open the database and find a username matching the one entered, then check the passwords match.
        collection.find({ 'username': user.username }).toArray((err, data) => { //find username and add the corresponding object to an array
            info = data[0] //Save the array object into just an object
            console.log(info)
            if (data.length == 0) { //If the data does not contain any values
                res.send({ result: null, "err": "no matching username" }) //Send back an error
            } else { //If the object does exist
                if (info.password == user.password) { //Chack the given password matches the users password
                    res.send({ 'result': info }) // if yes, send back the users details
                } else {
                    res.send({ result: null, err: "no matching password" }) //If no, send back an error message
                }
            }
        })
    })
}