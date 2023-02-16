const controllers = require('../controllers/userControllers');
const router = require('express').Router();

// CRUD Routes /users
router.get('/',controllers.getUsers); // /users
router.get('/:userId', controllers.getUser); // /users/:userId
router.post('/', controllers.createUser); // /users
router.put('/:userId', controllers.updateUser); // users/:userId
router.delete('/:userId', controllers.deleteUser); //users/:userId