# BookStoreStar

Sistema de gerenciamento de livros e autores, desenvolvido para a disciplina Angular - Web Responsivo do TSI/SENAC.

## Tecnologias

- **Front-end:** Angular, Angular Material
- **Back-end:** Node.js, Express
- **Banco de dados:** MongoDB Atlas (Mongoose)

## Funcionalidades

- CRUD completo de **Livros** (listar, criar, editar, excluir)
- CRUD completo de **Autores**
- Imagem por URL em livros e autores
- Navegação com Angular Router (`router-outlet`, `routerLink`)
- Componente de cartão reutilizável com `ng-content`
- Listas reativas com `signal`
- Layout responsivo com Material Design

## Estrutura

```
biblioteca/
├── src/            # código Angular
│   └── app/
│       ├── components/   # cartão reutilizável
│       ├── models/       # interfaces Livro e Autor
│       ├── page/         # home, livros, autores
│       └── services/     # comunicação com a API
└── backend/        # API Express
    ├── models/     # schemas do Mongoose
    └── server.js
```

## Pré-requisitos

- Node.js (versão LTS)
- Angular CLI: `npm install -g @angular/cli`
- Uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas)

## Como rodar

### 1. Clonar

```bash
git clone https://github.com/vilelakami/av2-senac-angular-bookstore-bibliotecario.git
cd av2-senac-angular-bookstore-bibliotecario
```

### 2. Back-end

```bash
cd backend
npm install
```

Copie `.env.example` para `.env` e coloque a sua connection string do Atlas:

```
MONGO_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/biblioteca
```

No Atlas, libere o seu IP em **Network Access**. Depois:

```bash
node server.js
```

A API sobe em `http://localhost:3000`.

### 3. Front-end

Em outro terminal, na raiz do projeto:

```bash
npm install
ng serve
```

Acesse `http://localhost:4200`.

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/livros` | Lista os livros |
| GET | `/livros/:id` | Busca um livro |
| POST | `/livros` | Cria um livro |
| PUT | `/livros/:id` | Edita um livro |
| DELETE | `/livros/:id` | Exclui um livro |

As mesmas 5 rotas existem para `/autores`.

## Autora

Kami Vilela — linkedin.com/in/kamivilela