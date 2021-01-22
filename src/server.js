/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

/* Módulos ****************************************************************** */
// Express
const express = require('express');

// Módulo para el uso de Plantillas
const exphbs = require('express-handlebars');

// Habilita el uso del path.join para concatenación
const path = require('path');

// Para ver las peticiones que llegan al servidor
const morgan = require('morgan');

// Sobreescribe el verbo POST con los verbos DELETE y/o PUT para usarlos en los formularios
const methodOverride = require('method-override');

// Módulos para enviar mensajes entre las páginas del sitio
const flash = require('connect-flash');
const session = require('express-session');

// Módulo para el logueo y la sesión
const passport = require('passport');


/* Initiazlizations *********************************************************** */
const app = express(); 
require('./config/passport');


/* Settings ******************************************************************* */
// Si existe un parámetro PORT lo toma, de lo contrario usa el puerto 4000
app.set('port', process.env.PORT || 4000);
// Indica dónde se colocarán las vistas
app.set('views', path.join(__dirname,'views'));
// configuración de Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

/* Middlewares ************************************************************ */
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json()); // Permite al servidor entender formato json


/* Global variables ******************************************************* */
// Se usan las variables creadas por el método flash
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

/* Routes ***************************************************************** */
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/cars.routes'));
app.use(require('./routes/movies.routes'));

/* Static files *********************************************************** */
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;