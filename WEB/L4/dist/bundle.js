/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./models/picture.js":
/*!***************************!*\
  !*** ./models/picture.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst Picture = new mongoose.Schema({\r\n    name: {\r\n        type: String,\r\n        unique: true,\r\n        required: true\r\n    },\r\n    url: {\r\n        type: String,\r\n        required: true\r\n    },\r\n    author: {\r\n        type: String,\r\n        required: true\r\n    },\r\n    description: {\r\n        type: String,\r\n        required: true\r\n    },\r\n    sold_price:{\r\n        type: Number,\r\n        default: 0\r\n    },\r\n    buyer: {\r\n        type: String,\r\n        default: \"\"\r\n    },\r\n    start_price: {\r\n        type: Number,\r\n        required: true\r\n    },\r\n    min_step: {\r\n        type: Number,\r\n        required: true\r\n    },\r\n    max_step: {\r\n        type: Number,\r\n        required: true\r\n    },\r\n    for_auction: {\r\n        type: Number,\r\n        required: true\r\n    },\r\n});\r\n\r\nmodule.exports = mongoose.model('Picture', Picture);\n\n//# sourceURL=webpack:///./models/picture.js?");

/***/ }),

/***/ "./models/setting.js":
/*!***************************!*\
  !*** ./models/setting.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\n\r\nconst Settings = new mongoose.Schema({\r\n    name :{\r\n        type: String,\r\n        required: true,\r\n        unique: true\r\n    },\r\n    date: {\r\n        type: Date,\r\n        required: true\r\n    },\r\n    time: {\r\n        type: String,\r\n        required: true\r\n    },\r\n    sell_timeout: {\r\n        type: String,\r\n        required: true\r\n    },\r\n    info_interval: {\r\n        type: String,\r\n        required: true\r\n    }\r\n});\r\n\r\nmodule.exports = mongoose.model('Settings', Settings);\n\n//# sourceURL=webpack:///./models/setting.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst User = new mongoose.Schema({\r\n    username: {\r\n        type: String,\r\n        unique: true,\r\n        required: true\r\n    },\r\n    password_hash: {\r\n        type: String,\r\n        unique: true,\r\n        required: true\r\n    },\r\n    name: {\r\n        type: String,\r\n        required: true\r\n    },\r\n    is_admin: {\r\n        type: Boolean,\r\n        default: false\r\n    },\r\n    is_authenticated: {\r\n        type: Boolean,\r\n        default: false\r\n    }\r\n});\r\n\r\nmodule.exports = mongoose.model('User', User);\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./src/api/mongo_pictures.js":
/*!***********************************!*\
  !*** ./src/api/mongo_pictures.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @flow\r\n\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst Picture = __webpack_require__(/*! ../../models/picture */ \"./models/picture.js\");\r\n\r\nfunction savePicture(picture_data){\r\n    return new Picture(picture_data).save();\r\n}\r\n\r\nfunction findPicture(name) {\r\n    return Picture.findOne({name: name});\r\n}\r\n\r\nfunction findPictureById(id){\r\n    return Picture.findOne({_id: id});\r\n}\r\n\r\nfunction returnGallery(){\r\n    return Picture.find({}, (err, pictures)=>{\r\n        if (pictures){\r\n            return Promise.resolve(pictures);\r\n        }\r\n        else{\r\n            return Promise.reject(err);\r\n        }\r\n    })\r\n}\r\n\r\nfunction deleteGallery(){\r\n    return Picture.deleteMany({}, (err)=>{\r\n        if (err){\r\n            return Promise.reject(err)\r\n        }\r\n        else\r\n            return Promise.resolve();\r\n    });\r\n}\r\n\r\nmodule.exports = {savePicture, findPicture, findPictureById, deleteGallery, returnGallery};\n\n//# sourceURL=webpack:///./src/api/mongo_pictures.js?");

/***/ }),

