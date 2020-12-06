/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const indexCtrlr = {};

// Método que renderiza el index del sitio
indexCtrlr.renderIndex = (req, res) =>{
    res.render('index');
}

/* indexCtrlr.renderAbout = (req, res) =>{
    res.render('about');
} */

module.exports = indexCtrlr;