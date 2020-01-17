import { Schema, model } from "mongoose";

const PostSchema = new Schema({
   

creador: { type: String, required: true },
titulo: { type: String, required: true },
estado: { type: String },
mensajes: [String],
path: {type: String, required: true}
});

export default model('Post', PostSchema);


