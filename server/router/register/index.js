const express = require('express');
const register = express.Router();

const User = require('../../models/user');

register.post('/', (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})


module.exports = register;