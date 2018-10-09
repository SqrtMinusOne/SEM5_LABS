const express = require("express");
const server = express();
const routes = require("./routes");
server.use('/public', express.static('public'));
server.use('/stylesheets', express.static('stylesheets'));
server.set("view engine", "pug");
server.set("views", `./views`);
server.use("/", routes);
server.listen(3000, ()=>{ // Запуск
    console.log("Server started at http://localhost:3000")
});