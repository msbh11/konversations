const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000 ;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connect', function(socket) {
    console.log("A new user just connected");
    
    socket.on('join', function(params, callback){
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required.');
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage("Admin",`Welcome to the ${params.room}`));

        socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin","New user joined!"));
        callback();
    })

    socket.on('createMessage', function (message, callback) {
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){

            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback("This is server");
    });

    socket.on('createLocationMessage', function(coords){
        let user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', 
        generateLocationMessage(user.name, coords.lat, coords.lng
        ))
    })

    socket.on('disconnect', function() {
        // console.log('User was disconnected. ');
        let user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} left ${user.room} chat room`));
        }
    });

})

server.listen(port, ()=>{
    console.log(`server is up on port ${port}`);
})
 