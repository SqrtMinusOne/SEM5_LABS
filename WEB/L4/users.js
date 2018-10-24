const express = require('express');
const router = express.Router();
const mongo = require('./mongo');

router.get('/current', (req, res, next)=>{
    if (!req.session.user){
        res.send('Session not active')
    }
    else{
        mongo.findUser(req.session.user.id).then((user)=>{
            res.send(user);
        }).catch((error)=>{
            res.status(500).send('Пользователь на найден')
        });
    }
});

router.post('/login', (req, res, next)=>{
    if (req.session.user) return res.redirect('/');
    mongo.checkUser(req.body).then((user)=>{
        req.session.user = {id: user._id, name: user.name};
        res.send('ok');
    }).catch((error)=>{
        res.status(403).send(error)
    })
});

router.post('/', (req, res, next)=>{
    mongo.createUser(req.body).then(()=>{
        console.log("User created ok");
        res.status(200).send("User created ok");
    }).catch((error)=>{
        if (error.code === 11000){
            res.status(500).send("Этот пользователь уже существует")
        }
        else
            res.status(500).send(error);
    })
});

router.post('/logout', (req, res, next)=>{
    if (req.session.user){
        mongo.logout(req.session.user.id);
        delete req.session.user;
        res.redirect('/');
    }
});

module.exports = router;