import * as socket from 'socket.io';
import { logger } from "./winston";
import { StockMarket } from './api/StockMarket';

export class SocketController {
    constructor(server: any, market: StockMarket) {
        this.io = socket.listen(server);
        this.io.on('connection', this.sockets.bind(this))
        this.clients = []
        logger.verbose('Socket server online');
        this.market = market;
        this.timerId = null;
    }

    sockets(socket: any) {
        this.clients.push(socket);
        socket.on('connected', function (msg: any) {
            socket.name = msg.name;
            logger.verbose(`${socket.name} connected`);
        })
        
        this.market.on_update_callback = () =>{
            logger.verbose('Sendind update signal');
            socket.json.emit('market_update');
            socket.json.broadcast.emit('market_update');
        }

        socket.on('disconnect', () => {
            logger.verbose(`${socket.name} disconnected`);
            let i = this.clients.indexOf(socket);
            this.clients.splice(i, 1);
        })

        socket.on('start_market', (msg: any)=>{
            this.startMarket(msg.interval);
        })

        socket.on('stop_market', (msg: any)=>{
            this.stopMarket();
        })

        socket.on('reset_market', (msg: any)=>{
            this.resetMarket();
        })
    }

    private io: socket.Server
    private clients: any[]
    private market: StockMarket
    private timerId: any;

    private resetMarket(): any {
        logger.verbose('Reset market received');
        clearInterval(this.timerId);
    }

    private stopMarket(): any {
        logger.verbose('Stop market received');
        clearInterval(this.timerId);
    }

    private startMarket(interval: number): any {
        logger.verbose('Start market received');
        this.timerId = setInterval(()=>{
            logger.verbose('Updating market');
            this.market.simulate_one_day();
        }, interval*1000);
    }
}