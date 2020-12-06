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
    renderUserForm, 
    createNewUser, 
    renderUsers, 
    renderEditForm, 
    updateUser, 
    deleteUser
} = require('../controllers/users.controller');

// New note - Renderiza el formulario de un "Nuevo usuario"
router.get('/users/add', renderUserForm);

// Invoca la función para guardar el nuevo usuario
router.post('/users/new-user', createNewUser);

// Get all notes - Obtiene todos los usuarios que existen en la bd
router.get('/users', renderUsers);

// Edit notes - Renderiza el formulario de edición de un usuario
router.get('/users/edit/:id', renderEditForm);

// Invoca la función actualiza la información de un usuario en particular
router.put('/users/edit/:id', updateUser);

// Delete note - Elimina un usuario en particular
router.delete('/users/delete/:id', deleteUser);

module.exports = router;