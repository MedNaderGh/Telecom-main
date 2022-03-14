const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Commentaire = new Schema({
  Commentaire: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  id_user: {
    type: String,
    required: true
  },
  name_user: {
    type: String,
    required: true
  },
 id_prom: {
    type: String,
    required: true
  },
  date:{
      type:Date,
      required:true
  }
},{
    collection: 'commentaire'
});
module.exports = mongoose.model('Commentaire', Commentaire);