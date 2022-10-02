var express = require('express');
var app = express();

//Cross origin
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

const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
const sockets = require('./socket.js');
sockets.connect(io, PORT);

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    if (err) {return console.log(err)}
    const dbName = 'assignment';
    const db = client.db(dbName)

    require('./mongo/add.js')(db,app)
    require('./mongo/login.js')(db,app)
    /*
    require('./mongo/update.js')(db,app, ObjectID)
    require('./mongo/remove.js')(db,app, ObjectID)
    require('./mongo/validid.js')(db,app)
    */
})

app.post('/api/auth', require('./router/postLogin'));
app.post('/api/newUser', require('./router/newUser'));
app.get('/api/allUsers', require('./router/allUsers'));
app.post('/api/deleteUser', require('./router/deleteUser'));
app.get('/api/allGroups', require('./router/allGroups'));
app.post('/api/addGroup', require('./router/addGroup'));
app.post('/api/addChannel', require('./router/addChannel'))
app.post('/api/addGroupUser', require('./router/addGroupUser')); 
//app.post('api/addChannelUser', require('./router/addChannelUser')); 

