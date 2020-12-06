/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const {Router} =  require('express');
const router = Router();

// Se requieren los métodos del controlador de Cars
const {
    renderCarForm, 
    createNewCar, 
    renderCars, 
    renderEditForm, 
    updateCar, 
    deleteCar
} = require('../controllers/cars.controller');

// New car - renderiza el formulario de "Nuevo auto"
router.get('/cars/add', renderCarForm);

// Invoca la función para guardar un nuevo auto
router.post('/cars/new-car', createNewCar);

// Get all cars - Obtiene todos los autos que existen en la bd
router.get('/cars', renderCars);

// Edit cars - Edita un auto en particular
router.get('/cars/edit/:id', renderEditForm);

// Invoca la función que actualiza la información de un auto en particular
router.put('/cars/edit/:id', updateCar);

// Delete cars - Elimina un auto en particular
router.delete('/cars/delete/:id', deleteCar);

module.exports = router;