/***/ "./src/api/mongo_setting.js":
/*!**********************************!*\
  !*** ./src/api/mongo_setting.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @flow\r\n\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst Setting = __webpack_require__(/*! ../../models/setting */ \"./models/setting.js\");\r\n\r\nasync function saveSettings(setting_data) {\r\n    let res = await getSettings();\r\n    if (res) {\r\n        await deleteSettings();\r\n    }\r\n    setting_data.name = \"main_setting\";\r\n    return new Setting(setting_data).save();\r\n}\r\n\r\nfunction getSettings() {\r\n    return Setting.findOne({name: \"main_setting\"});\r\n}\r\n\r\nfunction deleteSettings(){\r\n    return Setting.deleteMany({}, (err)=>{\r\n        if (err){\r\n            return Promise.reject(err)\r\n        }\r\n        else\r\n            return Promise.resolve();\r\n    });\r\n}\r\n\r\nmodule.exports = {saveSettings, getSettings, deleteSettings};\n\n//# sourceURL=webpack:///./src/api/mongo_setting.js?");

/***/ }),

/***/ "./src/api/mongo_user.js":
/*!*******************************!*\
  !*** ./src/api/mongo_user.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @flow\r\n\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\r\nconst User = __webpack_require__(/*! ../../models/user */ \"./models/user.js\");\r\nconst winston = __webpack_require__(/*! ../logger */ \"./src/logger.js\");\r\n\r\nfunction createUser(user_data){\r\n    let user = {\r\n        username: user_data.username,\r\n        password_hash: hash(user_data.password),\r\n        name: user_data.name,\r\n        is_admin: user_data.is_admin,\r\n        is_authenticated: false\r\n    };\r\n    return new User(user).save();\r\n}\r\n\r\nfunction clearAuths(){\r\n    returnUsers().then((users)=>{\r\n        users.forEach((user)=>{\r\n            user.is_authenticated = false;\r\n            user.save()\r\n        });\r\n        return Promise.resolve();\r\n    }).catch((err)=>{\r\n        return Promise.reject();\r\n    })\r\n}\r\n\r\nfunction checkUser(userData){\r\n    return User\r\n        .findOne({username: userData.username})\r\n        .then((res)=>{\r\n            if(!res)\r\n                return Promise.reject(\"User does not exists\");\r\n            if ( res.password_hash === hash(userData.password) ){\r\n                if (res.is_authenticated){\r\n                    return Promise.reject(\"User already authenticated\")\r\n                }\r\n                else {\r\n                    res.is_authenticated = true;\r\n                    res.save();\r\n                    winston.verbose(\"Authorization ok\");\r\n                    return Promise.resolve(res)\r\n                }\r\n            } else {\r\n                return Promise.reject(\"Wrong password\")\r\n            }\r\n        })\r\n}\r\nfunction findUser(id){\r\n    return User.findOne({_id: id});\r\n}\r\n\r\nfunction hash(text) {\r\n    return crypto.createHash('sha1')\r\n        .update(text).digest('base64')\r\n}\r\n\r\nfunction returnUsers() {\r\n    return User.find({}, (err, users)=>{\r\n        if (users) {\r\n            return Promise.resolve(users);\r\n        }\r\n        else\r\n            return Promise.reject();\r\n    });\r\n}\r\n\r\nfunction logout(id){\r\n    return User.findOne({_id: id}).then((res)=>{\r\n        res.is_authenticated = false;\r\n        res.save();\r\n        return Promise.resolve();\r\n    }).catch((error)=>{\r\n        return Promise.reject(error);\r\n    })\r\n}\r\n\r\nmodule.exports = {createUser, checkUser, logout, findUser, returnUsers, clearAuths};\n\n//# sourceURL=webpack:///./src/api/mongo_user.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @flow\r\n\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst session = __webpack_require__(/*! express-session */ \"express-session\");\r\nconst winston = __webpack_require__(/*! ./logger */ \"./src/logger.js\");\r\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\r\nconst mongoStore = __webpack_require__(/*! connect-mongo */ \"connect-mongo\")(session);\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\n\r\nconst sockets = __webpack_require__(/*! ./sockets */ \"./src/sockets.js\");\r\nconst routes = __webpack_require__(/*! ./routes */ \"./src/routes.js\");\r\nconst users = __webpack_require__(/*! ./users */ \"./src/users.js\");\r\nconst settings = __webpack_require__(/*! ./set */ \"./src/set.js\");\r\nconst mongoU = __webpack_require__(/*! ./api/mongo_user */ \"./src/api/mongo_user.js\");\r\n\r\nconst server = express();\r\nwinston.verbose('Initialization');\r\nwinston.verbose(`Current working directory is ${process.cwd()}`);\r\n\r\nserver.use(morgan('combined', {stream: winston.stream}));\r\nserver.use(bodyParser.json());\r\nserver.use(bodyParser.urlencoded({ extended: true }));\r\nmongoose.connect('mongodb://localhost:27017/web_l4').then(()=>{\r\n    server.use(session({\r\n        secret: 'The stars align',\r\n        resave: false,\r\n        saveUninitialized: false,\r\n        store: new mongoStore({mongooseConnection: mongoose.connection})\r\n    }));\r\n    mongoU.clearAuths();\r\n    winston.verbose(\"Connection to mongoDB ok\");\r\n    server.use(\"/\", routes);\r\n    server.use(\"/users\", users);\r\n    server.use(\"/set\", settings);\r\n    server.use('/lib', express.static(path.join(process.cwd(), \"/lib\")));\r\n    server.use('/res', express.static(path.join(process.cwd(), \"/res\")));\r\n    server.use('/css', express.static(path.join(process.cwd(), \"/css\")));\r\n    server.use('/javascript', express.static(path.join(process.cwd(), \"/src/javascript\")));\r\n    server.set('view engine', 'pug');\r\n    server.set('views', './views');\r\n    server.listen(3000, ()=>{\r\n        winston.verbose(\"HTTP server started at http://localhost:3000\");\r\n    });\r\n    sockets.startSocketServer();\r\n}).catch((error)=>{\r\n    winston.error(\"Connection to mongoDB failed\");\r\n    winston.error(error);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/logger.js":
