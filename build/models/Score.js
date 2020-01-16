"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScoreSchema = new mongoose_1.Schema({
    whoScore: { type: String, required: true, unique: true },
    score: { type: Number, required: true, unique: false },
});
exports.default = mongoose_1.model('Score', ScoreSchema);
