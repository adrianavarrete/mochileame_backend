import { Schema, model, Model } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    lastname: { type: String, required: false },
    dateofbirth: { type: Date, required: false },
    gender: { type: String, required: false },
    nationality: { type: String, required: false },
    photo: { type: String, required: false },  //nombre del archivo de la imagen que guardaremos en una carpeta del servidor
    biography: { type: String, required: false },
    hobbies: [String],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    score: [{
        key: String,
        value: Number
    }]

});

export default model('User', UserSchema);