const express = require("express");
const router = express.Router();

router.get("/", (req, res, next)=>{
    if (!req.session.user) {
        res.render('login', user=req.session.user);
    }
    else{
        res.render('index', user=req.session.user);
    }
    next();
});

router.get("/registration", (req, res ,next)=>{
    res.render('registration', user=req.session.user);
});

module.exports = router;