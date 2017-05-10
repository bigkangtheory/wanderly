'use strict'

const User = require('../models').User;

let userArr = [ 
  {
    email: "chunLisa@gmail.com",
    password: "lisa"
  },
  {
    email: "jane@gmail.com",
    password: "jane"
  },
  {
    email: "smith@gmail.com",
    password: "smith"
  },
];

const userSeed = () => {
  User.bulkCreate(userArr)
};

module.exports = userSeed;