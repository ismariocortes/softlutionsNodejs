const {Router} =  require('express');
const router = Router();

const {
    renderUserForm, 
    createNewUser, 
    renderUsers, 
    renderEditForm, 
    updateUser, 
    deleteUser
} = require('../controllers/users.controller');

//New note
router.get('/users/add', renderUserForm);

router.post('/users/new-user', createNewUser);

// Get all notes
router.get('/users', renderUsers);

// Edit notes
router.get('/users/edit/:id', renderEditForm);

router.put('/users/edit/:id', updateUser);

// Delete note
router.delete('/users/delete/:id', deleteUser);

module.exports = router;