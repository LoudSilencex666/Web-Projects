var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

var adminpanelEmitters = require('./emitters/adminpanelEmitters');

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');
    adminpanelEmitters.loadUserData(socket, io);
    adminpanelEmitters.loadGroupElements(socket, io);
    adminpanelEmitters.addUserData(socket, io);
    adminpanelEmitters.editUserData(socket, io);
    adminpanelEmitters.deleteUserData(socket, io);
    
    socket.on("disconnect", function(){
        console.log('User disconnected'); 
    });
});


module.exports = socketApi;