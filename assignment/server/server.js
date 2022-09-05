const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
const sockets = require('./socket.js');
const server = require('./listen.js');
//const request = require('request');

//Define port used for the server
const PORT = 3000;

//Apply express middleware
app.use(cors());

//setup Socket
sockets.connect(io, PORT);

//Start server listening for requests
server.listen(http, PORT)

app.post('/api/auth', require('./router/postLogin'));

/*
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + '/../dist/chat'));
console.log(__dirname);


var server = http.listen(3000, function() {
    console.log("Server listening on port: 3000");
});

//app.post('/api/auth', require('./router/postLogin'));

//app.post('/loginafter', require('./router/postLoginafter'));
*/