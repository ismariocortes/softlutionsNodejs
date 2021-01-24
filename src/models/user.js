/* 
    Created on : 5 dec 2020
    Modified on : 20 jan 2021
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Se define la estructura de la tabla User
const UserSchema = new Schema({
    name: { type: String, required: true },
    telephone: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    token: {type: String}
},{ 
    timestamps: true 
})

// Método para encriptar la contraseña que ingresa el usuario
UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

// Método que compara la contraseña ingresada por el usuario con la guardada en la bd
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

// Genera el token único de la sesión de usuario
UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, 'secret123');
    user.token = token;
    await user.save();
    return token;
 }

module.exports = model('User',UserSchema, 'users');