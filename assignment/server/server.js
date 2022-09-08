var express = require('express');
var app = express();

//Cross origin
var cors = require('cors');
app.use(cors());


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + '/../dist/week4tut'));
console.log(__dirname);

const PORT = 3000;
const http = require('http').Server(app);
const server = require('./listen.js');
server.listen(http, PORT)

app.post('/api/auth', require('./router/postLogin'));
app.post('/api/newUser', require('./router/newUser'));
app.get('/api/allUsers', require('./router/allUsers'));
app.post('/api/deleteUser', require('./router/deleteUser'));
app.get('/api/allGroups', require('./router/allGroups'));
app.post('/api/addGroup', require('./router/addGroup'));
app.post('/api/addChannel', require('./router/addChannel'))
app.post('/api/addGroupUser', require('./router/addGroupUser')); 
//app.post('api/addChannelUser', require('./router/addChannelUser')); 
