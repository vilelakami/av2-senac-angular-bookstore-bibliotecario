import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro';
import { Livro } from '../../models/livro';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-livros',
  styleUrl: './livros.css',
  templateUrl: './livros.html',
})
export class Livros implements OnInit {
  private livroService = inject(LivroService);
  livros: Livro[] = [];
  novoLivro: Livro = { titulo: '', autor: '', ano: 0 };

  // chamando a rota listar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
  ngOnInit() {
    this.livroService.listar().subscribe(dados => {
      this.livros = dados;
    });
  }

  // método salvar que chama a rota criar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
  salvar() {
    if (this.novoLivro.id) {
      // se eu receber um id novo ao editar um livro, então eu chamo a rota editar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
      this.livroService.editar(this.novoLivro).subscribe(livroEditado => {
        this.livros = this.livros.map(l => l.id === livroEditado.id ? livroEditado : l);
        this.novoLivro = { titulo: '', autor: '', ano: 0 };
      });
    } else {
      // se eu não receber um id novo ao criar um livro, então eu chamo a rota criar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
      this.livroService.criar(this.novoLivro).subscribe(livro => {
        this.livros = [...this.livros, livro];
        this.novoLivro = { titulo: '', autor: '', ano: 0 };
      });
    }
  }

  // metodo excluir que chama a rota excluir do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
  excluir(id: number){
    this.livroService.excluir(id).subscribe(() => {
      this.livros = this.livros.filter(livro => livro.id !== id);
    });
  }

  // metodo editar que chama a rota editar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
  preencherFormulario(livro: Livro){
    this.novoLivro = { ...livro };
  }
}
