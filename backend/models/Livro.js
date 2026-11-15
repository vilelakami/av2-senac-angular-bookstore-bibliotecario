// instanciando o mongoose pra usar o mongodb
const mongoose = require('mongoose');

// criando meu schema (tablea ou entidade)
const livroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    ano: { type: Number, required: true },
    imagem: { type: String }
});

module.exports = mongoose.model('Livro', livroSchema);