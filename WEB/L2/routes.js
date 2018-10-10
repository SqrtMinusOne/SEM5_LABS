const express = require("express");
const router = express.Router();
const library = require("./library");
function newBook(){
    return {
        "author": "",
        "name": "",
        "number": 0,
        "publish_date": "0000-00-00",
        "readers": []
    }
}
router.get("/", (req, res, next)=>{
    res.render('login', {title: 'Login'});
    next();
});
router.put('/book', (req, res, next)=>{
    let book_info = req.body;
    if (("id" in book_info) && ("name" in book_info) && ("author" in book_info) &&
        ("number" in book_info) && ("publish_date" in book_info)) {
        if (!(book_info["id"] in library))
            library[book_info["id"]] = newBook();
        let book = library[book_info["id"]];
        book["name"] = book_info["name"];
        book["author"] = book_info["author"];
        book["number"] = book_info["number"];
        book["publish_date"] = book_info["publish_date"];
        res.json({"ok": true});
    }
    else{
        res.json({"ok": false});
    }
    next();
});
router.delete('/book/:num([0-9]{1,})', (req, res, next)=>{
    const id = req.params.num;
    if (id in library){
        library.splice(id, 1);
        res.json({"ok": true});
    }
    else{
        res.json({"ok": false});
    }
    next();
});
router.delete('/book/:num([0-9]{1,})/:reader_num([0-9]{1,})', (req, res, next)=>{
    const id = req.params.num;
    const reader = req.params.reader_num;
    if (id in library){
        if (reader in library[id]["readers"]) {
            library[id]["readers"].splice(reader, 1);
            res.json({"ok": true});
        }
        else
            res.json({"ok": false})
    }
    else{
        res.json({"ok": false});
    }
    next();
});
router.get('/index', (req, res, next)=>{
    res.render('index', {title: 'Index', library: library});
    next()
});
router.get('/book/:num([0-9]{1,})', (req, res, next)=>{
    const id = req.params.num;
    let book;
    if (id in library)
        book = library[id];
    else{
        book = newBook();
    }
    res.render('book', {title: 'Book', book: book, id: id});
    next()
});
router.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});
module.exports = router;