/*!***********************!*\
  !*** ./src/logger.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const winston = __webpack_require__(/*! winston */ \"winston\");\r\nconst Sentry = __webpack_require__(/*! winston-raven-sentry */ \"winston-raven-sentry\");\r\n\r\nconst options = {\r\n    console:{\r\n        level: 'debug',\r\n        handleExceptions: true,\r\n        json: false,\r\n        colorize: true,\r\n    }\r\n};\r\n\r\nlet logger = winston.createLogger({\r\n    transports: [\r\n        new winston.transports.Console({\r\n            level: 'debug',\r\n            format: winston.format.combine(\r\n                winston.format.colorize(),\r\n                winston.format.timestamp({\r\n                    format: 'HH:mm:ss'\r\n                }),\r\n                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)\r\n            )\r\n        }),\r\n        new Sentry({\r\n            level: 'warn',\r\n            dsn: \"https://c9702d23fe224736b9d6ad3f867d68da:0a2efc9957014c82aa85bf3b38f8e55b@sentry.io/1310383\"\r\n        })\r\n    ],\r\n});\r\n\r\nlogger.stream = {\r\n    write: (message, encoding)=>{\r\n        logger.info(message.replace(/[\\r?\\n\\s]/g, \"\"));\r\n    }\r\n};\r\n\r\nmodule.exports = logger;\n\n//# sourceURL=webpack:///./src/logger.js?");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @flow\r\n\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\nconst winston = __webpack_require__(/*! ./logger */ \"./src/logger.js\");\r\nconst mongoU = __webpack_require__(/*! ./api/mongo_user */ \"./src/api/mongo_user.js\");\r\n\r\nfunction auth_levels(session, not_logged, logged_not_admin=null, logged_admin=null, error_func=null){\r\n    if (!session.user){\r\n        winston.verbose(\"User is not logged in\");\r\n        not_logged();\r\n    }\r\n    else if (logged_not_admin){\r\n        mongoU.findUser(session.user.id).then((user)=>{\r\n            if ((user.is_admin) && (logged_admin)) {\r\n                winston.verbose('Admin user ok');\r\n                logged_admin();\r\n            }\r\n            else{\r\n                if (logged_admin)\r\n                    winston.warn(\"Non-admin user, denied\");\r\n                else\r\n                    winston.verbose(\"Non-admin user, ok\");\r\n                logged_not_admin();\r\n            }\r\n        }).catch((error)=>{\r\n            winston.error('!!CRITICAL!! User exists, but not found in the DB');\r\n            winston.error(error);\r\n            if (error_func){\r\n                error_func(error);\r\n            }\r\n        });\r\n    }\r\n}\r\n\r\nrouter.get(\"/\", (req, res, next)=>{\r\n    auth_levels(req.session,()=>{\r\n        res.render('login', user=req.session.user);\r\n    }, ()=>{\r\n        res.render('user_index', user=req.session.user);\r\n    }, ()=>{\r\n        res.render('admin_index', user=req.session.user);\r\n    })\r\n});\r\n\r\nrouter.get('/gallery', (req, res, next)=>{\r\n    auth_levels(req.session, ()=>{\r\n        res.redirect('/')\r\n    }, ()=>{\r\n        res.render('gallery', user=req.session.user);\r\n    });\r\n});\r\n\r\nrouter.get(\"/user_list\", (req, res, next)=>{\r\n   auth_levels(req.session, ()=>{\r\n       res.redirect('/');\r\n   }, ()=>{\r\n       res.redirect('/');\r\n   }, ()=>{\r\n       res.render('user_list', user=req.session.user);\r\n   });\r\n});\r\n\r\nrouter.get(\"/settings\", (req, res, next)=>{\r\n    auth_levels(req.session, ()=>{\r\n        res.redirect('/');\r\n    }, ()=>{\r\n        res.redirect('/');\r\n    }, ()=>{\r\n        res.render('settings', user=req.session.user);\r\n    });\r\n});\r\n\r\nrouter.get(\"/registration\", (req, res, next)=>{\r\n    res.render('registration', user=req.session.user);\r\n});\r\n\r\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes.js?");

