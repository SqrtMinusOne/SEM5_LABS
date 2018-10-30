//      

const express = require('express');
const router = express.Router();
const logger = require('./logger');
const mongoU = require('./api/mongo_user');

router.get('/current', (req, res, next)=>{
    if (!req.session.user){
        res.send('Нет активного пользователя')
    }
    else{
        mongoU.findUser(req.session.user.id).then((user)=>{
            res.send(user);
        }).catch((error)=>{
            res.status(500).send('Пользователь на найден')
        });
    }
});

router.get('/all', (req, res, next)=>{
    mongoU.returnUsers().then((users)=>{
        res.send(users);
    })
});

router.post('/login', (req, res, next)=>{
    if (req.session.user) return res.redirect('/');
    mongoU.checkUser(req.body).then((user)=>{
        req.session.user = {id: user._id, name: user.name};
        res.send('ok');
    }).catch((error)=>{
        res.status(403).send(error)
    })
});

router.post('/', (req, res, next)=>{
    mongoU.createUser(req.body).then(()=>{
        logger.verbose("Пользователь создан успешно");
        res.status(200).redirect('/');
    }).catch((error)=>{
        logger.error(error);
        if (error.code === 11000){
            res.status(500).send("Этот пользователь уже существует")
        }
        else
            res.status(500).send(error);
    })
});

router.post('/logout', (req, res, next)=>{
    if (req.session.user){
        mongoU.logout(req.session.user.id).then(()=>{
            if (delete req.session.user) {
                logger.verbose('Logout ok');
                res.redirect('/');
            }
            else
                logger.error('Session deletion error');
        }).catch((error)=>{
            logger.error(error);
        });
    }
});

module.exports = router;