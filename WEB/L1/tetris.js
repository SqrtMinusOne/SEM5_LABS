var columns = 10, rows = 20; //Size of tetris
var score = 0; //Score
var record = 0; //Record
var lines = 0; //Lines
var lines_level = 0; //Lines to next level
var level = 0; //Current level
var board = []; //Board
var figure = null; //Current figure
var next_figure = null; //Next figure
var canvas = null; //Canvas
var next_canvas = null; //Next figure canvas
var render_interval = null;


function updateInfo(){
    document.getElementById("info").innerHTML = "Login: " + localStorage["tetris.username"] +
        "<br> Lines: " + lines + "<br>Level: " + level + "<br>Score: " + score +
        "<br> Record: " + record;
}

function keyListener(event) {
    const keyName = event.key;
    switch (keyName) {
        case 'ArrowLeft':
            moveFigure(-1, 0);
            break;
        case 'ArrowRight':
            moveFigure(1, 0);
            break;
        case 'ArrowDown':
        case ' ':
            moveFigure(0, 1);
            break;
        case 'ArrowUp':
            rotateFigure();
            break;
    }
}

function moveFigure(x, y) {
    move = true;
    matr = figure.makeMatr();
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if ((matr[i][j] == 1)){
                move = move && (figure.x + i + x >=0) && (figure.x + i + x < columns);
                move = move && (figure.y + j + y >=0) && (figure.y + j + y < rows);
                move = move && (!board[figure.x + i + x][figure.y + j + y]);
                if (!move)
                    break;
            }
        }
    }
    if (move){
        figure.x += x;
        figure.y += y;
    }
    if ((!move) && (x === 0) && (y === 1)){
        saveFigure();
        figure = newFigure();
    }
    updateAll();
}

function rotateFigure() {
    figure.rotate();
    matr = figure.makeMatr();
    rotate = true;
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if ((matr[i][j] == 1)){
                rotate = rotate && (figure.x + i >=0) && (figure.x + i < columns);
                rotate = rotate && (figure.y + j >=0) && (figure.y + j < rows);
                rotate = rotate && (!board[figure.x + i][figure.y + j]);
                if (!rotate)
                    break;
            }
        }
    }
    if (!rotate)
        figure.rotateBack();
    updateAll();
}

function saveFigure() {
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if ((matr[i][j] == 1)){
                board[i + figure.x][j + figure.y] = figure.color;
            }
        }
    }
}

function newFigure() {
    let fig = next_figure;
    next_figure = Figure.makeFigure(Math.floor(Math.random() * 7));
    next_figure.color = "#" + Math.random().toString(16).slice(2, 8);
    next_canvas.render(null, next_figure);
    if (!fig) {
        fig = Figure.makeFigure(Math.floor(Math.random() * 7));
        fig.color = "#" + Math.random().toString(16).slice(2, 8);
    }
    fig.x = Math.floor(Math.floor(Math.random() * (columns - 3)));
    success = true;
    matr = fig.makeMatr();
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if ((matr[i][j] == 1)){
                success = success && !board[i + fig.x][j + fig.y];
            }
        }
    }
    if (!success){
        gameOver();
    }
    return fig;
}

function updateAll(){
    checkLines();
    updateInfo();
    canvas.render(board, figure);
}

function checkLines() {
    remove = false;
    for (let i = 0; i < rows; i++) {
        remove_here = true;
        for (let j = 0; j < columns; j++) {
            remove_here = remove_here && board[j][i];
            if (!remove_here)
                break;
        }
        if (remove_here) {
            remove = true;
            for (let j = 0; j < columns; j++) {
                board[j].splice(i, 1);
                board[j].unshift(0);
            }
            break;
        }
    }
    if (remove) {
        document.getElementById("line").play();
        lines++;
        lines_level++;
        score = score + level * 100;
        if (lines_level > 10){
            document.getElementById("level_up").play();
            lines_level = 0;
            level++;
            startRender(1000/level);
        }
        if (record < score)
            record = score;
        checkLines();
    }
}

function init(){
    canvas = new Canvas(columns, rows, "tetrisfield");
    next_canvas = new Canvas(4, 4, "nextfigure");
    document.addEventListener('keydown', keyListener);
    newGame();
}

function newGame(){
    for (let i=0; i<columns; i++){
        board[i] = [];
        for (let j=0; j<rows; j++){
            board[i][j] = 0;
        }
    }
    score = 0;
    level = 1;
    lines_level = 0;
    updateInfo();
    figure = newFigure();
    updateAll();
    startRender(1000 - level*100);
}

function startRender(speed){
    if (speed <= 0)
        speed = 100;
    if (render_interval)
        clearInterval(render_interval);
    render_interval = setInterval(() => {moveFigure(0, 1)}, speed);
}

function gameOver(){
    alert("Game over! Score: " + score);
    newGame();
}

init();