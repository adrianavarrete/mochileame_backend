import { Schema, model } from "mongoose";

const TravelGroupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    destination: { type: String, required: true, unique: true },
    maxNumUsers: {type: Number, required: true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    privacity: { type: Boolean, required: true },  // Si es true es un grupo privado, si es false es un grupo público
    travelDateInit: { type: Date, required: true },
    travelDateFin: { type: Date, required: true },
    gender: { type: String, required: true }, // male --> solo hombres, female --> solo mujeres, mix --> ambos generos
    hobbies: [String],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfCreation: { type: Date, required: true },
    path:{type: String,  required: true}
});

export default model('TravelGroup', TravelGroupSchema);