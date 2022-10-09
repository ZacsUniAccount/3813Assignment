//Importing and using many node modules the app depends on
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/../dist/week4tut'));
console.log(__dirname);
const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId
const PORT = 3000;
const http = require('http').Server(app);
const server = require('./listen.js');
server.listen(http, PORT)
const sockets = require('./socket.js');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
sockets.connect(io, PORT);

//For connecting to mongo endpoints and connecting to the mongodb
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    if (err) {return console.log(err)}
    const dbName = 'assignment';
    const db = client.db(dbName)

    require('./mongo/add.js')(db,app)
    require('./mongo/login.js')(db,app)
    require('./mongo/delete')(db, app)
    require('./mongo/find')(db, app)
})

//Endponts that the server uses. See file for explinations
app.get('/api/allGroups', require('./router/allGroups'));
app.post('/api/addGroup', require('./router/addGroup'));
app.post('/api/addChannel', require('./router/addChannel'))
app.post('/api/addGroupUser', require('./router/addGroupUser')); 