/* 
    Created on : 5 dec 2020
    Modified on : 20 jan 2021
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

module.exports = router;