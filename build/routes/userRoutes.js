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
    getUsers(req, res) {
        User_1.default.find({}).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    getUser(req, res) {
        User_1.default.findOne({ "_id": req.params.id }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    getUserByUsername(req, res) {
        User_1.default.findOne({ "username": req.params.username }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    deleteUser(req, res) {
        User_1.default.findByIdAndDelete({ "_id": req.params.id }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    login(req, res) {
        console.log(req.body);
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
            if (error.code == 11000) {
                res.status(412).json(error);
            }
            else
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
            hobbies: req.body.hobbies,
            following: req.body.following,
            followers: req.body.followers
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
        this.router.post('/user/login', this.login);
        this.router.post('/user/postuser', this.postUser);
        this.router.get('/user', this.getUsers);
        this.router.get('/user/:id', this.getUser);
        this.router.get('/user/username/:username', this.getUserByUsername);
        this.router.delete('/user/deleteuser/:id', this.deleteUser);
        this.router.put('/user/updateUser/:id', this.updateUser);
    }
}
const userroutes = new userRoutes();
userroutes.routes();
exports.default = userroutes.router;
