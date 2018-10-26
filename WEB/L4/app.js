// @flow

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require("express-session");
const winston = require('./logger');
const morgan = require('morgan');
const mongoStore = require('connect-mongo')(session);

const sockets = require('./sockets');
const routes = require("./routes");
const users = require("./users");
const settings = require("./set");

const server = express();
winston.verbose('Initialization');

server.use(morgan('combined', {stream: winston.stream}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/web_l4').then(()=>{
    server.use(session({
        secret: 'The stars align',
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({mongooseConnection: mongoose.connection})
    }));
    server.use("/", routes);
    server.use("/users", users);
    server.use("/set", settings);
    winston.verbose("Connection to mongoDB ok");
}).catch((error)=>{
    winston.error("Connection to mongoDB failed");
    winston.error(error);
}).then(()=>{
    server.use('/lib', express.static(__dirname + "/lib"));
    server.use('/res', express.static(__dirname + "/res"));
    server.use('/css', express.static(__dirname + "/css"));
    server.use('/javascript', express.static(__dirname + "/javascript"));
    server.set('view engine', 'pug');
    server.set('views', './views');
    server.listen(3000, ()=>{
        winston.verbose("HTTP server started at http://localhost:3000");
    });
    sockets.startSocketServer();
});


