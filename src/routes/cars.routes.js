const {Router} =  require('express');
const router = Router();

const {
    renderCarForm, 
    createNewCar, 
    renderCars, 
    renderEditForm, 
    updateCar, 
    deleteCar
} = require('../controllers/cars.controller');

//New car
router.get('/cars/add', renderCarForm);

router.post('/cars/new-car', createNewCar);

// Get all cars
router.get('/cars', renderCars);

// Edit cars
router.get('/cars/edit/:id', renderEditForm);

router.put('/cars/edit/:id', updateCar);

// Delete cars
router.delete('/cars/delete/:id', deleteCar);

module.exports = router;