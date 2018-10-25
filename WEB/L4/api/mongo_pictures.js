// @flow

const mongoose = require('mongoose');
const Picture = require('../models/picture');

function savePicture(picture_data){
    return new Picture(picture_data).save();
}

function findPicture(name) {
    return Picture.findOne({name: name});
}

function findPictureById(id){
    return Picture.findOne({_id: id});
}

function returnGallery(){
    return Picture.find({}, (err, pictures)=>{
        if (pictures){
            return Promise.resolve(pictures);
        }
        else{
            return Promise.reject();
        }
    })
}

function deleteGallery(){
    return Picture.deleteMany({}, (err)=>{
        if (err){
            return Promise.reject(err)
        }
        else
            return Promise.resolve();
    });
}

module.exports = {savePicture, findPicture, findPictureById, deleteGallery, returnGallery};