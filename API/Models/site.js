const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let site = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
 Adress: {
    type: String,
    required: true
  },
  Frequence: {
    type: String,
  },
  Acceptance: {
    type: String,
  },
  Remarques: {
    type: String,
  }
},{
    collection: 'site'
});
module.exports = mongoose.model('site', site);