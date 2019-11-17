import { Request, Response, Router } from 'express';
import TravelGroup from '../models/TravelGroup';
import User  from '../models/User';

class userRoutes

{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();

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
           console.log(req.body.username + req.body.password + req.body.mail);
          const {username, password, mail} = req.body;
           const user = new User({
                    username, password, mail
            });
                user.save().then((data) =>{
                    res.status(200).json(data)
                    
                }).catch((error) =>{
                res.status(500).json(error);
    
            });
        }
    






        routes()
        {
            this.router.post('/login', this.login);
            this.router.post('/postuser', this.postUser);
        }
    }
    
        const userroutes = new userRoutes();
        userroutes.routes();
    
        export default userroutes.router;
    
