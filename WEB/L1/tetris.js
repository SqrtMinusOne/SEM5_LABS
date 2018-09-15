var columns = 10, rows = 20; //Size of tetris
var score = 0; //Score
var lines = 0; //Lines
var level = 1; //Current level

function getName() {
    return localStorage["tetris.username"]
}

function updateInfo(){
    document.getElementById("info").innerHTML = "Login: " + getName() +
        "<br> Lines: " + lines + "<br>Score: " + score + "<br>Level: " + level;
}

function init(){
    updateInfo();
    var canvas = new Canvas();
    canvas.drawRect(2, 3, "#FF0000");
}

init()