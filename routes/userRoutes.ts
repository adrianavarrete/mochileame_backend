import { Request, Response, Router } from 'express';
import TravelGroup from '../models/TravelGroup';
import User  from '../models/User';

class userRoutes{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();

    }

    getUsers(req: Request, res: Response): void {
        User.find({}).then((data) => {
            res.status(200).json(data);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    getUser(req: Request, res: Response): void {
        User.findOne({ "_id": req.params.id }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }

    deleteUser(req: Request, res: Response): void{
        User.findByIdAndDelete({"_id": req.params.id}).then((data) =>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        });
    }

    login(req: Request, res: Response): void {
        console.log(req.params);

        User.findOne({username : req.body.username, password : req.body.password}).then((data)=>{
            res.status(200).json(data);

        }).catch((error) =>{
            res.status(500).json(error);
        })
    }

    postUser(req: Request, res: Response): void {
        const {username, password, mail} = req.body;
        const user = new User({
            username, password, mail
        });
        user.save().then((data) =>{
            res.status(200).json(data)
            
        }).catch((error) =>{
            if(error.code == 11000){
                res.status(412).json(error);
            }else
                res.status(500).json(error);
        });
    }

    routes(){
        this.router.post('/login', this.login);
        this.router.post('/postuser', this.postUser);
        this.router.get('/getusers', this.getUsers);
        this.router.get('/getuser/:id', this.getUser);        
        this.router.delete('/deleteuser/:id', this.deleteUser);
    }
}
    
const userroutes = new userRoutes();
userroutes.routes();

export default userroutes.router;
    
