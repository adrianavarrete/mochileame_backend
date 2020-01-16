"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FotoSchema = new mongoose_1.Schema({
    img: { data: Buffer, contentType: String }
});
exports.default = mongoose_1.model('Foto', FotoSchema);
