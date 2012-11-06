var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    path = require('path'),
    routes = require('./routes');

server.listen(3000);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);


io.sockets.on('connection', function(socket){
    console.log('User connected: ' + socket.id);

    sendRoomList(socket);
    console.log('Sent room list');

    socket.on('createNewRoom', function(){
        var roomName = socket.id + "'s Room";
        socket.join(roomName);
        console.log('Created new room: ' + roomName);

        sendRoomList(socket);
        console.log(io.sockets.manager.rooms);


    })

    socket.on('joinRoom', function(room){
        socket.join(room);
        console.log('Joined room: ' + room);
    });
});

function sendRoomList(socket){
    var rooms = io.sockets.manager.rooms;
    socket.emit('roomList', rooms);
    console.log('Sent room list');
}
