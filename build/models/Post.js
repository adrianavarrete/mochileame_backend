"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    creador: { type: String, required: true },
    titulo: { type: String, required: true },
    estado: { type: String },
    mensajes: [String],
    path: { type: String, required: true }
});
exports.default = mongoose_1.model('Post', PostSchema);
