"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TravelGroupSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    destination: { type: String, required: true, unique: true },
    maxNumUsers: { type: Number, required: true },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }],
    privacity: { type: Boolean, required: true },
    travelDateInit: { type: Date, required: true },
    travelDateFin: { type: Date, required: true },
    gender: { type: String, required: true },
    hobbies: [String],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfCreation: { type: Date, required: true },
    path: { type: String, required: true }
});
exports.default = mongoose_1.model('TravelGroup', TravelGroupSchema);
