import { Request, Response, Router } from 'express';
import TravelGroup from '../models/TravelGroup';
import User from '../models/User';

class userRoutes {

    router: Router;
    user: any;

    constructor() {
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

    getUserByUsername(req: Request, res: Response): void {
        User.findOne({ "username": req.params.username }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }

    getFollowers(req: Request, res: Response): void {
        User.findOne({ "_id": req.params.id }).populate('followers').then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }

    getFollowingsAndFollowers(req: Request, res: Response): void {
        User.findOne({ "_id": req.params.id }).populate('following').populate('followers').then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    deleteUser(req: Request, res: Response): void {
        User.findByIdAndDelete({ "_id": req.params.id }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }

    deleteAll(req: Request, res: Response): void {
        User.remove({}).then((data) => {
            res.status(200).json(data);

        }).catch((error) => {
            res.status(500).json(error);
        })
    }

    login(req: Request, res: Response): void {
        console.log(req.body);

        User.findOne({ username: req.body.username, password: req.body.password }).then((data) => {
            res.status(200).json(data);

        }).catch((error) => {
            res.status(500).json(error);
        })
    }


    postUser(req: Request, res: Response): void {
        console.log(req.body.username + req.body.password + req.body.mail);
        const { username, password, mail } = req.body;
        const user = new User({
            username, password, mail
        });
        user.save().then((data) => {
            res.status(200).json(data)

        }).catch((error) => {
            if (error.code == 11000) {
                res.status(412).json(error);
            } else
                res.status(500).json(error);

        });
    }

    updateUser(req: Request, res: Response): void {
        console.log(req.body);
        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            dateofbirth: req.body.dateofbirth,
            gender: req.body.gender,
            nationality: req.body.nationality,
            photo: req.body.photo,
            biography: req.body.biography,
            hobbies: req.body.hobbies,
            following: req.body.following,
            followers: req.body.followers
        };

        User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }).then((data) => {
            console.log(user);
            res.status(201).json(data);
            //console.log(data);

        }).catch((err) => {
            res.status(500).json(err);
        })
    }

    routes() {
        this.router.post('/user/login', this.login);
        this.router.post('/user/postuser', this.postUser);
        this.router.get('/user', this.getUsers);
        this.router.get('/user/:id', this.getUser);
        this.router.get('/user/:id/followers', this.getFollowers);
        this.router.get('/user/:id/friends', this.getFollowingsAndFollowers);
        this.router.get('/user/username/:username', this.getUserByUsername);
        this.router.delete('/user/deleteuser/:id', this.deleteUser);
        this.router.delete('/user/deleteAll', this.deleteAll);
        this.router.put('/user/updateUser/:id', this.updateUser);
    }
}

const userroutes = new userRoutes();
userroutes.routes();

export default userroutes.router;

