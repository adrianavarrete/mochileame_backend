"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = __importDefault(require("../models/Post"));
const Foto_1 = __importDefault(require("../models/Foto"));
require('dotenv').config();
const jwt = require('jsonwebtoken');
var fs = require('fs');
var multer = require('multer');
var pathFoto = "";
// const upload = multer({dest :'uploads/'});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        pathFoto = file.path;
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
var path = require('path');
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
        const { creador, titulo, estado, mensajes, path } = req.body;
        const post = new Post_1.default({
            creador, titulo, estado, mensajes, path
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
    añadirPathPost(req, res) {
        console.log(req.body);
        const path = {
            path: req.body.path
        };
        Post_1.default.findByIdAndUpdate(req.body.id, { $set: path }, { new: true }).then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    routes() {
        this.router.post('/foro/post', this.authenticateToken, this.postPost);
        this.router.put('/foro/post/:id', this.authenticateToken, this.updatePost);
        this.router.get('/foro', this.authenticateToken, this.getPosts);
        this.router.get('/foro/:id', this.authenticateToken, this.getPost);
        this.router.put('/foro/foto', this.authenticateToken, this.añadirPathPost);
        this.router.post('/foto2', upload.single('file'), this.authenticateToken, (req, res) => {
            var b = req;
            console.log(b.file);
            //console.log(req);
            var imgPath = path.join('./uploads/' + "502a8ce36d34e5a38084af56fa816202.png"); // this is the path to your server where multer already has stored your image
            //console.log(imgPath);
            var a = fs.readFileSync(imgPath);
            const data = a;
            imgPath.filename;
            console.log("aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + imgPath.filename);
            //console.log(b.file);
            data.name = data.name + "";
            const contentType = 'image/png';
            var foto = new Foto_1.default({ data, contentType });
            foto.save();
            var foto = new Foto_1.default({ data, contentType });
            foto.save().then((data) => {
                res.status(200).json(req.file.path);
                //console.log(data);
            }).catch((error) => {
                res.status(500).json(error);
            });
        });
    }
}
const postRoutes = new PostRoutes();
postRoutes.routes();
exports.default = postRoutes.router;
