/* 
    Created on : 21 jan 2021
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (mail, password, done) {
    const user = await User.findOne({ mail });
    if (!user) {
        return done(null, false, { message: 'No se encontró el usuario.' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }
    }
}));

/* passport.use(new JWTStrategy({
    secretOrKey: 'secret123',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    return done(null, token.user)
})) */

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});