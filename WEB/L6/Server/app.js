"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var cors = require("cors");
var winston_1 = require("./winston");
var stocks_router_1 = require("./stocks_router");
var app = express();
winston_1.logger.verbose('Initialization');
winston_1.logger.verbose("Current working directory is " + process.cwd());
app.use(morgan('combined', { stream: winston_1.logger_stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", cors(), stocks_router_1.stock_router);
app.listen(3000, function () {
    winston_1.logger.verbose("HTTP server started at http://localhost:3000");
});
