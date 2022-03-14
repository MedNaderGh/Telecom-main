const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Stations = new Schema({
  Numero: {
    type: number,
    required: true
    
  },
  type: {
    type: String,
    required: true
  },
 Nom: {
    type: String,
    required: true
    
  },
  Transmission: {
    type: number,
    required: true
  },
  Capacite: {
    type: number,
    
  },
  Bande: {
    type: Number,
    required: true
  },

},{
    collection: 'Stations'
});

module.exports = mongoose.model('Stations', Stations);