const express = require('express');
const favorites = express.Router();

const User = require('../../models/user');
const authentication = require('../../middlewares/authentication');
const jwt = require('../../helpers/jwt');

favorites.get('/', authentication, (req, res) => {
  let decoded = jwt.verify(req.headers.token);
  
  User.findOne({
    email: decoded.email
  })
    .then(currentUser => {
      res.status(200).json(currentUser.favs)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

favorites.post('/', authentication, (req, res) => {
  let decoded = jwt.verify(req.headers.token);
  let updatedUser = null;
  
  User.findOne({
    email: decoded.email
  })
    .then(currentUser => {
      currentUser.favs.push({
        id: req.body.id,
        joke: req.body.joke
      })
      updatedUser = currentUser;
      return currentUser.update({
        favs: currentUser.favs
      })
    })
    .then((data) => {
      res.status(200).json({ data, updatedUser });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

favorites.delete('/:id', authentication, (req, res) => {
  let decoded = jwt.verify(req.headers.token);

  User.findOne({
    email: decoded.email
  })
    .then(currentUser => {
      let index = currentUser.favs.findIndex(fav => fav.id == req.params.id);

      currentUser.favs = currentUser.favs.  slice(0, index).concat(currentUser.favs.slice(index + 1));
      updatedUser = currentUser;
      return currentUser.update({
        favs: currentUser.favs
      })
    })
    .then((data) => {
      res.status(200).json({ data, updatedUser });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})


module.exports = favorites;