/***/ }),

/***/ "./src/set.js":
/*!********************!*\
  !*** ./src/set.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @flow\r\n\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\nconst multer = __webpack_require__(/*! multer */ \"multer\");\r\nconst winston = __webpack_require__(/*! ./logger */ \"./src/logger.js\");\r\nconst mongoP = __webpack_require__(/*! ./api/mongo_pictures */ \"./src/api/mongo_pictures.js\");\r\nconst mongoS = __webpack_require__(/*! ./api/mongo_setting */ \"./src/api/mongo_setting.js\");\r\n\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst upload = multer({\r\n    dest: 'uploads/'\r\n});\r\n\r\nrouter.get('/picture/:id', (req, res, next)=>{\r\n    mongoP.findPictureById(req.params.id).then((picture)=>{\r\n        res.setHeader('Content-Type', 'application/json');\r\n        res.send(JSON.stringify(picture));\r\n    })\r\n});\r\n\r\nrouter.get('/gallery', (req, res, next)=>{\r\n    mongoP.returnGallery().then((gallery)=>{\r\n        res.setHeader('Content-Type', 'application/json');\r\n        res.send(JSON.stringify(gallery));\r\n    })\r\n});\r\n\r\nrouter.post('/gallery', upload.single('gallery_file'), (req, res, next)=> {\r\n    let gallery = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));\r\n    gallery.forEach((picture) => {\r\n        mongoP.findPicture(picture.name).then((res) => {\r\n            if (res)\r\n                winston.verbose('Picture \"' + picture.name + '\" is already in gallery');\r\n            else\r\n                mongoP.savePicture(picture)\r\n        });\r\n    });\r\n    res.redirect('/settings');\r\n});\r\n\r\nrouter.delete('/gallery', (req, res, next)=>{\r\n   mongoP.deleteGallery().then(()=>{\r\n       res.redirect('/settings');\r\n   }).catch((err)=>{\r\n       winston.error(err);\r\n   })\r\n});\r\n\r\nrouter.delete('/settings', (req, res, next)=>{\r\n    mongoS.deleteSettings().then(()=>{\r\n        res.redirect('/settings');\r\n    }).catch((err)=>{\r\n        winston.error(err);\r\n    })\r\n});\r\n\r\nrouter.post('/settings', upload.single('settings_file'), (req, res, next)=>{\r\n    let settings = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));\r\n    mongoS.saveSettings(settings);\r\n    res.redirect('/settings');\r\n});\r\n\r\nrouter.get('/settings', (req, res, next)=>{\r\n    mongoS.getSettings().then((settings)=>{\r\n        res.setHeader('Content-Type', 'application/json');\r\n        res.send(JSON.stringify(settings));\r\n    })\r\n});\r\n\r\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/set.js?");

