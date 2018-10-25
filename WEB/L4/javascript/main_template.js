// @flow

function logout() {
    $.ajax({
        url: '/users/logout',
        method: 'POST',
        success: ()=>{
            console.log('Logout received ok');
            location.reload();
        }
    });
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
            let navbar = $("#main_navbar");
            let right = $("#main_navbar_right");
            const button_settings = 'w3-bar-item w3-button w3-hover-blue w3-mobile';
            if (user.username) {
                const main_button = $('<a>').addClass(button_settings)
                    .attr('href', '/').text('Ход торгов');
                const gallery_button = $('<a>').addClass(button_settings)
                    .attr('href', '/gallery').text('Галерея');
                navbar.append(main_button, gallery_button);
                if (user.is_admin){

                    const list_button = $('<a>').addClass(button_settings)
                        .attr('href', '/user_list').text('Список участников');
                    const settings_button = $('<a>').addClass(button_settings)
                        .attr('href', '/settings').text('Настройки');
                    navbar.append(list_button, settings_button);
                }
                const user_type = $('<div>').addClass('w3-bar-item w3-mobile')
                    .text(user.is_admin ? '[Администратор]' : '[Участник]');
                const user_name = $('<b>').addClass('w3-bar-item w3-mobile')
                    .text(user.name);
                const logout_button = $('<button>').addClass('w3-bar-item w3-button w3-red w3-mobile')
                    .click(logout).text('Выйти');
                right.append(user_type, user_name, logout_button)


            }
            else{
                let login_button = $('<a>').addClass(button_settings)
                    .attr('href', '/').text('Логин');
                let registration = $('<a>').addClass(button_settings)
                    .attr('href', '/registration').text('Регистрация');
                navbar.append(login_button, registration);
            }
        },
    })
});

function message(text){
    $("#message").text(text).dialog('open');
}