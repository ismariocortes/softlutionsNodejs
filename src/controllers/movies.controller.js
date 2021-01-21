/* 
    Created on : 21 jan 2021
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const moviesCtrlr = {};

const Movie = require('../models/movies');
const fetch = require('node-fetch');

// Método que renderiza el formulario de captura de nueva película
moviesCtrlr.renderMovieForm = (req, res) => {
    res.render('movies/new-movie');
}

// Método que realiza el guardado de la nueva película
moviesCtrlr.createNewMovie = async (req, res) => {
    console.log(req.body);
    const {
        title,
        director,
        year
    } = req.body;
    const errors = [];
    if (title == "" || title.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (director == "" || director.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (year == "" || year.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (errors.length > 0) {
        res.render('movies/new-movie', {
            errors,
            title,
            director,
            year
        });
    } else {
        await fetch("https://apirest-movies.herokuapp.com/api/movies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                director: director,
                year: year
            })
        });
        req.flash('success_msg', 'Movie added succesfully');
        res.redirect('/movies');
    }
}

// Método que lista todas las película guardadoas en la bd
moviesCtrlr.renderMovies = async (req, res) => {
    /* const movies = await Movie.find().lean(); */
    const response = await fetch('https://apirest-movies.herokuapp.com/api/movies');
    const movies = await response.json();
    console.log(movies);
    res.render('movies/all-movies', { movies });
}

// Método que renderiza el formulario de edición de la película
moviesCtrlr.renderEditForm = async (req, res) => {
    const movie = await Movie.findById(req.params.id).lean();
    console.log(movie);
    res.render('movies/edit-movie', { movie });
}

// Método que actualiza la información de la película
moviesCtrlr.updateMovie = async (req, res) => {
    await fetch("https://apirest-movies.herokuapp.com/api/movies/" + req.params.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: req.body.title,
            director: req.body.director,
            year: req.body.year
        })
    });
    req.flash('success_msg', 'Movie updated succesfully');
    res.redirect('/movies');
}

// Método que elimina una película en específico
moviesCtrlr.deleteMovie = async (req, res) => {
    /* await Movie.findByIdAndDelete(req.params.id); */
    await fetch('https://apirest-movies.herokuapp.com/api/movies/' + req.params.id, { method: 'DELETE' });
    req.flash('success_msg', 'Movie deleted succesfully');
    res.redirect('/movies');
}

module.exports = moviesCtrlr;