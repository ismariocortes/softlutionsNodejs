/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const {Router} =  require('express');
const router = Router();

// Se reruieren los métodos del controlador del index
const {
    renderIndex
} = require('../controllers/index.controller');

// Renderiza el index del sitio
router.get('/', renderIndex );

/* router.get('/about', renderAbout); */

module.exports = router;