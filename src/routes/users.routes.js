/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Se requieren los métodos del controlador de usuarios
const {
    renderSignUpForm,
    signup,
    renderLoginForm,
    logout,
    renderUserForm,
    createNewUser,
    renderUsers,
    renderEditForm,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');

const { isAuthenticated } = require('../helpers/auth');

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

router.get('/users/login', renderLoginForm);

/* router.post('/users/login', login); */
router.post('/users/login', function (req, res, next) {
    passport.authenticate('local', async (err, user, info) => {
        if (err) { return next(err); }

        if (!user) {
            req.flash('error', info.message);
            res.redirect('/users/login');
        }

        /* const payload = {
            id: user._id,
            email: user.mail
        };

        const options = {
            expiresIn: 86400
        };

        const token = jwt.sign(payload, 'secret123', options); */
        const token = await user.generateAuthToken();
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            } else {
                /* res.send({ token }); */
                req.user = user;
                console.log({ token });
                
                req.flash('success_msg', 'Acceso correcto');
                return res.redirect('/cars');                
            }

        })
    })(req, res, next)
})


router.get('/users/logout', logout);


// New note - Renderiza el formulario de un "Nuevo usuario"
router.get('/users/add', isAuthenticated, renderUserForm);

// Invoca la función para guardar el nuevo usuario
router.post('/users/new-user', isAuthenticated, createNewUser);

// Get all notes - Obtiene todos los usuarios que existen en la bd
router.get('/users', isAuthenticated, renderUsers);

// Edit notes - Renderiza el formulario de edición de un usuario
router.get('/users/edit/:id', isAuthenticated, renderEditForm);

// Invoca la función actualiza la información de un usuario en particular
router.put('/users/edit/:id', isAuthenticated, updateUser);

// Delete note - Elimina un usuario en particular
router.delete('/users/delete/:id', isAuthenticated, deleteUser);

module.exports = router;