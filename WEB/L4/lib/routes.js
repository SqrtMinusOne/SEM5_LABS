//      

const express = require("express");
const router = express.Router();
const winston = require('./logger');
const mongoU = require("./api/mongo_user");

function auth_levels(session, not_logged, logged_not_admin=null, logged_admin=null, error_func=null){
    if (!session.user){
        winston.verbose("User is not logged in");
        not_logged();
    }
    else if (logged_not_admin){
        mongoU.findUser(session.user.id).then((user)=>{
            if ((user.is_admin) && (logged_admin)) {
                winston.verbose('Admin user ok');
                logged_admin();
            }
            else{
                if (logged_admin)
                    winston.warn("Non-admin user, denied");
                else
                    winston.verbose("Non-admin user, ok");
                logged_not_admin();
            }
        }).catch((error)=>{
            winston.error('!!CRITICAL!! User exists, but not found in the DB');
            winston.error(error);
            if (error_func){
                error_func(error);
            }
        });
    }
}

router.get("/", (req, res, next)=>{
    auth_levels(req.session,()=>{
        res.render('login', user=req.session.user);
    }, ()=>{
        res.render('user_index', user=req.session.user);
    }, ()=>{
        res.render('admin_index', user=req.session.user);
    })
});

router.get('/gallery', (req, res, next)=>{
    auth_levels(req.session, ()=>{
        res.redirect('/')
    }, ()=>{
        res.render('gallery', user=req.session.user);
    });
});

router.get("/user_list", (req, res, next)=>{
   auth_levels(req.session, ()=>{
       res.redirect('/');
   }, ()=>{
       res.redirect('/');
   }, ()=>{
       res.render('user_list', user=req.session.user);
   });
});

router.get("/settings", (req, res, next)=>{
    auth_levels(req.session, ()=>{
        res.redirect('/');
    }, ()=>{
        res.redirect('/');
    }, ()=>{
        res.render('settings', user=req.session.user);
    });
});

router.get("/registration", (req, res, next)=>{
    res.render('registration', user=req.session.user);
});

module.exports = router;