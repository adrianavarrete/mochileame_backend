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
    getTravelGroupByFilters(req, res) {
        console.log(req.body);
        var filter = [];
        TravelGroup_1.default.find({}).then((data) => {
        }).catch((error) => {
            res.status(500).json(error);
        });
        // {
        //     name: req.body.name, 
        //     destination: req.body.destination, 
        //     users: req.body.users, 
        //     travelDateInit: req.body.travelDateInit, 
        //     travelDateFin: req.body.travelDateFin,
        //     gender: req.body.gender, 
        //     hobbies: req.body.hobbies, 
        // };
        if (req.body.name != null) {
            var parameter = "name : " + req.body.name;
            filter.push(parameter);
        }
        if (req.body.destination != null) {
            var parameter = "destination" + ":" + '"' + req.body.destination + '"';
            filter.push(parameter);
        }
        if (req.body.users != null) {
            var parameter = "users" + ":" + '"' + req.body.users + '"';
            filter.push(parameter);
        }
        if (req.body.travelDateInit != null) {
            var parameter = "travelDateInit" + ":" + '"' + req.body.travelDateInit + '"';
            filter.push(parameter);
        }
        if (req.body.travelDateFin != null) {
            var parameter = "travelDateFin" + ":" + '"' + req.body.travelDateFin + '"';
            filter.push(parameter);
        }
        if (req.body.gender != null) {
            var parameter = "gender" + ":" + '"' + req.body.gender + '"';
            filter.push(parameter);
        }
        if (req.body.hobbies != null) {
            var parameter = "hobbies" + ":" + '"' + req.body.hobbies + '"';
            filter.push(parameter);
        }
        console.log(filter);
        TravelGroup_1.default.findOne({ filter }).then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    routes() {
        this.router.get('/travelgroup/filters', this.getTravelGroupByFilters);
        this.router.get('/travelgroup', this.getTravelGroups);
        this.router.get('/travelgroup/:id', this.getTravelGroup);
        this.router.post('/travelgroup', this.postTravelGroup);
        this.router.put('/travelgroup/:id', this.putTravelGroup);
        this.router.delete('/travelgroup/:id', this.deleteTravelGroup);
        this.router.put('/travelAddUser/:id', this.addUserTravelGroup);
    }
}
const travelGroupRoutes = new TravelGroupRoutes();
travelGroupRoutes.routes();
exports.default = travelGroupRoutes.router;
