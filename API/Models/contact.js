const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Contact = new Schema({
  sujet: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  id_user: {
    type: String,
    required: true
  },
  etat: {
    type: Boolean,
    required: true,
    default: false
  },
  name_user: {
    type: String,
    required: true
  },
 message: {
    type: String,
    required: true
  },
  date:{
      type:Date,
      required:true
  }
},{
    collection: 'contact'
});
module.exports = mongoose.model('Contact', Contact);