/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

// Accede al archivo (en caso de existir) con extensión .env que contiene variables de entorno
require('dotenv').config();

// Usa el archivo server.js que contiene el módulo express
const app = require('./server');

// Accede al archivo database.js que realiza la conexión a la base de datos
require('./database');


// Servidor que escucha las peticiones
app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
});
