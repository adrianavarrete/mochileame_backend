import { Request, Response, Router } from 'express';
import TravelGroup from '../models/TravelGroup';


class TravelGroupRoutes {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();

    }

    routes()
    {


    }
}

    const travelGroupRoutes = new TravelGroupRoutes();
    travelGroupRoutes.routes();

    export default travelGroupRoutes.router;
