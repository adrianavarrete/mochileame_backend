import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import socketIO from 'socket.io';
import {createServer, Server} from 'http';
import path from 'path';
import TravelGroupRoutes from './routes/TravelGroupRoutes';
import PostRoutes from './routes/PostRoutes';
import userRoutes from './routes/userRoutes';
import Message from './models/Message';
require('dotenv').config();
var multer = require('multer');
const upload = multer({dest :'/uploads/'});

class Server_app {
    public app: any;


    constructor() {
        this.app = express();
        this.config();
        this.routes();

    }

    async config() {
        const MONGO_URI = 'mongodb://mongo/mochileame';
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
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/uploads',express.static('uploads'));
        // this.app.use(multer({
        //     dest: path.join(__dirname, 'public/assets/img/profile'),
        //     rename: function (fieldname: , filename, req, res) {
        //         console.log(req)// you will see your image url etc.
        //       if(req.session.user) return req.session.user.id;
        //     }
        //   }));

    }

    routes() {
        this.app.use(TravelGroupRoutes);
        this.app.use(userRoutes);
        this.app.use(PostRoutes);
    }

    start() {
        const serv = this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });   
        return serv;         
    }
}

const server = new Server_app();
const s = server.start();

const SocketIO = require('socket.io')
const io = SocketIO(s);

io.on('connection', (socket: any)=>{
    console.log('Alguien se ha conectado con Sockets')
 
    socket.on('disconnect', function(){
        io.emit('users-changed', {user: socket.username, event: 'left'});   
    });
    
    socket.on('set-name', (name:any) => {
        socket.username = name;
        io.emit('users-changed', {user: name, event: 'joined'});    
    });
    socket.on('set-grupo', (grupo:any) => {
        socket.grupo = grupo; 
    });
    
    socket.on('send-message', (message:any) => {

        // const m = new Message({
        //     name: socket.username,
        //     msg: message.text,
        //     grupo: socket.grupo
        // });
        // m.save(); 
        
        io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date(), grupo: socket.grupo });    
    });
});