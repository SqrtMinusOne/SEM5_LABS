const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require("path");
const gallery = require("./data/gallery");
const contacts = require("./data/contacts");
let settings = require("./data/settings");

function saveJSON(object, path){
    fs.writeFile(path, JSON.stringify(object));
}

function responseOK(){
    return {
        "ok": true,
        "message": ""
    }
}
function copyObject(src) {
    return Object.assign({}, src);
}

function responseError(message){
    return {
        "ok": false,
        "message": message
    }
}

router.get("/", (req, res, next)=>{
    res.sendFile('index.html');
    next();
});

router.get("/members", (req, res, next)=>{
    res.sendFile('members.html');
    next();
});

router.put("/", (req, res, next)=>{
    let obj = req.body;
    if (obj.id == -1)
        obj.id = gallery.length;
    obj.img['start_price'] = parseInt(obj.img['start_price']);
    obj.img['min_step'] = parseInt(obj.img['min_step']);
    obj.img['max_step'] = parseInt(obj.img['max_step']);
    obj.img['for_auction'] = obj.img['for_auction'] === 'true';
    gallery[obj.id] = obj.img;
    saveJSON(gallery, "data/gallery.json");
    res.json(responseOK());
    next();
});

router.delete('/:num([0-9]{1,})', (req, res, next)=>{
    const id = req.params.num;
    if (id in gallery){
        gallery.splice(id, 1);
        saveJSON(gallery, "data/gallery.json");
        res.json(responseOK());
    }
    else{
        res.json(responseError("Bad DELETE request: there is no such book"));
    }
    next();
});

router.put("/members", (req, res, next)=>{
    let obj = req.body;
    if (obj.id == -1)
        obj.id = contacts.length;
    contacts[obj.id] = obj.member;
    saveJSON(contacts, "data/contacts.json");
    res.json(responseOK());
    next();
});

router.delete('/members/:num([0-9]{1,})', (req, res, next)=>{
    const id = req.params.num;
    if (id in contacts){
        contacts.splice(id, 1);
        saveJSON(contacts, "data/contacts.json");
        res.json(responseOK());
    }
    else{
        res.json(responseError("Bad DELETE request: there is no such book"));
    }
    next();
});

router.put('/settings', (req, res, next)=>{
    let obj = req.body;
    settings = obj;
    saveJSON(settings, "data/settings.json");
    res.json(responseOK());
    next();
});

router.get("/gallery", (req, res, next)=>{
    res.json(gallery);
    next();
});

router.get("/settings_json", (req, res, next)=>{
    res.json(settings);
    next();
});

router.get("auc_gallery", (req, res, next)=>{
    obj = [];
    for (let i=0; i < gallery.length; i++){
        if (gallery[i].for_auction)
            obj.push(gallery[i]);
    }
    res.json(obj);
    next();
});

router.get("/contacts", (req, res, next)=>{
    res.json(contacts);
    next();
});

router.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});
module.exports = router;