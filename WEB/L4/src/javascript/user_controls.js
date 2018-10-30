// @flow

var socket;
var current_user;
var current_params;
var parts = false;

$(document).ready(()=>{
    socket = io.connect('http://localhost:3030');
    socket.on("picture_id", (msg)=>{
        $("#request_button").removeAttr('disabled');
        $("#new_price_input").val(msg.start_price);
        current_params = msg;
        current_params.price = msg.start_price - msg.min_step + 1;
        parts = false;
    });
    socket.on('start_auc_info', ()=>{
        if (parts) {
            $("#set_button").removeAttr('disabled');
            $("#new_price_input").removeAttr('disabled');
        }
        else{
            $("#request_button").attr('disabled', 'disabled');
        }
    });
    socket.on('user_stake_price', (info)=>{
        current_params.price = parseInt(info.price);
    });
    socket.on('stop_auc_info',()=>{
        $("#set_button").attr('disabled', 'disabled');
        $("#new_price_input").attr('disabled', 'disabled');
    });
    $.ajax({
        url: '/users/current',
        method: 'GET',
        success: (user)=>{
            current_user = user;
        }
    })
});

function participate(){
    parts = true;
    socket.json.emit('user_in', {"id": current_user._id, "name": current_user.name});
    $("#request_button").attr('disabled', 'disabled');
}

function newPrice(){
    let price = $('#new_price_input').val();
    if ((price >= current_params.price + current_params.min_step) &&
        (price <= current_params.price + current_params.max_step)){
        socket.json.emit('user_stake', {
            "id": current_user._id,
            "name": current_user.name,
            "price": price
        });
    }
    else{
        let text = 'Неверно задана цена <br>' +
            `Минимальная цена - ${current_params.price + current_params.min_step} <br>` +
            `Максимальная цена - ${current_params.price + current_params.max_step}`;
        $("#message").text(text).dialog('open');
    }
}