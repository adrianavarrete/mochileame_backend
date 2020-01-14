"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
require('dotenv').config();
const jwt = require('jsonwebtoken');
var auth = "0";
class userRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log("token : " + token);
        if (token == null)
            return res.sendStatus(401);
        jwt.verify(token, "d3bafcd8feb597e65e7c67bbfe224f180f22b8883be84da1918632250cc3254ca67dd3c95ed3425d8ef73636e3dec5d21629c28452eff8345d592a32b646d57e", (err) => {
            console.log(err);
            if (err)
                return res.sendStatus(403);
            next();
        });
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
    getFollowers(req, res) {
        User_1.default.findOne({ "_id": req.params.id }).populate('followers').then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    getFollowingsAndFollowers(req, res) {
        User_1.default.findOne({ "_id": req.params.id }).populate('following').populate('followers').then((data) => {
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
    deleteAll(req, res) {
        User_1.default.remove({}).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    login(req, res) {
        console.log(req.body);
        User_1.default.findOne({ username: req.body.username, password: req.body.password }).then((data) => {
            const accessToken = jwt.sign(req.body.username, "d3bafcd8feb597e65e7c67bbfe224f180f22b8883be84da1918632250cc3254ca67dd3c95ed3425d8ef73636e3dec5d21629c28452eff8345d592a32b646d57e");
            res.status(200).json({ data, accessToken: accessToken });
            // res.status(200).json({data});
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
            const accessToken = jwt.sign(req.body.username, "d3bafcd8feb597e65e7c67bbfe224f180f22b8883be84da1918632250cc3254ca67dd3c95ed3425d8ef73636e3dec5d21629c28452eff8345d592a32b646d57e");
            res.status(200).json({ data, accessToken: accessToken });
        }).catch((error) => {
            if (error.code == 11000) {
                res.status(412).json(error);
            }
            else
                res.status(500).json(error);
        });
    }
    updateUser(req, res) {
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
        this.router.get('/user', this.authenticateToken, this.getUsers);
        this.router.get('/user/:id', this.authenticateToken, this.getUser);
        this.router.get('/user/:id/followers', this.authenticateToken, this.getFollowers);
        this.router.get('/user/:id/friends', this.authenticateToken, this.getFollowingsAndFollowers);
        this.router.get('/user/username/:username', this.authenticateToken, this.getUserByUsername);
        this.router.delete('/user/deleteuser/:id', this.authenticateToken, this.deleteUser);
        this.router.delete('/user/deleteAll', this.authenticateToken, this.deleteAll);
        this.router.put('/user/updateUser/:id', this.authenticateToken, this.updateUser);
    }
}
const userroutes = new userRoutes();
userroutes.routes();
exports.default = userroutes.router;
