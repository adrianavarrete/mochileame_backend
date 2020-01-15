"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    lastname: { type: String, required: false },
    dateofbirth: { type: Date, required: false },
    gender: { type: String, required: false },
    nationality: { type: String, required: false },
    photo: { type: String, required: false },
    biography: { type: String, required: false },
    hobbies: [String],
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false }],
    score: { type: Number },
    whoScore: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false }]
});
exports.default = mongoose_1.model('User', UserSchema);
