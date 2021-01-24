/* 
    Created on : 5 dec 2020
    Modified on : 20 jan 2021
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
    https://www.youtube.com/watch?v=UExhqZBEPQg&t=309s&ab_channel=truecodex
    https://www.youtube.com/watch?v=EcCIlxfxc4g&t=430s&ab_channel=PractiDev
    https://www.youtube.com/watch?v=w8It1NHeGps&ab_channel=CarlosAzaustre
*/


const usersCtrlr = {};
const passport = require('passport');
const User = require('../models/user');

/* Renderiza el formulario de registro */
usersCtrlr.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}

/* Realiza el registro del usuario */
usersCtrlr.signup = async (req, res) => {
    const errors = [];
    const { name, telephone, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: "Las contraseñas no coinciden." });
    }
    if (password.length < 4) {
        errors.push({ text: "La contraseña es demasiado corta." });
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, telephone, name, email});
    }else{
        const emailUser = await User.findOne({mail: email});
        if(emailUser){
            errors.push({ text: "El correo ya se encuentra registrado." });
            res.render('users/signup', {errors, telephone, name, email});
        }else{
            const newUser = new User({
                name: name,
                telephone: telephone,
                mail: email,
                password: password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Registro correcto');
            res.redirect('/users/login');
        }
    }
}

/* Renderiza el formulario de Logueo */
usersCtrlr.renderLoginForm = (req, res) => {
    res.render('users/login');
}

/* Cierra la sesión del usuario */
usersCtrlr.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesión cerrada correctamente.');
    res.redirect('/users/login');
}

// Método que renderiza el formulario de captura de nuevo usuario
usersCtrlr.renderUserForm = (req, res) => {
    res.render('users/new-user');
}

// Método que realiza el guardado del nuevo usuario
usersCtrlr.createNewUser = async (req, res) => {
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
usersCtrlr.renderUsers = async (req, res) => {
    const users = await User.find().lean();
    res.render('users/all-users', { users });
}

// Método que renderiza el formulario de edición del usuario
usersCtrlr.renderEditForm = async (req, res) => {
    const user = await User.findById(req.params.id).lean();
    console.log(user);
    res.render('users/edit-user', { user });
}

// Método que actualiza la información del usuario
usersCtrlr.updateUser = async (req, res) => {
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
usersCtrlr.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'User deleted succesfully');
    res.redirect('/users');
}

module.exports = usersCtrlr;