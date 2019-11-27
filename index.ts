import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import TravelGroupRoutes from './routes/TravelGroupRoutes';
import userRoutes from './routes/userRoutes';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();

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
    }
}

const server = new Server();
server.start();
