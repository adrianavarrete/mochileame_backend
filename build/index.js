"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const TravelGroupRoutes_1 = __importDefault(require("./routes/TravelGroupRoutes"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
require('dotenv').config();
var multer = require('multer');
const upload = multer({ dest: '/uploads/' });
class Server_app {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            const MONGO_URI = 'mongodb://localhost/minimoAsignaturas';
            mongoose_1.default.set('useFindAndModify', true);
            mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useCreateIndex: true
            })
                .then(db => console.log('DB Conectada'));
            this.app.set('port', process.env.PORT || 3000);
            this.app.use(morgan_1.default('dev'));
            this.app.use(cors_1.default());
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: false }));
            this.app.use('/uploads', express_1.default.static('uploads'));
            // this.app.use(multer({
            //     dest: path.join(__dirname, 'public/assets/img/profile'),
            //     rename: function (fieldname: , filename, req, res) {
            //         console.log(req)// you will see your image url etc.
            //       if(req.session.user) return req.session.user.id;
            //     }
            //   }));
        });
    }
    routes() {
        this.app.use(TravelGroupRoutes_1.default);
        this.app.use(userRoutes_1.default);
        this.app.use(PostRoutes_1.default);
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
const SocketIO = require('socket.io');
const io = SocketIO(s);
io.on('connection', (socket) => {
    console.log('Alguien se ha conectado con Sockets');
    socket.on('disconnect', function () {
        io.emit('users-changed', { user: socket.username, event: 'left' });
    });
    socket.on('set-name', (name) => {
        socket.username = name;
        io.emit('users-changed', { user: name, event: 'joined' });
    });
    socket.on('set-grupo', (grupo) => {
        socket.grupo = grupo;
    });
    socket.on('send-message', (message) => {
        // const m = new Message({
        //     name: socket.username,
        //     msg: message.text,
        //     grupo: socket.grupo
        // });
        // m.save(); 
        io.emit('message', { msg: message.text, user: socket.username, createdAt: new Date(), grupo: socket.grupo });
    });
});
