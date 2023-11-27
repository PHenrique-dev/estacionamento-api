const mongoose = require('mongoose');

const MotosSchema = new mongoose.Schema({
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

const Motos = mongoose.model('Motos', MotosSchema);

module.exports = Motos;
