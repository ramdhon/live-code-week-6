const mongoose = require('mongoose');
const bcrypt = require('../helpers/bcrypt');

let { Schema } = mongoose;

let userSchema = new Schema({
  email: {
    type: String,
    validate: [{
      validator: function(val) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
      },
      message: props => 'not valid'
    },
    {
      validator: async function(val) {
        let user = await User.findOne({
          email: val
        })
        if (user) return false;
      },
      message: props => `not a unique one`
    }
    ]
  },
  password: String,

  favs: [{
    id: String,
    joke: String,
  }]
})

userSchema.pre('save', function(next) {
  this.password = bcrypt.hash(this.password);
  next();
})

let User = mongoose.model('User', userSchema);


module.exports = User;