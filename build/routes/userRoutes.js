"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
class userRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    login(req, res) {
        console.log(req.params);
        User_1.default.findOne({ username: req.body.username, password: req.body.password }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    postUser(req, res) {
        console.log(req.body.username + req.body.password + req.body.mail);
        const { username, password, mail } = req.body;
        const user = new User_1.default({
            username, password, mail
        });
        user.save().then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    updateUser(req, res) {
        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            dateofbirth: req.body.dateofbirth,
            gender: req.body.gender,
            nationality: req.body.nationality,
            photo: req.body.photo,
            biography: req.body.biography,
            hobbies: req.body.hobbies
        };
        User_1.default.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }).then((data) => {
            console.log(user);
            res.status(201).json(data);
            //console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    routes() {
        this.router.post('/login', this.login);
        this.router.post('/postuser', this.postUser);
        this.router.put('/updateUser/:id', this.updateUser);
    }
}
const userroutes = new userRoutes();
userroutes.routes();
exports.default = userroutes.router;
