//Starts the server

module.exports = {
    listen: function (app, PORT) {
        app.listen(PORT, () => {
            let d = new Date();
            let h = d.getHours();
            let m = d.getMinutes();
            console.log('Server has started on port ' + PORT +
                ' at ' + h + ':' + m)
        });

    }
}
