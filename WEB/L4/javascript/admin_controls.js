// @flow

var socket;

$(document).ready(()=>{
    $.ajax({
        url: '/set/gallery',
        method: 'GET',
        success: (gallery)=>{
            let select =$("#pictures_select");
            gallery.forEach((picture)=>{
                let option = $('<option>').val(picture._id).text(picture.name);
                if (!picture.buyer)
                    select.append(option);
            })
        }
    });
    socket = io.connect('http://localhost:3030');
    socket.on('start_auc_info', ()=>{
        $('#set_button').attr('disabled', 'disabled');
        $('#start_auc_button').attr('disabled', 'disabled');
    });
    socket.on('stop_auc_info', (msg)=>{
        $(`#pictures_select option[value=${msg.id}]`).remove();
        $('#set_button').removeAttr('disabled');
        $("#pictures_select").removeAttr('disabled');
    })
});

function setPicture() {
    let select =  $('#pictures_select');
    let id = select.val();
    socket.json.emit('picture_set', {"id": id});
    $('#start_auc_button').removeAttr('disabled');
    select.attr('disabled', 'disabled');
    $("#set_button").attr('disabled', 'disabled');
}

function startAuction(){
    let select =  $('#pictures_select');
    let id = select.val();
    socket.json.emit('start_auction', {"id": id});
}