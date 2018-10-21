const express = require("express");
const router = express.Router();
const path = require("path");
const gallery = require("./data/gallery");

router.get("/", (req, res, next)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
    next();
});

router.get("/gallery", (req, res, next)=>{
    res.json(gallery);
    next();
});

router.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});
module.exports = router;