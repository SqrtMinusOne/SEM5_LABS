$(()=>{
    $( "#content_container" ).draggable({
        containment: "#containment-wrapper"
    }).resizable({
        minHeight: 285,
        minWidth: 255,
    });
});


function create(){
    user_data = {
        username: $("#login_input").val(),
        password: $("#password_input").val(),
        is_admin: $("#type_input option:selected").text() === 'true',
        is_authenticated: false
    };
    if (!((user_data.username) && (user_data.password))){
        message('Введите логин и пароль')
    }
    else{
        $.ajax({
            url: '/users',
            type: 'POST',
            data: user_data,
            success: ()=>{
                window.open('/', '_self')
            },
            error: (data)=>{
                message(data.responseText);
            }
        })
    }
}