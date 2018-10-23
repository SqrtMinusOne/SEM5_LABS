const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const fs = require('fs');
const routes = require("./routes");

let private_key = fs.readFileSync('ssl/express.key');
let certificate = fs.readFileSync('ssl/express.crt');

let credentilals = {
    "key": private_key,
    "cert": certificate
};

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(__dirname + "/html"));
server.use('/lib', express.static(__dirname + "/lib"));
server.use('/css', express.static(__dirname + "/css"));
server.use('/res', express.static(__dirname + "/res"));
server.use('/js', express.static(__dirname + "/javascript"));
server.use("/", routes);

let https_server = https.createServer(credentilals, server);
let http_server = http.createServer(server);
https_server.listen(8443, ()=>{ // Запуск
    console.log("HTTPS server started at https://localhost:8443")
});
http_server.listen(8000, ()=>{
    console.log("HTTP server started at http://localhost:8000");
});
