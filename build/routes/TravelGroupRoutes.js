"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class TravelGroupRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
    }
}
const travelGroupRoutes = new TravelGroupRoutes();
travelGroupRoutes.routes();
exports.default = travelGroupRoutes.router;
