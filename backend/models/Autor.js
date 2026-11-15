// instanciando o mongoose pra usar o mongodb
const mongoose = require('mongoose');

// criando meu schema (tablea ou entidade)
const autorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    nacionalidade: { type: String, required: true },
    anoNascimento: { type: Number, required: true },
    imagem: { type: String }
});

module.exports = mongoose.model('Autor', autorSchema);