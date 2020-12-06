/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const notesCtrlr = {};

const User = require('../models/user');

// Método que renderiza el formulario de captura de nuevo usuario
notesCtrlr.renderUserForm = (req, res) => {
    res.render('users/new-user');
}

// Método que realiza el guardado del nuevo usuario
notesCtrlr.createNewUser = async (req, res) => {
    console.log(req.body);
    const {
        user_name,
        user_tel,
        user_mail,
        user_pass
    } = req.body;
    const errors = [];
    if (user_name == "" || user_name.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (user_tel == "" || user_tel.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (user_mail == "" || user_mail.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (user_pass == "" || user_pass.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (errors.length > 0) {
        res.render('users/new-user', { 
            errors,
            user_name,
            user_tel,
            user_mail
        });
    } else {
        const newUser = new User({
            name: user_name,
            telephone: user_tel,
            mail: user_mail,
            password: user_pass
        });
        await newUser.save();
        req.flash('success_msg', 'User added succesfully');
        console.log(newUser);
        res.redirect('/users');
    }

}

// Método que lista todos los usuarios guardados en la bd
notesCtrlr.renderUsers = async (req, res) => {
    const users = await User.find().lean();
    res.render('users/all-users', { users });
}

// Método que renderiza el formulario de edición del usuario
notesCtrlr.renderEditForm = async (req, res) => {
    const user = await User.findById(req.params.id).lean();
    console.log(user);
    res.render('users/edit-user', { user });
}

// Método que actualiza la información del usuario
notesCtrlr.updateUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.user_name,
            telephone: req.body.user_tel,
            mail: req.body.user_mail
        });
    req.flash('success_msg', 'User updated succesfully');
    res.redirect('/users');
}

// Método que elimina un usuario en específico
notesCtrlr.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'User deleted succesfully');
    res.redirect('/users');
}

module.exports = notesCtrlr;