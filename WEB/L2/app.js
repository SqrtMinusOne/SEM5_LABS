const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
const routes = require("./routes");

server.use('/javascript', express.static('javascript'));
server.use('/stylesheets', express.static('stylesheets'));
server.set("view engine", "pug");
server.set("views", `./views`);
server.use("/", routes);
server.listen(3000, ()=>{ // Запуск
    console.log("Server started at http://localhost:3000")
});