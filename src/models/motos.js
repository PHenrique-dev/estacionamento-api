const mongoose = require('mongoose');

const MotosSchema = new mongoose.Schema({
  nome: String,
  marca: String,
  modelo: String,
  approved: Boolean,
});

const Motos = mongoose.model('Motos', MotosSchema);

module.exports = Motos;
