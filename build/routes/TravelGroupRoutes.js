"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TravelGroup_1 = __importDefault(require("../models/TravelGroup"));
class TravelGroupRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
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
    /*    name: { type: String, required: true, unique: true },
    destination: { type: String, required: true, unique: true },
    maxNumUsers: {type: Number, required: true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    privacity: { type: Boolean, required: true },  // Si es true es un grupo privado, si es false es un grupo público
    travelDateInit: { type: Date, required: true },
    travelDateFin: { type: Date, required: true },
    gender: { type: String, required: true }, // male --> solo hombres, female --> solo mujeres, mix --> ambos generos
    hobbies: [String],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfCreation: { type: Date, required: true }
    */
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
    putTravelGroup(req, res) {
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
        this.router.get('/travelgroup/', this.getTravelGroups);
        this.router.get('/travelgroup/:id', this.getTravelGroup);
        this.router.post('/travelgroup/', this.postTravelGroup);
        this.router.put('/travelgroup/:id', this.putTravelGroup);
        this.router.delete('/travelgroup/:id', this.deleteTravelGroup);
    }
}
const travelGroupRoutes = new TravelGroupRoutes();
travelGroupRoutes.routes();
exports.default = travelGroupRoutes.router;
