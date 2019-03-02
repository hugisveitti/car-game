

// or with import syntax

var socket = io();


socket.on('updaterooms', (current_room) => {

})


function sendRoomNum(e){
    var roomNum = document.getElementById("room-num");
    var newRoom = roomNum.value;
    var currRoom = document.getElementById('curr-room-num');
    console.log(currRoom)
    currRoom.innerHTML = "Current Room is " + newRoom + ", please connect to this room on your other device.";
    socket.emit('switchRoom', newRoom);

}

socket.on('updatedRoom', (data) => {
    console.log(data);
    if(data.ready){
        beginGame();
    }
});


function beginGame(){
    console.log("game beginning");
    var connInfo = document.getElementById("connection-info");
    connInfo.style.display = "none";
    var gameContainer = document.getElementById("game-container");
    gameContainer.style.visibility = "visible";
    startTheGame();
}
