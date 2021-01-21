/* 
    Created on : 21 jan 2021
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const { Schema, model } = require("mongoose");

// Se define la estructura de la tabla User
const MovieSchema = new Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: String, required: true }
},{ 
    timestamps: true 
})


module.exports = model('Movie',MovieSchema, 'movies');