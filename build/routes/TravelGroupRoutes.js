"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TravelGroup_1 = __importDefault(require("../models/TravelGroup"));
require('dotenv').config();
const jwt = require('jsonwebtoken');
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
    postTravelGroup(req, res) {
        const { name, destination, maxNumUsers, users, privacity, travelDateInit, travelDateFin, gender, hobbies, createdBy, dateOfCreation } = req.body;
        const newTravelGroup = new TravelGroup_1.default({ name, destination, maxNumUsers, users, privacity, travelDateInit, travelDateFin, gender, hobbies, createdBy, dateOfCreation });
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
    routes() {
        this.router.get('/travelgroup', this.authenticateToken, this.getTravelGroups);
        this.router.get('/travelgroup/:id', this.authenticateToken, this.getTravelGroup);
        this.router.post('/travelgroup', this.authenticateToken, this.postTravelGroup);
        this.router.put('/travelgroup/:id', this.authenticateToken, this.putTravelGroup);
        this.router.delete('/travelgroup/:id', this.authenticateToken, this.deleteTravelGroup);
        this.router.put('/travelAddUser/:id', this.authenticateToken, this.addUserTravelGroup);
        this.router.put('/travelDelUser/:id', this.authenticateToken, this.eliminarUsuario);
    }
}
const travelGroupRoutes = new TravelGroupRoutes();
travelGroupRoutes.routes();
exports.default = travelGroupRoutes.router;
