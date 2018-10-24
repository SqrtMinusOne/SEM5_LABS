function logout() {
    $.post('/users/logout');
    location.reload();
}

$(()=>{
    $("#message").dialog({
        modal:true,
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    }).dialog('close');
});

$(document).ready(()=>{
    $.ajax({
        url: '/users/current',
        type: 'GET',
        success: (user)=> {
            $("#user_info").text(user.username);
        }
    })
});

function message(text){
    $("#message").text(text).dialog('open');
}