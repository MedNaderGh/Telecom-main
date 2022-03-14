const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Categorie = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
 description: {
    type: String,
    required: true
  },
},{
    collection: 'categorie'
});
module.exports = mongoose.model('Categorie', Categorie);