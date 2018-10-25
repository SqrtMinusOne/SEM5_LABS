// @flow

const express = require("express");
const router = express.Router();
const mongoU = require("./api/mongo_user");

function auth_levels(session, not_logged, logged_not_admin=null, logged_admin=null, error_func=null){
    if (!session.user){
        console.log("User is not logged in");
        not_logged();
    }
    else if (logged_not_admin){
        mongoU.findUser(session.user.id).then((user)=>{
            if ((user.is_admin) && (logged_admin)) {
                console.log('Admin user ok');
                logged_admin();
            }
            else{
                if (logged_admin)
                    console.log("Non-admin user, denied");
                else
                    console.log("Non-admin user, ok");
                logged_not_admin();
            }
        }).catch((error)=>{
            console.log('!!CRITICAL!! User exists, but not found in the DB');
            console.log(error);
            if (error_func){
                error_func(error);
            }
        });
    }
}

router.get("/", (req, res, next)=>{
    console.log("GET /");
    auth_levels(req.session,()=>{
        res.render('login', user=req.session.user);
    }, ()=>{
        res.render('user_index', user=req.session.user);
    }, ()=>{
        res.render('admin_index', user=req.session.user);
    })
});

router.get('/gallery', (req, res, next)=>{
    console.log("GET /gallery");
    auth_levels(req.session, ()=>{
        res.redirect('/')
    }, ()=>{
        res.render('gallery', user=req.session.user);
    });
});

router.get("/user_list", (req, res, next)=>{
   console.log("GET /user_list");
   auth_levels(req.session, ()=>{
       res.redirect('/');
   }, ()=>{
       res.redirect('/');
   }, ()=>{
       res.render('user_list', user=req.session.user);
   });
});

router.get("/settings", (req, res, next)=>{
    console.log("GET /settings");
    auth_levels(req.session, ()=>{
        res.redirect('/');
    }, ()=>{
        res.redirect('/');
    }, ()=>{
        res.render('settings', user=req.session.user);
    });
});

router.get("/registration", (req, res, next)=>{
    console.log("GET /registration");
    res.render('registration', user=req.session.user);
});

module.exports = router;