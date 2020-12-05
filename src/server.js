/* Módulos ****************************************************************** */
// Express
const express = require('express');

// Módulo para el uso de Plantillas
const exphbs = require('express-handlebars');

// Habilita el uso del path.join para concatenación
const path = require('path');

// Para ver las peticiones que llegan al servidor
const morgan = require('morgan');

// Sobre escribe el verbo POST con los verbos DELETE y/o PUT para usarlos en los formularios
const methodOverride = require('method-override');

// Módulos para enviar mensajes entre las páginas del sitio
const flash = require('connect-flash');
const session = require('express-session');


/* Initiazlizations *********************************************************** */
const app = express(); 


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
app.use(flash());

/* Global variables ******************************************************* */
// Se usan las variables creadas por el método flash
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    next();
});

/* Routes ***************************************************************** */
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));

/* Static files *********************************************************** */
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;

//https://www.youtube.com/watch?v=PQL_iwLKnRg&list=PLo5lAe9kQrwqUEXK7oQbzv63KsdODzuAy&index=14&ab_channel=FaztCode

//https://account.mongodb.com/account/login?signedOut=true

//https://zellwk.com/blog/crud-express-mongodb/

// Servidor público
//https://portal.azure.com/?quickstart=True#home
//https://www.youtube.com/watch?v=8vPi6AeCLKQ&t=660s&ab_channel=FaztCode

// Url de la app
// https://softlutions.azurewebsites.net/
