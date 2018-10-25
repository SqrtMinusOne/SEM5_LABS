// @flow

const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/user');

function createUser(user_data){
    let user = {
        username: user_data.username,
        password_hash: hash(user_data.password),
        name: user_data.name,
        is_admin: user_data.is_admin,
        is_authenticated: false
    };
    return new User(user).save();
}
function checkUser(userData){
    return User
        .findOne({username: userData.username})
        .then((res)=>{
            if ( res.password_hash === hash(userData.password) ){
                if (res.is_authenticated){
                    return Promise.reject("User already authenticated")
                }
                else {
                    res.is_authenticated = true;
                    res.save();
                    console.log("Authorization ok");
                    return Promise.resolve(res)
                }
            } else {
                return Promise.reject("Wrong password")
            }
        })
}
function findUser(id){
    return User.findOne({_id: id});
}

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}

function returnUsers() {
    return User.find({}, (err, users)=>{
        if (users) {
            return Promise.resolve(users);
        }
        else
            return Promise.reject();
    });
}

function logout(id){
    return User.findOne({_id: id}).then((res)=>{
        res.is_authenticated = false;
        res.save();
        return Promise.resolve();
    }).catch((error)=>{
        return Promise.reject(error);
    })
}


module.exports = {createUser, checkUser, logout, findUser, returnUsers};