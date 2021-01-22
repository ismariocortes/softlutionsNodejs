/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const {Router} =  require('express');
const router = Router();

// Se requieren los métodos del controlador de usuarios
const {
    renderSignUpForm,
    signup,
    renderLoginForm,
    login,
    logout,    
    renderUserForm, 
    createNewUser, 
    renderUsers, 
    renderEditForm, 
    updateUser, 
    deleteUser
} = require('../controllers/users.controller');

const {isAuthenticated} = require('../helpers/auth');

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

router.get('/users/login', renderLoginForm);

router.post('/users/login', login);

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