/***/ }),

/***/ "./src/sockets.js":
/*!************************!*\
  !*** ./src/sockets.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @flow\r\n\r\nconst mongoP = __webpack_require__(/*! ./api/mongo_pictures */ \"./src/api/mongo_pictures.js\");\r\nconst mongoS = __webpack_require__(/*! ./api/mongo_setting */ \"./src/api/mongo_setting.js\");\r\nconst winston = __webpack_require__(/*! ./logger */ \"./src/logger.js\");\r\n\r\nvar info_t;\r\nvar sell_t;\r\nvar auc_timeout;\r\nvar current_picture;\r\nvar current_stake;\r\nvar cur_price;\r\n\r\nfunction startSocketServer() {\r\n    const io = __webpack_require__(/*! socket.io */ \"socket.io\").listen(3030);\r\n    winston.verbose(\"Socket started at http://localhost:3030\");\r\n    io.sockets.on('connection', (socket)=>{\r\n         socket.on('connected', (msg)=>{\r\n            socket.name = msg.name;\r\n            send(socket, 'joined', `${msg.name} присоединился к аукциону`);\r\n        });\r\n\r\n        socket.on('picture_set', (msg)=>{\r\n            setPictureParams(msg.id);\r\n        });\r\n\r\n        socket.on('start_auction', (msg)=>{\r\n            clearTimeout(auc_timeout);\r\n            startAuc();\r\n        });\r\n\r\n        socket.on('user_in', (msg)=>{\r\n            send(socket, 'user_in_info', `${msg.name} участвует в торгах за картину`)\r\n        });\r\n\r\n        socket.on('user_stake', (msg)=>{\r\n            cur_price = msg.price;\r\n            current_picture.buyer = msg.name;\r\n            current_picture.sold_price = cur_price;\r\n            send(socket, 'user_stake_info', `${msg.name} поднял цену до ${msg.price}`);\r\n            socket.broadcast.json.emit('user_stake_price', msg);\r\n            socket.json.emit('user_stake_price', msg);\r\n        });\r\n\r\n\r\n        function startAuc(){\r\n            current_stake = \"\";\r\n            send(socket, 'start_auc_info', `Открыт аукцион по картине \"${current_picture.name}\"`);\r\n            setTimeout(stopAuc, sell_t * 1000);\r\n        }\r\n\r\n\r\n        function stopAuc(){\r\n            let msg = `Аукцион по картине \"${current_picture.name}\" окончен. '`;\r\n            current_picture.for_auction = false;\r\n            if (current_picture.buyer) {\r\n                msg = msg + `Победитель - ${current_picture.buyer}, цена - ${current_picture.sold_price}`;\r\n                current_picture.save();\r\n            }\r\n            else {\r\n                msg = msg + `Картину никто не купил`;\r\n            }\r\n            send(socket, 'stop_auc', msg);\r\n            socket.json.emit('stop_auc_info', {\"id\": current_picture._id});\r\n            socket.broadcast.json.emit('stop_auc_info', {\"id\": current_picture._id});\r\n            mongoP.returnGallery().then((gallery)=>{\r\n                let not_sold = 0;\r\n                gallery.forEach((picture)=>{\r\n                    if (picture.for_auction)\r\n                        not_sold++;\r\n                });\r\n                if (not_sold === 0){\r\n                    send(socket, 'auc_finished', 'Аукцион окончен')\r\n                }\r\n            })\r\n        }\r\n\r\n        function setPictureParams(id) {\r\n            mongoP.findPictureById(id).then((picture) => {\r\n                if (picture) {\r\n                    current_picture = picture;\r\n                    send(socket, 'picture_init', `Картина ${picture.name} поставлена на аукцион`);\r\n                    socket.broadcast.json.emit('picture_id', {\r\n                        \"id\": picture._id,\r\n                        \"start_price\": picture.start_price,\r\n                        \"min_step\": picture.min_step,\r\n                        \"max_step\": picture.max_step\r\n                    });\r\n                    mongoS.getSettings().then((settings) => {\r\n                        info_t = (parseInt(settings.info_interval.slice(0, 2)) * 60 +\r\n                            parseInt(settings.info_interval.slice(3, 5))) * 60;\r\n                        sell_t = (parseInt(settings.sell_timeout.slice(0, 2)) * 60 +\r\n                            parseInt(settings.sell_timeout.slice(3, 5))) * 60;\r\n                        auc_timeout = setTimeout(() => {\r\n                            startAuc()\r\n                        }, info_t * 1000)\r\n                    })\r\n                }\r\n            })\r\n        }\r\n    })\r\n}\r\n\r\nfunction send(socket, type, msg){\r\n    winston.verbose(`Message: ${type} - ${msg}`);\r\n    let time = (new Date()).toLocaleTimeString();\r\n    let obj = {\r\n        \"time\": time,\r\n        \"message\": msg\r\n    };\r\n    socket.json.emit(type, obj);\r\n    socket.broadcast.json.emit(type, obj);\r\n}\r\n\r\nmodule.exports = { startSocketServer };\n\n//# sourceURL=webpack:///./src/sockets.js?");

