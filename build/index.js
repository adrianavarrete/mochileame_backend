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
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            const MONGO_URI = 'mongodb://localhost/mochileame';
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
        });
    }
    routes() {
        this.app.use(TravelGroupRoutes_1.default);
        this.app.use(userRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
