import { Request, Response, Router } from 'express';
import TravelGroup from '../models/TravelGroup';
import User  from '../models/User';
import { REPLCommand } from 'repl';


class TravelGroupRoutes {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();

    }

    getTravelGroups(req: Request, res: Response): void {
        TravelGroup.find({}).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json(error);
    });
    }

    getTravelGroup(req: Request, res: Response): void {
        console.log(req.params.id);
        TravelGroup.findOne({ "_id": req.params.id}).then((data)=>{
                res.status(200).json(data);

        }).catch((error) =>{
            res.status(500).json(error);

        });
    }

    /*    name: { type: String, required: true, unique: true },
    destination: { type: String, required: true, unique: true },
    maxNumUsers: {type: Number, required: true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    privacity: { type: Boolean, required: true },  // Si es true es un grupo privado, si es false es un grupo público
    travelDateInit: { type: Date, required: true },
    travelDateFin: { type: Date, required: true },
    gender: { type: String, required: true }, // male --> solo hombres, female --> solo mujeres, mix --> ambos generos
    hobbies: [String],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfCreation: { type: Date, required: true }
    */

    postTravelGroup(req: Request, res: Response): void {
        
        const {name, destination, maxNumUsers, users, privacity, travelDateInit, travelDateFin, gender, hobbies, createdBy, dateOfCreation} = req.body;
        const newTravelGroup = new TravelGroup({name, destination, maxNumUsers, users, privacity, travelDateInit, travelDateFin, gender, hobbies, createdBy, dateOfCreation});
        
        newTravelGroup.save().then((data) => {
            res.status(200).json(data);
            console.log(data);

        }).catch((error) => {
            res.status(500).json(error);
        });
    }

    deleteTravelGroup(req: Request, res: Response): void {
        console.log(req.params.id);
        TravelGroup.findByIdAndDelete(req.params.id).then((data) => {

            res.status(201).json(data);
            console.log(data);

        }).catch((err) => {
            res.status(500).json(err);
        });

        
    }



eliminarUsuario (req: Request, res: Response): void 
{
console.log(req.params);
const cambioDeLista = {
    users: req.body.users
};

TravelGroup.findByIdAndUpdate(req.params.id, {$set: cambioDeLista}, {new: true}).then((data) => {
        res.status(200).json(data);
        console.log(data);

    }).catch((err) => {
        res.status(500).json(err);
    });

}

addUserTravelGroup (req: Request, res: Response): void{
    
    console.log(req.params.id);
    console.log(req.body.name);
 
    const cambioDeLista = {
        users: req.body.name
    };

    TravelGroup.findByIdAndUpdate(req.params.id, {$addToSet: cambioDeLista}, {new: true}).then((data) => {
        res.status(200).json(data);
        console.log(data);

    }).catch((err) => {
        res.status(500).json(err);
    });
}






    putTravelGroup(req: Request, res: Response): void {
        console.log(req.body.name);
        console.log(req.params.id);
        const updateTravelGroup = {
            name: req.body.name, 
            destination: req.body.destination, 
            maxNumUsers: req.body.maxNumUsers, 
            privacity: req.body.privacity,
            users: req.body.users, 
            travelDateInit: req.body.travelDateInit, 
            travelDateFin: req.body.travelDateFin,
            gender: req.body.gender, 
            hobbies: req.body.hobbies, 
            createdBy: req.body.createdBy, 
            dateOfCreation: req.body.dateOfCreation
        };
        TravelGroup.findByIdAndUpdate(req.params.id, { $set: updateTravelGroup }, { new: true }).then((data) => {
            res.status(200).json(data);
            console.log(data);

        }).catch((err) => {
            res.status(500).json(err);
        });
    }

   

    routes()
    {
        this.router.get('/travelgroup', this.getTravelGroups);
        this.router.get('/travelgroup/:id', this.getTravelGroup);
        this.router.post('/travelgroup', this.postTravelGroup);
        this.router.put('/travelgroup/:id', this.putTravelGroup);
        this.router.delete('/travelgroup/:id', this.deleteTravelGroup);
        this.router.put('/travelAddUser/:id', this.addUserTravelGroup);
        this.router.put('/travelDelUser/:id', this.eliminarUsuario);

    }
}

    const travelGroupRoutes = new TravelGroupRoutes();
    travelGroupRoutes.routes();

    export default travelGroupRoutes.router;
