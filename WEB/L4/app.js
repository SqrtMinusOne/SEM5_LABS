const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");
const users = require("./users");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require('connect-mongo')(session);

const server = express();
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
    console.log("Connection to mongoDB ok");
}).catch(()=>{
    console.log("Connection to mongoDB failed")
}).then(()=>{
    server.use('/lib', express.static(__dirname + "/lib"));
    server.use('/css', express.static(__dirname + "/css"));
    server.use('/javascript', express.static(__dirname + "/javascript"));
    server.set('view engine', 'pug');
    server.set('views', './views');
    server.listen(3000, ()=>{
        console.log("HTTP server started at http://localhost:3000");
    });
});

