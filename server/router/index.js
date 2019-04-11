const express = require('express');
const router = express.Router();

const register = require('./register'); 
const login = require('./login');
const favorites = require('./favorites');

router.use('/register', register);
router.use('/login', login);
router.use('/favorites', favorites);


module.exports = router;