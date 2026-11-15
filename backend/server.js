// schemas do mongo db
const Livro = require('./models/Livro');
const Autor = require('./models/Autor');

// dotenv = conversar com o arquivo .env
// mongoose = biblioteca que permite conectar o node com o mongoDB
require('dotenv').config();
const mongoose = require('mongoose');

// usando o framework express pra criar o servidor em node
// usando o cors pra permitir que o front-end acesse o back-end
const express = require('express');
const cors = require('cors');

// criando o servidor
const app = express();
app.use(cors()); // habilita o cors pra todas as rotas
app.use(express.json()); // habilita o express pra receber json no body da requisição


/*// criando um array de livros pra simular um banco de dados
let livros = [
    {'id': 1, 'titulo': 'Dom Casmurro', 'autor': 'Machado de Assis', 'ano': 1899},
    {'id': 2, 'titulo': 'Capitães de Areia', 'autor': 'Jorge Amado', 'ano': 1937},
    {'id': 3, 'titulo': 'A Hora da Estrela', 'autor': 'Clarice Lispector', 'ano': 1988}
];

// criando um array de autores pra simular um banco de dados
let autores = [
    { 'id': 1, 'nome': 'Machado de Assis', 'nacionalidade': 'Brasileiro', 'anoNascimento': 1839 },
    { 'id': 2, 'nome': 'Jorge Amado', 'nacionalidade': 'Brasileiro', 'anoNascimento': 1912 },
    { 'id': 3, 'nome': 'Clarice Lispector', 'nacionalidade': 'Brasileira', 'anoNascimento': 1920 }
]*/

// rota GET para retornar todos os livros
app.get('/livros', async (req, res) => {
    const livros = await Livro.find();
    res.json(livros);
});

// rota GET que busca um unico livro e retorna ele, caso não encontre retorna 404 not found
app.get('/livros/:id', async (req, res) => {
    try{
        const livro = await Livro.findById(req.params.id);

        if(!livro){
            return res.status(404).json({message: 'Livro não encontrado'});
        }
        res.json(livro);
    } catch(erro){
        res.status(400).json({message: 'id inválido'});
    }
});


// rota POST que cria um novo livro
app.post('/livros', async (req, res) => {
    try {
        const { titulo, autor, ano, imagem} = req.body;
    
        if(!titulo || !autor || !ano){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'});
        };

        const novoLivro = await Livro.create({ titulo, autor, ano, imagem });
        res.status(201).json(novoLivro);
    } catch (erro) {
        res.status(500).json({message: 'Erro ao criar o livro'});
    }
});

// rota PUT que atualiza um livro existente por id
app.put('/livros/:id', async (req, res) => {
    try{
        const { titulo, autor, ano, imagem } = req.body;

        const livro = await Livro.findByIdAndUpdate(req.params.id, { titulo, autor, ano, imagem }, { new: true });

        if(!livro){
            return res.status(404).json({message: 'Livro não encontrado'});
        }
        res.json(livro);
    } catch(erro) {
        res.status(400).json({message: 'Id inválido'});
    }
});

// rota DELETE que deleta um livro existente por id
app.delete('/livros/:id', async (req, res) => {
    try{
        const livro = await Livro.findByIdAndDelete(req.params.id);

        if(!livro){
            return res.status(404).json({message: 'Livro não encontrado'});
        }
        res.status(204).send();
    } catch(erro) {
        res.status(400).json({message: 'Id inválido'});
    }
});

//=========== AUTORES ============
// rota GET para retornar todos os autores
app.get('/autores', async (req, res) => {
    try{
        const autores = await Autor.find();
        res.json(autores);
    } catch(erro) {
        res.status(500).json({message: 'Erro ao buscar autores'});
    }
});

// rota GET que busca um unico autor e retorna ele, caso não encontre retorna 404 not found
app.get('/autores/:id', async (req, res) => {
    try{
        const autor = await Autor.findById(req.params.id);

        if(!autor){
            return res.status(404).json({message: 'Autor não encontrado'});
        }
        res.json(autor);
    } catch(erro) {
        res.status(400).json({message: 'Id inválido'});
    }
});

// rota POST que cria um novo autor
app.post('/autores', async (req, res) => {
    try {
        const { nome, nacionalidade, anoNascimento, imagem } = req.body;

        if(!nome || !nacionalidade || !anoNascimento){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'});
        };

        const novoAutor = await Autor.create({ nome, nacionalidade, anoNascimento, imagem });
        res.status(201).json(novoAutor);
    } catch (erro) {
        res.status(500).json({message: 'Erro ao criar o autor'});
    }
});

// rota PUT que atualiza um autor existente por id
app.put('/autores/:id', async (req, res) => {
    try {
        const { nome, nacionalidade, anoNascimento, imagem } = req.body;

        const autor = await Autor.findByIdAndUpdate(req.params.id, { nome, nacionalidade, anoNascimento, imagem }, { new: true });

        if(!autor){
            return res.status(404).json({message: 'Autor não encontrado'});
        }
        res.json(autor);
    } catch(erro) {
        res.status(400).json({message: 'Id inválido'});
    }
});

// rota DELETE que deleta um autor existente por id
app.delete('/autores/:id', async (req, res) => {
    try {
        const autor = await Autor.findByIdAndDelete(req.params.id);

        if(!autor){
            return res.status(404).json({message: 'Autor não encontrado'});
        }
        res.status(204).send();
    } catch(erro) {
        res.status(400).json({message: 'Id inválido'});
    }
});

//==========================================
// conexão com o banco
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Conectado ao MONGODB.")).catch(err => console.log("Erro ao conectar:", err.message));

// porta que o back roda
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});