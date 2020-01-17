"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = __importDefault(require("../models/Post"));
require('dotenv').config();
const jwt = require('jsonwebtoken');
class PostRoutes {
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
    getPost(req, res) {
        console.log(req.params.id);
        Post_1.default.findOne({ "_id": req.params.id }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    getPosts(req, res) {
        Post_1.default.find({}).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    updatePost(req, res) {
        console.log(req.body);
        const post = {
            mensajes: req.body.mensajes,
            estado: req.body.estado
        };
        Post_1.default.findByIdAndUpdate(req.params.id, { $set: post }, { new: true }).then((data) => {
            console.log(post);
            res.status(201).json(data);
            //console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    postPost(req, res) {
        console.log(req.body);
        console.log(req.body.creador + req.body.titulo);
        console.log(req.body.estado + req.body.mensajes);
        const { creador, titulo, estado, mensajes } = req.body;
        const post = new Post_1.default({
            creador, titulo, estado, mensajes
        });
        post.save().then((data) => {
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
        this.router.post('/foro/post', this.authenticateToken, this.postPost);
        this.router.put('/foro/post/:id', this.authenticateToken, this.updatePost);
        this.router.get('/foro', this.authenticateToken, this.getPosts);
        this.router.get('/foro/:id', this.authenticateToken, this.getPost);
    }
}
const postRoutes = new PostRoutes();
postRoutes.routes();
exports.default = postRoutes.router;
