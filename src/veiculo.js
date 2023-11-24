const mongoose = require('mongoose');

const VeiculoSchema = new mongoose.Schema({
  nome: String,
  marca: String,
  modelo: String,
  approved: Boolean,
});

const Veiculo = mongoose.model('Veiculo', VeiculoSchema);

module.exports = Veiculo;
