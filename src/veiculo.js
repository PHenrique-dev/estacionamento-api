const mongoose = require('mongoose');
const veiculo = mongoose.model('Veiculo', {
    nome: String,
    marca: String,
    modelo: Number,
    approved: Boolean,
});
module.exports = veiculo