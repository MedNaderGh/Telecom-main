const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
let User = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
 password: {
    type: String,
    required: true
  },
  datenaiss: {
    type: String,
    required: true
  },
  authorized: {
    type: Boolean,
    default: false
  },
  Numtel: {
    type: Number,
    required: true
  },
  saltSecret: String
},{
    collection: 'user'
});

module.exports = mongoose.model('User', User);