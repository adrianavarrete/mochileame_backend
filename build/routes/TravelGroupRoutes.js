"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TravelGroup_1 = __importDefault(require("../models/TravelGroup"));
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
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({ storage: storage });
var path = require('path');
class TravelGroupRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token);
        if (token == null)
            return res.sendStatus(401);
        jwt.verify(token, "d3bafcd8feb597e65e7c67bbfe224f180f22b8883be84da1918632250cc3254ca67dd3c95ed3425d8ef73636e3dec5d21629c28452eff8345d592a32b646d57e", (err) => {
            console.log(err);
            if (err)
                return res.sendStatus(403);
            next();
        });
    }
    getTravelGroups(req, res) {
        TravelGroup_1.default.find({}).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    getTravelGroup(req, res) {
        console.log(req.params.id);
        TravelGroup_1.default.findOne({ "_id": req.params.id }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    añadirPathreq(req, res) {
        console.log(req.body);
        const path = {
            path: req.body.path
        };
        TravelGroup_1.default.findByIdAndUpdate(req.body.id, { $set: path }, { new: true }).then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    postTravelGroup(req, res) {
        const { name, destination, maxNumUsers, users, privacity, travelDateInit, travelDateFin, gender, hobbies, createdBy, dateOfCreation, path } = req.body;
        const newTravelGroup = new TravelGroup_1.default({ name, destination, maxNumUsers, users, privacity, travelDateInit, travelDateFin, gender, hobbies, createdBy, dateOfCreation, path });
        newTravelGroup.save().then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    deleteTravelGroup(req, res) {
        console.log(req.params.id);
        TravelGroup_1.default.findByIdAndDelete(req.params.id).then((data) => {
            res.status(201).json(data);
            console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    eliminarUsuario(req, res) {
        console.log(req.params);
        const cambioDeLista = {
            users: req.body.users
        };
        TravelGroup_1.default.findByIdAndUpdate(req.params.id, { $set: cambioDeLista }, { new: true }).then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    addUserTravelGroup(req, res) {
        console.log(req.params.id);
        console.log(req.body.name);
        const cambioDeLista = {
            users: req.body.name
        };
        TravelGroup_1.default.findByIdAndUpdate(req.params.id, { $addToSet: cambioDeLista }, { new: true }).then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    putTravelGroup(req, res) {
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
        TravelGroup_1.default.findByIdAndUpdate(req.params.id, { $set: updateTravelGroup }, { new: true }).then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    postFoto(req, res) {
        //req.file
        console.log(req);
        var imgPath = path.join('./uploads/' + "502a8ce36d34e5a38084af56fa816202" + '.jpg'); // this is the path to your server where multer already has stored your image
        console.log(imgPath);
        var a = fs.readFileSync(imgPath);
        Foto_1.default.findByIdAndUpdate("502a8ce36d34e5a38084af56fa816202", {
            $set: { 'img.data': a,
                'img.contentType': 'image/png' }
        }, function (err, doc) {
            if (err)
                console.log("oi");
        });
        //In case you want to send back the stored image from the db.
        //    Foto.findById(id, function (err, doc) {
        //      if (err)console.log(err);
        //      var base64 = doc.img.data.toString('base64');
        //      res.send('data:'+doc.img.contentType+';base64,' + base64);
        //    });
        //    const data = req.body.formData;
        //    const contentType = 'image/png';
        //    var foto = new Foto({data, contentType});
        //     foto.save().then((data) => {
        //         res.status(200).json(data);
        //         console.log(data);
        //     }).catch((error) => {
        //         res.status(500).json(error);
        //     });
    }
    routes() {
        this.router.get('/travelgroup', this.authenticateToken, this.getTravelGroups);
        this.router.get('/travelgroup/:id', this.authenticateToken, this.getTravelGroup);
        this.router.post('/travelgroup', this.authenticateToken, this.postTravelGroup);
        this.router.put('/travelgroup/:id', this.authenticateToken, this.putTravelGroup);
        this.router.delete('/travelgroup/:id', this.authenticateToken, this.deleteTravelGroup);
        this.router.put('/travelAddUser/:id', this.authenticateToken, this.addUserTravelGroup);
        this.router.put('/travelDelUser/:id', this.authenticateToken, this.eliminarUsuario);
        this.router.put('/travelgroupPath', this.authenticateToken, this.añadirPathreq);
        this.router.get('/fotos', (req, res) => {
            Foto_1.default.find({}).then((data) => {
                res.status(200).json(data);
            }).catch((error) => {
                res.status(500).json(error);
            });
        });
        this.router.post('/foto', upload.single('file'), this.authenticateToken, (req, res) => {
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
const travelGroupRoutes = new TravelGroupRoutes();
travelGroupRoutes.routes();
exports.default = travelGroupRoutes.router;
