"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var cors = require("cors");
var http = require("http");
var winston_1 = require("./winston");
var stocks_router_1 = require("./stocks_router");
var socket_controller_1 = require("./socket_controller");
winston_1.logger.verbose('Initialization');
winston_1.logger.verbose("Current working directory is " + process.cwd());
var app = express();
var server = http.createServer(app);
new socket_controller_1.SocketController(server, stocks_router_1.market);
app.use(morgan('combined', { stream: winston_1.logger_stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", cors(), stocks_router_1.stock_router);
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    winston_1.logger.verbose("Server listening at " + addr.address + ":" + addr.port);
});
