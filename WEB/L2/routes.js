const express = require("express");
const router = express.Router();
const library = require("./library");
router.get("/", (req, res, next)=>{
    res.render('login', {title: 'Login'});
    next();
});
router.get('/index', (req, res, next)=>{
    res.render('index', {title: 'Index', library: library});
    next()
});
router.get('/book/:num([0-9]{1,})', (req, res, next)=>{
    const id = req.params.num;
    res.render('book', {title: 'Book', book: library[id]});
    next()
});
router.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});
module.exports = router;