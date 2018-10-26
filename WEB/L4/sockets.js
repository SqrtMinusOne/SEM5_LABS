// @flow

const mongoP = require('./api/mongo_pictures');
const mongoS = require('./api/mongo_setting');
const winston = require('./logger');

var info_t;
var sell_t;
var auc_timeout;
var current_picture;
var current_stake;
var cur_price;

function startSocketServer() {
    const io = require('socket.io').listen(3030);
    winston.verbose("Socket started at http://localhost:3030");
    io.sockets.on('connection', (socket)=>{
         socket.on('connected', (msg)=>{
            socket.name = msg.name;
            send(socket, 'joined', `${msg.name} присоединился к аукциону`);
        });

        socket.on('picture_set', (msg)=>{
            setPictureParams(msg.id);
        });

        socket.on('start_auction', (msg)=>{
            clearTimeout(auc_timeout);
            startAuc();
        });

        socket.on('user_in', (msg)=>{
            send(socket, 'user_in_info', `${msg.name} участвует в торгах за картину`)
        });

        socket.on('user_stake', (msg)=>{
            cur_price = msg.price;
            current_picture.buyer = msg.name;
            current_picture.sold_price = cur_price;
            send(socket, 'user_stake_info', `${msg.name} поднял цену до ${msg.price}`);
            socket.broadcast.json.emit('user_stake_price', msg);
            socket.json.emit('user_stake_price', msg);
        });


        function startAuc(){
            current_stake = "";
            send(socket, 'start_auc_info', `Открыт аукцион по картине "${current_picture.name}"`);
            setTimeout(stopAuc, sell_t * 1000);
        }


        function stopAuc(){
            let msg = `Аукцион по картине "${current_picture.name}" окончен. '`;
            current_picture.for_auction = false;
            if (current_picture.buyer) {
                msg = msg + `Победитель - ${current_picture.buyer}, цена - ${current_picture.sold_price}`;
                current_picture.save();
            }
            else {
                msg = msg + `Картину никто не купил`;
            }
            send(socket, 'stop_auc', msg);
            socket.json.emit('stop_auc_info', {"id": current_picture._id});
            socket.broadcast.json.emit('stop_auc_info', {"id": current_picture._id});
            mongoP.returnGallery().then((gallery)=>{
                let not_sold = 0;
                gallery.forEach((picture)=>{
                    if (picture.for_auction)
                        not_sold++;
                });
                if (not_sold === 0){
                    send(socket, 'auc_finished', 'Аукцион окончен')
                }
            })
        }

        function setPictureParams(id) {
            mongoP.findPictureById(id).then((picture) => {
                if (picture) {
                    current_picture = picture;
                    send(socket, 'picture_init', `Картина ${picture.name} поставлена на аукцион`);
                    socket.broadcast.json.emit('picture_id', {
                        "id": picture._id,
                        "start_price": picture.start_price,
                        "min_step": picture.min_step,
                        "max_step": picture.max_step
                    });
                    mongoS.getSettings().then((settings) => {
                        info_t = (parseInt(settings.info_interval.slice(0, 2)) * 60 +
                            parseInt(settings.info_interval.slice(3, 5))) * 60;
                        sell_t = (parseInt(settings.sell_timeout.slice(0, 2)) * 60 +
                            parseInt(settings.sell_timeout.slice(3, 5))) * 60;
                        auc_timeout = setTimeout(() => {
                            startAuc()
                        }, info_t * 1000)
                    })
                }
            })
        }
    })
}

function send(socket, type, msg){
    winston.verbose(`Message: ${type} - ${msg}`);
    let time = (new Date()).toLocaleTimeString();
    let obj = {
        "time": time,
        "message": msg
    };
    socket.json.emit(type, obj);
    socket.broadcast.json.emit(type, obj);
}

module.exports = { startSocketServer };