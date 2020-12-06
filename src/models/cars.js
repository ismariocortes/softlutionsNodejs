/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

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