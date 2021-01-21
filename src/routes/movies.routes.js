/* 
    Created on : 21 jan 2021
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const {Router} =  require('express');
const router = Router();

// Se requieren los métodos del controlador de películas
const {
    renderMovieForm, 
    createNewMovie, 
    renderMovies, 
    renderEditForm, 
    updateMovie, 
    deleteMovie
} = require('../controllers/movies.controller');

// New movie - Renderiza el formulario de una "Nueva película"
router.get('/movies/add', renderMovieForm);

// Invoca la función para guardar la nueva película
router.post('/movies/new-movie', createNewMovie);

// Get all movie - Obtiene todas las películas que existen en la bd
router.get('/movies', renderMovies);

// Edit movie - Renderiza el formulario de edición de una película
router.get('/movies/edit/:id', renderEditForm);

// Actualiza la información de una película en particular
router.put('/movies/edit/:id', updateMovie);

// Delete movie - Elimina una película en particular
router.delete('/movies/delete/:id', deleteMovie);

module.exports = router;