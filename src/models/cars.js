const { Schema, model } = require("mongoose");

// Se define la estructura de la tabla Cars
const CarSchema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true }
},{ 
    timestamps: true 
})


module.exports = model('Car',CarSchema, 'cars');