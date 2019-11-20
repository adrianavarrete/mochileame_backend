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
    deleteUser(req, res) {
        User_1.default.findByIdAndDelete({ "_id": req.params.id }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
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
    routes() {
        this.router.post('/login', this.login);
        this.router.post('/postuser', this.postUser);
        this.router.get('/getusers', this.getUsers);
        this.router.get('/getuser/:id', this.getUser);
        this.router.delete('/deleteuser/:id', this.deleteUser);
    }
}
const userroutes = new userRoutes();
userroutes.routes();
exports.default = userroutes.router;