/***/ }),

/***/ "./src/users.js":
/*!**********************!*\
  !*** ./src/users.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @flow\r\n\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\nconst logger = __webpack_require__(/*! ./logger */ \"./src/logger.js\");\r\nconst mongoU = __webpack_require__(/*! ./api/mongo_user */ \"./src/api/mongo_user.js\");\r\n\r\nrouter.get('/current', (req, res, next)=>{\r\n    if (!req.session.user){\r\n        res.send('Нет активного пользователя')\r\n    }\r\n    else{\r\n        mongoU.findUser(req.session.user.id).then((user)=>{\r\n            res.send(user);\r\n        }).catch((error)=>{\r\n            res.status(500).send('Пользователь на найден')\r\n        });\r\n    }\r\n});\r\n\r\nrouter.get('/all', (req, res, next)=>{\r\n    mongoU.returnUsers().then((users)=>{\r\n        res.send(users);\r\n    })\r\n});\r\n\r\nrouter.post('/login', (req, res, next)=>{\r\n    if (req.session.user) return res.redirect('/');\r\n    mongoU.checkUser(req.body).then((user)=>{\r\n        req.session.user = {id: user._id, name: user.name};\r\n        res.send('ok');\r\n    }).catch((error)=>{\r\n        res.status(403).send(error)\r\n    })\r\n});\r\n\r\nrouter.post('/', (req, res, next)=>{\r\n    mongoU.createUser(req.body).then(()=>{\r\n        logger.verbose(\"Пользователь создан успешно\");\r\n        res.status(200).redirect('/');\r\n    }).catch((error)=>{\r\n        logger.error(error);\r\n        if (error.code === 11000){\r\n            res.status(500).send(\"Этот пользователь уже существует\")\r\n        }\r\n        else\r\n            res.status(500).send(error);\r\n    })\r\n});\r\n\r\nrouter.post('/logout', (req, res, next)=>{\r\n    if (req.session.user){\r\n        mongoU.logout(req.session.user.id).then(()=>{\r\n            if (delete req.session.user) {\r\n                logger.verbose('Logout ok');\r\n                res.redirect('/');\r\n            }\r\n            else\r\n                logger.error('Session deletion error');\r\n        }).catch((error)=>{\r\n            logger.error(error);\r\n        });\r\n    }\r\n});\r\n\r\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/users.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-mongo\");\n\n//# sourceURL=webpack:///external_%22connect-mongo%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ }),

/***/ "winston-raven-sentry":
/*!***************************************!*\
  !*** external "winston-raven-sentry" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston-raven-sentry\");\n\n//# sourceURL=webpack:///external_%22winston-raven-sentry%22?");

/***/ })

/******/ });