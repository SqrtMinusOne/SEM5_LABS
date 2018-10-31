// @flow

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require("express-session");
const winston = require('./logger');
const morgan = require('morgan');
const mongoStore = require('connect-mongo')(session);
const path = require('path');
const domain = require('domain');

const sockets = require('./auction');
const routes = require("./routes");
const users = require("./users");
const settings = require("./set");
const mongoU = require("./api/mongo_user");

const server = express();
winston.verbose('Initialization');
winston.verbose(`Current working directory is ${process.cwd()}`);

server.use(morgan('combined', {stream: winston.stream}));
server.use((req, res, next)=>{
    const dom = domain.create();

    res.once('finish', ()=>{
        dom.exit();
        dom.removeAllListeners();
    });

    dom.once('error', function (e) {
        if (!res.headersSent) {
            let error = e && e.stack || util.inspect(e || 'no error trace available');
            winston.log({level: 'error', message: error});
            res.status(500).json({
                error: error
            });
        }
    });

    dom.run(next);

});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/web_l4').then(()=>{
    server.use(session({
        secret: 'The stars align',
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({mongooseConnection: mongoose.connection})
    }));
    mongoU.clearAuths();
    //throw "Error Error Error";
    winston.verbose("Connection to mongoDB ok");
    server.use("/", routes);
    server.use("/users", users);
    server.use("/set", settings);
    server.use('/lib', express.static(path.join(process.cwd(), "/lib")));
    server.use('/res', express.static(path.join(process.cwd(), "/res")));
    server.use('/css', express.static(path.join(process.cwd(), "/css")));
    server.use('/javascript', express.static(path.join(process.cwd(), "/src/javascript")));
    server.set('view engine', 'pug');
    server.set('views', './views');
    server.listen(3000, ()=>{
        winston.verbose("HTTP server started at http://localhost:3000");
    });
    sockets.startSocketServer();
}).catch((error)=>{
    winston.log({level: 'error', message: error});
});
