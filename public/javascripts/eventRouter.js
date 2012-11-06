var socket = io.connect('http://localhost:3000');

socket.on('roomList', function(rooms){
    $('#roomList').empty();
    for(var room in rooms){
        if (room != ''){
            var roomName = room.slice(1);
            $('#roomList').append('<input type="button" id="' + roomName + '" class="existingRoom" value="' + roomName + '">');
        }
    }
});

$('#createRoom').live('click', function(){
    socket.emit('createNewRoom');
    showGameContainer();
});

$('.existingRoom').live('click', function(){
    var room = $(this).attr('id');
    socket.emit('joinRoom', room);
    showGameContainer();
});

$('#leaveRoom').live('click', function(){
    socket.emit('leaveRoom');
    showRoomContainer();
});

function showGameContainer(){
    $('#roomContainer').hide();
    $('#canvasContainer').show();
}

function showRoomContainer(){
    $('#canvasContainer').hide();
    $('#roomContainer').show();
}