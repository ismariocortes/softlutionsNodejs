
// Accede al archivo con extensión .env que contiene variables de entorno
require('dotenv').config();

// Usa el archivo server.js que contiene el módulo express
const app = require('./server');

// Accede al archivo database.js que realiza la conexión a la base de datos
require('./database');


// Servidor que escucha las peticiones
app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
});

// https://www.youtube.com/watch?v=AknTRNvX9rA&list=PLo5lAe9kQrwqUEXK7oQbzv63KsdODzuAy&index=5&ab_channel=FaztCode

// https://www.youtube.com/watch?v=w8fTsP7Swts&list=PLo5lAe9kQrwqUEXK7oQbzv63KsdODzuAy&index=7&ab_channel=FaztCode