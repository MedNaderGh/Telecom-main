const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Favoris = new Schema({
  id_user: {
    type: String,
    required: true
  },
 id_prom: {
    type: String,
    required: true
  },
},{
    collection: 'favoris'
});
module.exports = mongoose.model('Favoris', Favoris);