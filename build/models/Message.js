"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    msg: { type: String },
    name: { type: String },
    grupo: { type: String }
});
exports.default = mongoose_1.model('Msg', MessageSchema);
