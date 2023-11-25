const mongoose = require('mongoose');

const CarrosSchema = new mongoose.Schema({
  nome: String,
  marca: String,
  modelo: String,
  approved: Boolean,
});

const Carros = mongoose.model('Carros', CarrosSchema);

module.exports = Carros;
