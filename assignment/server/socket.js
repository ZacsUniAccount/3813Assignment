//
//This modile creates a socket io connection and checks when users join, and message a room
//

module.exports = {
    connect: function(io, PORT) {
        io.on('connection',(socket) => {
            //When a connection request comes in output to the server console
            console.log('user connection on port ' + PORT + ' : ' + socket.id);

            //when a message comes in emit it back to all sockets with the message.
            socket.on('message',(message) => {
                io.emit('message',message);
            })
        });
    }
}