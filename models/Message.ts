import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    msg: { type: String },
    name: {type: String},
    grupo: {type: String}
});

export default model('Msg', MessageSchema);