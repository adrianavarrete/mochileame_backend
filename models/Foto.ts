import { Schema, model } from "mongoose";

const FotoSchema = new Schema({
    img: { data: Buffer, contentType: String }
});

export default model('Foto', FotoSchema);