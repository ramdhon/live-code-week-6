const express = require('express');
const favorites = express.Router();

const User = require('../../models/user');
const authentication = require('../../middlewares/authentication');

favorites.get('/', authentication, (req, res) => {
  
})
favorites.post('/', authentication, (req, res) => {

})
favorites.delete('/:id', authentication, (req, res) => {

})


module.exports = favorites;