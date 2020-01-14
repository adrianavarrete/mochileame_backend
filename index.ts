import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import socketIO from 'socket.io';
import {createServer, Server} from 'http';
import path from 'path';
import TravelGroupRoutes from './routes/TravelGroupRoutes';
import userRoutes from './routes/userRoutes';
import { Message } from './models/Message';
require('dotenv').config();

class Server_app {
    public app: express.Application;
    private server: Server;
    private io: SocketIO.Server;


    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.server = createServer(this.app);
        this.io = socketIO(this.server);
    }

    async config() {
        const MONGO_URI = 'mongodb://localhost/minimoAsignaturas';
        mongoose.set('useFindAndModify', true);

        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db => console.log('DB Conectada'));

        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }))

    }

    routes() {
        this.app.use(TravelGroupRoutes);
        this.app.use(userRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.app.get('port'));
            socket.on('message', (m: Message) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
        
    }

}

const server = new Server_app();
server.start();
