/* 
    Created on : 5 dec 2020
    Author     : Mario Cortés
    Master     : Dirección y Gestión de Proyectos Web
    Asignatura : Ingeniería y Desarrollo en la Web
*/

const carsCtrlr = {};

const Car = require('../models/cars');

// Método que renderiza el formulario de captura de nuevo auto
carsCtrlr.renderCarForm = (req, res) => {
    res.render('cars/new-car');
}

// Método que realiza el guardado del nuevo auto
carsCtrlr.createNewCar = async (req, res) => {
    console.log(req.body);
    const {
        car_brand,
        car_model,
        car_color
    } = req.body;
    const errors = [];
    if (car_brand == "" || car_brand.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (car_model == "" || car_model.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (car_color == "" || car_color.length == 0) {
        errors.push({ text: 'Cannt be empty fields' });
    }
    if (errors.length > 0) {
        res.render('cars/new-car', { 
            errors,
            car_brand,
            car_model,
            car_color
        });
    } else {
        const newCar = new Car({
            brand: car_brand,
            model: car_model,
            color: car_color
        });
        await newCar.save();
        req.flash('success_msg', 'Car added succesfully');
        console.log(newCar);
        res.redirect('/cars');
    }

}

// Método que lista todos los autos guardados en la bd
carsCtrlr.renderCars = async (req, res) => {
    const cars = await Car.find().lean();
    res.render('cars/all-cars', { cars });
}

// Método que renderiza el formulario de edición de un auto
carsCtrlr.renderEditForm = async (req, res) => {
    const car = await Car.findById(req.params.id).lean();
    console.log(car);
    res.render('cars/edit-car', { car });
}

// Método que actualiza la información de un auto
carsCtrlr.updateCar = async (req, res) => {
    await Car.findByIdAndUpdate(
        req.params.id,
        {
            brand: req.body.car_brand,
            model: req.body.car_model,
            color: req.body.car_color
        });
    req.flash('success_msg', 'Car updated succesfully');
    res.redirect('/cars');
}

// Método que elimina un usuario en específico
carsCtrlr.deleteCar = async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Car deleted succesfully');
    res.redirect('/cars');
}

module.exports = carsCtrlr;