// @flow

$(()=>{
    $( "#content_container" ).draggable({
        containment: "#containment-wrapper"
    }).resizable({
        minHeight: 150,
        minWidth: 550
    });
});

$(document).ready(()=>{
    $.ajax({
        'url': '/users/all',
        'method': 'GET',
        'success': updateTable
    })
});

function updateTable(users){
    let table = $("#user_table");
    users.forEach((user)=>{
        let row = $("<tr>");
        let name = $("<td>").text(user.name);
        let login = $("<td>").text(user.username);
        let type = $("<td>").text(user.is_admin ? 'Администратор' : 'Участник');
        let online = $("<td>").text(user.is_authenticated ? 'Онлайн' : 'Оффлайн');
        row.append(name, login, type, online);
        table.append(row);
    });
}