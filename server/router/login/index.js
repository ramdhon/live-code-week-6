const express = require('express');
const login = express.Router();

const User = require('../../models/user');
const bcrypt = require('../../helpers/bcrypt');
const jwt = require('../../helpers/jwt');

login.post('/', (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then(foundUser => {
      if(!foundUser) {
        res.status(404).json({ message: 'email incorrect' })
      } else {
        let valid = bcrypt.compare(req.body.password, foundUser.password);
        if (!valid) {
          res.status(401).json({ message: 'password incorrect' });
        } else {
          let token = jwt.sign({
            email: foundUser.email
          })
          res.status(200).json({ message: 'login success', token: token });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})


module.exports = login;