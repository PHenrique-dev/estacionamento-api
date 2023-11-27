const mongoose = require('mongoose');

const CarrosSchema = new mongoose.Schema({
  nome:{
    type: String,
    required: true
  },
  marca:{
    type: String,
    required: true
  },
  modelo:{
    type: String,
    required: true
  },
  approved: Boolean,
},
{ timestamps: true }
);

const Carros = mongoose.model('Carros', CarrosSchema);

module.exports = Carros;
