/* 
    Created on : 21 jan 2021
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {        
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = helpers;



