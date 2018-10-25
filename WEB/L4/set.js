// @flow

const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoP = require("./api/mongo_pictures");
const mongoS = require("./api/mongo_setting");

const fs = require('fs');
const upload = multer({
    dest: 'uploads/'
});

router.get('/picture/:id', (req, res, next)=>{
    console.log('GET /set/picture');
    mongoP.findPictureById(req.params.id).then((picture)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(picture));
    })
});

router.get('/gallery', (req, res, next)=>{
    console.log('GET /set/gallery');
    mongoP.returnGallery().then((gallery)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(gallery));
    })
});

router.post('/gallery', upload.single('gallery_file'), (req, res, next)=> {
    let gallery = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));
    gallery.forEach((picture) => {
        mongoP.findPicture(picture.name).then((res) => {
            if (res)
                console.log('Picture "' + picture.name + '" is already in gallery');
            else
                mongoP.savePicture(picture)
        });
    });
    res.redirect('/settings');
});

router.delete('/gallery', (req, res, next)=>{
   console.log('DELETE /set/gallery');
   mongoP.deleteGallery().then(()=>{
       res.redirect('/settings');
   }).catch((err)=>{
       console.log(err);
   })
});

router.delete('/settings', (req, res, next)=>{
    console.log('DELETE /set/settings');
    mongoS.deleteSettings().then(()=>{
        res.redirect('/settings');
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/settings', upload.single('settings_file'), (req, res, next)=>{
    console.log("POST /set/settings");
    let settings = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));
    mongoS.saveSettings(settings);
    res.redirect('/settings');
});

router.get('/settings', (req, res, next)=>{
    console.log("GET /set/settings");
    mongoS.getSettings().then((settings)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(settings));
    })
});

module.exports = router;