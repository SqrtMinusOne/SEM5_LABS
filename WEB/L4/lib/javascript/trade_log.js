//      


var user;
var msg_number = 0;

function startSockets() {
    let socket = io.connect('http://localhost:3030');
    socket.on("connect", () => {
        socket.json.emit("connected", {"name": user.name});
    });
    socket.on("joined", (msg) => {
        addMessage(msg.time, msg.message, 'w3-dark-gray');
    });
    socket.on("picture_init", (msg)=>{
        addMessage(msg.time, msg.message, 'w3-red')
    });
    socket.on("start_auc_info", (msg)=>{
        addMessage(msg.time, msg.message, 'w3-orange');
    });
    socket.on("user_in_info", (msg)=>{
        addMessage(msg.time, msg.message, 'w3-blue');
    });
    socket.on("user_stake_info", (msg)=>{
        addMessage(msg.time, msg.message, 'w3-deep-purple');
    });
    socket.on("stop_auc", (msg)=>{
        addMessage(msg.time, msg.message, 'w3-black');
    });
    socket.on('auc_finished', (msg)=>{
        addMessage(msg.time, msg.message, 'w3-green');
    })
}

function addMessage(time, message, cls) {
    msg_number++;
    let table = $("#trade_table tbody");
    let row = $('<tr>').addClass(cls);
    let time_info = $('<td>').text(time);
    let msg_info = $('<td>').text(message);
    row.append(time_info, msg_info);
    table.prepend(row);
    if (msg_number > 10){
        $("#trade_table tr:last").remove();
    }
}

$(document).ready(()=>{
    $.ajax({
        url: '/users/current',
        type: 'GET',
        success: (user_)=>{
            user = user_;
            startSockets();
        }
    });
});