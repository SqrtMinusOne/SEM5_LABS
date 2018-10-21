const express = require('express');
const server = express();

const routes = require("./routes");

server.use("/", express.static(__dirname + "/html"));
server.use('/lib', express.static(__dirname + "/lib"));
server.use('/css', express.static(__dirname + "/css"));
server.use('/res', express.static(__dirname + "/res"));
server.use('/js', express.static(__dirname + "/javascript"));

server.use("/", routes);
server.listen(3000, ()=>{ // Запуск
    console.log("Server started at http://localhost:3000")
});