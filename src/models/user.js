const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

// Se define la estructura de la tabla User
const UserSchema = new Schema({
    name: { type: String, required: true },
    telephone: { type: String, required: true },
    mail: { type: String, required: true },
    password: {type: String, required: true}
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

module.exports = model('User',UserSchema, 'users');