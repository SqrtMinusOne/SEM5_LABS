// @flow

$(()=>{
    $( "#content_container" ).draggable({
        containment: "#containment-wrapper"
    }).resizable({
        minHeight: 285,
        minWidth: 255,
    });
});


function login() {
    $.ajax({
        url: '/users/login',
        method: 'POST',
        data: {
            username: $("#login_input").val(),
            password: $("#password_input").val()
        },
        success: ()=>{
            location.reload();
        },
        error: (data)=>{
            message(data.responseText);
        }
    })
}