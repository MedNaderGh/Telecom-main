const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Profit = new Schema({
 iduser: {
    type: String,
  },
  idpromo: {
    type: String,
  },
  date:{
      type:Date,
  }
},{
    collection: 'profit'
});
module.exports = mongoose.model('Profit', Profit);