const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Promotion = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
 adresse: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  lien: {
    type: String,
    required: true
  },
  dated: {
    type: Date,
    required: true
  },
  datef: {
    type: Date,
    required: true
  },
  prixas: {
    type: Number,
    required: true
  },
  categorie: {
    type:String,
    required: true
  },
  partenaire: {
    type: String,
    required: true
  },
  reduction: {
    type: Number,
    required: true
  },
  Longitude: {
    type: String,
    required: true
  },
  Latitude: {
    type: String,
    required: true
  },
  img: {
    type: String,
  }
},{
    collection: 'promotion'
});
module.exports = mongoose.model('Promotion', Promotion);