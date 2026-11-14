// usando o framework express pra criar o servidor em node
// usando o cors pra permitir que o front-end acesse o back-end
const express = require('express');
const cors = require('cors');

// criando o servidor
const app = express();
app.use(cors()); // habilita o cors pra todas as rotas
app.use(express.json()); // habilita o express pra receber json no body da requisição


// criando um array de livros pra simular um banco de dados
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
]

// rota GET para retornar todos os livros
app.get('/livros', (req, res) => {
    res.json(livros);
});

// rota GET que busca um unico livro e retorna ele, caso não encontre retorna 404 not found
app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(livro => livro.id === id);

    if(livro){
        res.json(livro);
    } else{
        res.status(404).json({message: 'Livro não encontrado'});
    }
});


// rota POST que cria um novo livro
app.post('/livros', (req, res) => {
    const { titulo, autor, ano } = req.body;
    
    if(!titulo || !autor || !ano){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'});
    };

    const novoLivro = { id: Math.max(0, ...livros.map(l => l.id)) + 1, titulo, autor, ano };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

// rota PUT que atualiza um livro existente por id
app.put('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(livro => livro.id === id);

    if(!livro){
        return res.status(404).json({message: 'Livro não encontrado'});
    };

    const { titulo, autor, ano } = req.body;

    livro.titulo = titulo || livro.titulo;
    livro.autor = autor || livro.autor;
    livro.ano = ano || livro.ano;

    res.status(200).json(livro);
});

// rota DELETE que deleta um livro existente por id
app.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(livro => livro.id === id);

    if(!livro){
        return res.status(404).json({message: 'Livro não encontrado'});
    };

    livros = livros.filter(livro => livro.id !== id);
    
    res.status(204).send();
});

//=========== AUTORES ============
// rota GET para retornar todos os autores
app.get('/autores', (req, res) => {
    res.json(autores);
});

// rota GET que busca um unico autor e retorna ele, caso não encontre retorna 404 not found
app.get('/autores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === id);

    if(autor){
        res.json(autor);
    } else{
        res.status(404).json({message: 'Autor não encontrado'});
    }
});


// rota POST que cria um novo autor
app.post('/autores', (req, res) => {
    const { nome, nacionalidade, anoNascimento } = req.body;

    if(!nome || !nacionalidade || !anoNascimento){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'});
    };

    const novoAutor = { id: Math.max(0, ...autores.map(a => a.id)) + 1, nome, nacionalidade, anoNascimento };

    autores.push(novoAutor);
    res.status(201).json(novoAutor);
});

// rota PUT que atualiza um autor existente por id
app.put('/autores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === id);

    if(!autor){
        return res.status(404).json({message: 'Autor não encontrado'});
    };

    const { nome, nacionalidade, anoNascimento } = req.body;

    autor.nome = nome || autor.nome;
    autor.nacionalidade = nacionalidade || autor.nacionalidade;
    autor.anoNascimento = anoNascimento || autor.anoNascimento;

    res.status(200).json(autor);
});

// rota DELETE que deleta um autor existente por id
app.delete('/autores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === id);

    if(!autor){
        return res.status(404).json({message: 'Autor não encontrado'});
    };

    autores = autores.filter(autor => autor.id !== id);

    res.status(204).send();
});

// porta que o back roda
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});